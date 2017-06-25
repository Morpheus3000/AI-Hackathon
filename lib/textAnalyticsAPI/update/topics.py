import numpy as np
import pandas as pd
import json
# import requests
import urllib
import httplib
# import base64

from lib.textAnalyticsAPI import api_requests


def add_topic_analysis(base_df, topic_data, assignment_data):
  assignment_dict = {}
  distance_dict = {}
  for entry in assignment_data:
    assignment_dict[int(entry["documentId"])] = entry["topicId"]
    distance_dict[int(entry["documentId"])] = entry["distance"]

  topic_id_dict = {}
  key_phrase_dict = {}
  topic_score_dict = {}
  topic_counter = 0
  for entry in topic_data:
    topic_id_dict[topic_counter] = entry["id"]
    key_phrase_dict[topic_counter] = entry["keyPhrase"]
    topic_score_dict[topic_counter] = entry["score"]
    topic_counter += 1

  topic_pd = pd.DataFrame(pd.Series(topic_id_dict).rename("topic_id"))
  topic_pd["topic_phrase"] = pd.Series(key_phrase_dict)
  topic_pd["topic_score"] = pd.Series(topic_score_dict)

  final_pd = pd.DataFrame(base_df)
  final_pd["topic_id"] = pd.Series(assignment_dict)
  final_pd["topic_distance"] = pd.Series(distance_dict)
  final_pd = pd.merge(final_pd, topic_pd, on="topic_id", how="left")
  final_pd.sort_values("start_second", inplace=True)
  return final_pd


def data_frame(base_df):
  json_request = api_requests.generate_json(base_df)
  topic_data, assignment_data = api_requests.process_topics(json_request)

  final_pd = add_topic_analysis(base_df, topic_data, assignment_data)

  return final_pd
