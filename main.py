from lib.speechAPI import speech
from lib.parsing import video
from lib.visualization import plot
from lib.textAnalyticsAPI import api_update

import yaml
import os
import pandas as pd


def main():

  # video_file =
  # 'Demo of Online Meeting via Zoom with Participants from Around the World-261OCjeg9GI.mp4'
  # audio_file = video_file + '.wav'
  with open('api_keys/ray.yml', 'r') as f:
    keys = yaml.load(f)

  conference_video = 'data/Demo.mp4'
  cap = video.parse(conference_video)

  # frame_count = video.frames(cap)
  duration = video.duration(cap)
  if not os.path.exists('data/wav'):
    audio_files = video.audio(conference_video, duration)
  else:
    audio_files = [f for f in os.listdir(
        'data/wav') if os.path.isfile(os.path.join('data/wav', f))]

  if 0:
    print(audio_files)

  demo_path = 'data/csv/Demo.csv'
  if not os.path.exists(csv_path):
    speech_data = speech.parse(audio_files, keys)
    speech_data.to_csv('data/csv/Demo.csv')
  else:
    speech_data = pd.read_csv(csv_path)

  score_path = 'data/csv/score.csv'
  if not os.path.exists(score_path):
    speech_data = api_update.data_frame(speech_data)
    speech_data.to_csv('data/csv/Demo.csv')
  else:

  if 0:
    print(speech_data)

  plot.score(speech_data)

if __name__ == '__main__':
  main()
