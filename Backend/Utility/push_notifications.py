import boto3
from botocore.exceptions import ClientError
from Utility import dbController
from datetime import timedelta
from datetime import datetime
import time
import json


def org_lookup():
    """
    Check if any organizations whose data needs to be updated
    Check for timestamps > 6 months from today's date
    :return:
    """
    threshold = 180
    database = dbController.connect()["org"]
    current_time = datetime.now().date()
    for i in database.find():
        prev_time = datetime.strptime(i["last_updated"], "%Y-%m-%d").date()
        if int((current_time-prev_time).days) > threshold:
            push(i["org_key"])


def push(org_key):
    """
    Send notification to organization via AWS SES
    :param org_key:
    :return:
    """
    RECIPIENT = org_key
    SUBJECT = "[URGENT] Update your info"
    print(RECIPIENT)

    with open("Utility/auth.json", "r") as file:
        creds = json.load(file)

    client = boto3.client('ses', region_name=creds["aws_region"], aws_access_key_id=creds["key_id"], aws_secret_access_key=creds["access_key"])


    BODY_HTML = """<html>
        <head></head>
        <body>
          <h1>Gentle reminder</h1>
          <p>It's been 6 months since your organization has updated the information.</p>
          <p>This email was sent with
            <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
            <a href='https://aws.amazon.com/sdk-for-python/'>
              AWS SDK for Python (Boto)</a>.</p>
        </body>
        </html>"""

    CHARSET = "UTF-8"

    try:
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': "Update Reminder",
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source=creds["sender"],
        )
    # Display an error if something goes wrong.
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])


if __name__ == "__main__":
    org_lookup()


