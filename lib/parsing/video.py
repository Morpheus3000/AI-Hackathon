import cv2
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.pyplot import imshow


# import parsing.video as video_parsing


def parse_video(path):
  cap = cv2.VideoCapture(path)
  try:
    while(cap.isOpened()):
      ret, frame = cap.read()

      gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

      cv2.imshow('frame', gray)
      cv2.waitKey(1)
  finally:
    cap.release()
    cv2.destroyAllWindows()

  # success, image = vidcap.read()

  # print 'Read a new frame: ', success

  # plt.imshow(image)
  # plt.show()

  # cv2.imwrite("frame%d.jpg" % count, image)     # save frame as JPEG file

  # vidcap.release()
  totalnoframes = vidcap.get(cv2.CV_CAP_PROP_FRAME_COUNT)
  totaldurationMS = 1000*totalnoframes/vidcap.get(cv2.CV_CAP_PROP_FPS)

  print('Number of frames: %i' % totalnoframes)
  print('Duration %f ms' % totalnoframes)
