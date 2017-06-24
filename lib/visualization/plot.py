import pandas as pd

import matplotlib.colors as colors
import matplotlib.cm as cmx
# import matplotlib as plt
import matplotlib.pyplot as plt

import cv2
import numpy as np
import time

x = range(100)
y = np.random.rand(2, 100)

# print(x, y)


def score(data_frame):
  fig = plt.figure()
  # ax = fig.add_subplot(111)

  y = list(data_frame['sentiment_score'])
  x = range(len(y))

  # print()

  plt.plot(x, y)
  plt.show()
