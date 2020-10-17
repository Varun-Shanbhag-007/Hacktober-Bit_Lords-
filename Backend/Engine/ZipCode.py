
from uszipcode import SearchEngine

zip_search_engine = SearchEngine(simple_zipcode=True)

__IS_VALID__ = "isvalid"
__CITY__ = "city"
__STATE__ = "state"


def get_zipcode_info(zipcode_str):

    """
    :param zipcode_str: -> String; zipcode for which the info is required
    :return: -> dict; keys :- isValid, city, state.
    """

    zipcode_info = zip_search_engine.by_zipcode(zipcode_str)
    result = {__IS_VALID__:False, __CITY__: None, __STATE__: None}
    if zipcode_info.post_office_city is not None:
        result[__IS_VALID__] = True
        result[__CITY__] = zipcode_info.post_office_city.split(", ")[0]
        result[__STATE__] = zipcode_info.state

    return result

