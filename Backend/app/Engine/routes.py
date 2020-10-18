
from app.Engine import bp
from flask_cors import cross_origin
import zipcodes

__IS_VALID__ = "isvalid"
__CITY__ = "city"
__STATE__ = "state"

@bp.route('/zip/<zipcode_str>', methods = ['GET'])
@cross_origin()
def get_zipcode_info(zipcode_str):

    """
    :param zipcode_str: -> String; zipcode for which the info is required
    :return: -> dict; keys :- isValid, city, state.
    """

    zipcode_info = zipcodes.matching(zipcode_str)
    result = {__IS_VALID__:False, __CITY__: None, __STATE__: None}
    if zipcode_info:
        result[__IS_VALID__] = True
        result[__CITY__] = zipcode_info[0]["city"]
        result[__STATE__] = zipcode_info[0]["state"]

    return result

