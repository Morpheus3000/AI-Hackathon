import numpy as np
import pandas as pd
import json
# import requests
import urllib
import httplib
# import base64

from lib.textAnalyticsAPI import api_requests


def add_text_analysis(base_df, sentiment_data, key_phrase_data):

  sentiment_dict = {}
  for entry in json.loads(sentiment_data)["documents"]:
    sentiment_dict[int(entry["id"])] = entry["score"]

  key_phrase_dict = {}
  for entry in json.loads(key_phrase_data)["documents"]:
    key_phrase_dict[int(entry["id"])] = entry["keyPhrases"]

  final_pd = pd.DataFrame(base_df)
  final_pd["sentiment_score"] = pd.Series(sentiment_dict)
  final_pd["key_phrases"] = pd.Series(key_phrase_dict)

  return final_pd


def data_frame(base_df):
  json_request = api_requests.generate_json(base_df)
  sentiment_data, key_phrase_data = api_requests.process_text(json_request)

  final_df = add_text_analysis(base_df, sentiment_data, key_phrase_data)

  return final_df
