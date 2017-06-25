import cv2
import matplotlib.pyplot as plt
import numpy as np
import yaml
import time
import pandas as pd

from MASR import Microsoft_ASR


def parse(audio_files, keys):
  # Convert all the wavs files to texts
  ms_asr = Microsoft_ASR(keys['binq_voice_key_1'])
  ms_asr.get_speech_token()

  speech_data = []

  for i, filename in enumerate(audio_files):
    ss = filename.split('.')[-2]
    text, confidence = ms_asr.transcribe('data/akshaya/' + filename)
    speech_data.append(
        {'start_second': ss, 'text': text, 'confidence': confidence})
    time.sleep(3)  # with a free key we should send 20 requests per minute

    if (i % 10 == 0):
      print('Processed %i files' % i)

  speech_data = pd.DataFrame(speech_data)

  return speech_data
