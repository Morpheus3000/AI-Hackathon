import numpy as np
import pandas as pd
import json
import requests
import urllib
import httplib
# import base64


def generate_json(pd_text):
  request = {}
  request["documents"] = []

  # pd_text = pd_text.fillna('aaaaaaaaaaaaaaaaaaaaaaaaa')

  print(pd_text)

  for index, row in pd_text.iterrows():
    # print(row)
    # if Nan in row
    phrase = {}
    phrase["lang"] = "en"
    phrase["id"] = int(index)
    phrase["text"] = row["text"]
    request["documents"].append(phrase)

  print(json.dumps(request, indent=2))

  return json.dumps(request)


def process(json_request):

  print(json_request)

  header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '28d6776ec31844a1aeb1095be8d99192',
  }
  try:
    conn = httplib.HTTPSConnection('westus.api.cognitive.microsoft.com')

    conn.request("POST", "/text/analytics/v2.0/sentiment",
                 json_request, header)
    response = conn.getresponse()
    sentiment_data = response.read()

    conn.request("POST", "/text/analytics/v2.0/keyPhrases",
                 json_request, header)
    response = conn.getresponse()
    key_phrase_data = response.read()

    conn.close()
    return sentiment_data, key_phrase_data
  except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))
    return None
