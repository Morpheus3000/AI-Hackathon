from lib.speechAPI import speech_to_text
from lib.parsing import video
import yaml


def main():

  # video_file =
  # 'Demo of Online Meeting via Zoom with Participants from Around the World-261OCjeg9GI.mp4'
  # audio_file = video_file + '.wav'
  with open('api_keys/ray.yml', 'r') as f:
    keys = yaml.load(f)

  conference_video = 'data/Demo.mp4'
  video.parse_video(conference_video)


if __name__ == '__main__':
  main()
