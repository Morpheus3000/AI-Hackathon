import cv2
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.pyplot import imshow
import subprocess
import time
import os

# import parsing.video as video_parsing


def parse(path, play=False):
  cap = cv2.VideoCapture(path)

  if play:
    try:
      while(cap.isOpened()):
        ret, frame = cap.read()

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        cv2.imshow('frame', gray)
        cv2.waitKey(1)
    finally:
      cap.release()
      cv2.destroyAllWindows()

  return cap


def frames(cap):
  # cap = cv2.VideoCapture(path)

  totalnoframes = cap.get(cv2.CAP_PROP_FRAME_COUNT)
  # totaldurationMS = 1000*totalnoframes/cap.get(cv2.CAP_PROP_FPS)

  print('Number of frames: %i' % totalnoframes)
  # print('Duration %f ms' % totalnoframes)

  return totalnoframes


def duration(cap):
  # cap = cv2.VideoCapture(path)

  totalnoframes = cap.get(cv2.CAP_PROP_FRAME_COUNT)
  totaldurationMS = 1000*totalnoframes/cap.get(cv2.CAP_PROP_FPS)

  # print('Number of frames: %i' % totalnoframes)
  print('Duration %f ms' % totalnoframes)

  return totaldurationMS


def audio(path, duration, overlap=5000):

  audio_path = path[:path.find('/')] + "/akshaya" + path[path.find('/'):]

  # print(os.path.exists(path))

  audio_files = []

  # Convert video to audiofiles
  for ss in range(0, int(duration), overlap):
    hhmmss = time.strftime('%H:%M:%S', time.gmtime(ss / 1000))
    outfile = '%s.%s.wav' % (audio_path, ss)

    # print('ffmpeg -y -i ' + path +
    #       ' -ac 1 -ar 16000 -ss ' + hhmmss +
    #       ' -t 00:00:10.0 -q:a 0 -map a '
    #       + outfile)

    subprocess.call(
        'ffmpeg -y -i ' + path +
        ' -ac 1 -ar 16000 -ss ' + hhmmss +
        ' -t 00:00:10.0 -q:a 0 -map a '
        + outfile, stdout=None, stderr=subprocess.STDOUT)
    # + ' &> /dev/null')

    # print(outfile)

    if (int(ss) % 90000 == 0):
      print('Processed %s' % hhmmss)

    audio_files.append(outfile)

    # break

  return audio_files
