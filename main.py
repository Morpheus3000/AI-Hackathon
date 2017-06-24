from lib.speechAPI import speech
from lib.parsing import video


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

  print(audio_files)

  csv_path = 'data/csv/Demo.csv'
  if not os.path.exists(csv_path):
    speech_data = speech.parse(audio_files, keys)
  else:
    speech_data = pd.read_csv(csv_path)

  print(speech_data)


if __name__ == '__main__':
  main()
