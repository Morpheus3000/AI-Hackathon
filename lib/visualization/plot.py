import pandas as pd

import matplotlib.colors as colors
import matplotlib.cm as cmx
# import matplotlib as plt
import matplotlib.pyplot as plt

import cv2
import numpy as np
import time

from scipy.ndimage.filters import gaussian_filter1d
import ast


def score(data_frame):
  x = range(len(data_frame))
  y = gaussian_filter1d(list(data_frame['sentiment_score']), 0.8)

  y = (y - min(y)) / (max(y) - min(y))

  plt.plot(x, y)


def keywords(data_frame):

  keyword_dist = {}

  # print(len(data_frame))

  for index, row in data_frame.iterrows():
    # print(index, ast.literal_eval(row['key_phrases']))

    for phrase in ast.literal_eval(row['key_phrases']):
      if phrase not in keyword_dist.keys():
        keyword_dist[phrase] = []
      keyword_dist[phrase].append(index)

  max_keyword_usage = max([len(keyword_dist[key])
                           for key in keyword_dist.keys()])

  print(max_keyword_usage)
  max_keys = [key for key in
              keyword_dist.keys() if len(keyword_dist[key]) > 1]

  for key in max_keys:
    x = keyword_dist[key]
    y = [float(len(x)) / float(max_keyword_usage)] * len(x)

    plt.plot(x, y, marker='o', label=key)

  # for key in keyword_dist.keys():

  # print(keyword_dist)


def statistics(data_frame):

  fig = plt.figure()
  fig.add_subplot(121)

  score(data_frame)

  keywords(data_frame)

  # fig.add_subplot(122)
  plt.legend(bbox_to_anchor=(1, 1), loc='upper left', ncol=1)

  plt.show()
