import cv2
import matplotlib.pyplot as plt
import numpy as np
import yaml
from matplotlib.pyplot import imshow


# import parsing.video as video_parsing


def parse_video(path):
  vidcap = cv2.VideoCapture(path)
  success, image = vidcap.read()

  print 'Read a new frame: ', success

  plt.imshow(image)
  plt.show()

  # cv2.imwrite("frame%d.jpg" % count, image)     # save frame as JPEG file

  vidcap.release()
  totalnoframes = vidcap.get(cv2.cv.CV_CAP_PROP_FRAME_COUNT)
  totaldurationMS = 1000*totalnoframes/vidcap.get(cv2.cv.CV_CAP_PROP_FPS)

  print('Number of frames: %i' % totalnoframes)
  print('Duration %f ms' % totalnoframes)
