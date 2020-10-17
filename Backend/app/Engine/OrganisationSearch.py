
from nltk.corpus import wordnet
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

class OrganisationSearch():

    stop_words = set(stopwords.words("English"))
    lemmatizer = WordNetLemmatizer()

    RAW_MATCH_WEIGHT = 0.5

    def __init__(self, data=None):
        """
        :param data: -> dict; keyword = 'id' of the row in the organisation data.
                                value = type : OrganisationDataElement
        """
        self.org_data = data

    def refine_words(self, words):

        ref_words = []
        lemm_words = []
        for word in words:
            if word not in self.stop_words:
                ref_words.append(word.lower())
                lemm_words.append(self.lemmatizer.lemmatize(word.lower()))

        return ref_words, lemm_words

    @staticmethod
    def get_words_similarity(query_words, data_element_words, similarity_func):

        score = 0.0
        for q_word in query_words:
            for d_word in data_element_words:
                score += similarity_func(q_word, d_word)

        return score

    @staticmethod
    def wup_similarity(word1, word2):
        pass

    @staticmethod
    def is_same(word1, word2):
        return 1 if word1 == word2 else 0

    def get_query_match_with_data_element(self, query_words, query_lemm_words, org_data_element):

        raw_match_score = self.get_words_similarity(query_words, org_data_element.raw_keywords, self.is_same)
        lemm_match_score = self.get_words_similarity(query_lemm_words, org_data_element.lemmatized_keywords, self.wup_similarity)

        return self.RAW_MATCH_WEIGHT*raw_match_score + (1-self.RAW_MATCH_WEIGHT)*lemm_match_score

    def search(self, query):

        words = word_tokenize(query)
        words, lemm_words = self.refine_words(words)

        scores = {}

        for data_id in self.org_data:

            scores[data_id] = self.get_query_match_with_data_element(words, lemm_words, self.org_data[data_id])

        return sorted(scores.keys(), key=scores.get)






