from lib.speechAPI import speech
from lib.parsing import video
from lib.visualization import plot
import lib.textAnalyticsAPI.update as update  # import api_update

import yaml
import os
import pandas as pd
import json


def main():

  # video_file =
  # 'Demo of Online Meeting via Zoom with Participants from Around the World-261OCjeg9GI.mp4'
  # audio_file = video_file + '.wav'
  with open('api_keys/ray.yml', 'r') as f:
    keys = yaml.load(f)

  conference_video = 'data/akshaya.mov'
  cap = video.parse(conference_video)

  print(cap)

  # frame_count = video.frames(cap)
  wavs_dir = 'data/akshaya'
  duration = video.duration(cap)
  if not os.path.exists(wavs_dir):
    audio_files = video.audio(conference_video, duration)
  else:
    audio_files = [f for f in os.listdir(
        wavs_dir) if os.path.isfile(os.path.join(wavs_dir, f))]

  # print(audio_files)

  demo_path = 'data/akshaya/Demo_ashaya.csv'
  if not os.path.exists(demo_path):
    speech_data = speech.parse(audio_files, keys)
    speech_data.to_csv(demo_path)
  else:
    speech_data = pd.read_csv(demo_path)

  score_path = 'data/akshaya/score_ashaya.csv'
  if not os.path.exists(score_path):
    speech_data = update.text.data_frame(speech_data)
    speech_data.to_csv(score_path)
  else:
    speech_data = pd.read_csv(score_path)

  # print(speech_data)

  # plot.statistics(speech_data)

  topics_path = 'data/akshaya/topics_ashaya.csv'
  if not os.path.exists(topics_path):
    speech_data = update.topics.data_frame(speech_data)
    speech_data.to_csv(topics_path)
  else:
    speech_data = pd.read_csv(topics_path)

  # print(speech_data)
  # json_path = 'data/topics_sample_output.json'
  plot.topics(speech_data)

  print(speech_data)


if __name__ == '__main__':
  main()
