#!/usr/bin/python

import cv2
import httplib
import json
import math
import numpy as np
import pandas as pd
import pyaudio
import requests
import struct
import sys
import time
import threading
import uuid
import wave
import yaml
from flask import Flask

FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
CHUNK = 1000
RECORD_SECONDS = 3
RECORD_FILES_COUNT = 3


class Microsoft_ASR():
    def __init__(self, binq_key):
        self.sub_key = binq_key
        self.token = None
        pass

    def get_speech_token(self):
        FetchTokenURI = "/sts/v1.0/issueToken"
        header = {'Ocp-Apim-Subscription-Key': self.sub_key}
        conn = httplib.HTTPSConnection('api.cognitive.microsoft.com')
        body = ""
        conn.request("POST", FetchTokenURI, body, header)
        response = conn.getresponse()
        str_data = response.read()
        conn.close()
        self.token = str_data
        return True

    def transcribe(self, speech_file):
        # Grab the token if we need it
        if self.token is None:
            print "No Token... Getting one"
            self.get_speech_token()

        endpoint = 'https://speech.platform.bing.com/recognize'
        request_id = uuid.uuid4()
        params = {'scenarios': 'ulm',
                  'appid': 'D4D52672-91D7-4C74-8AD8-42B1D98141A5',
                  'locale': 'en-US',
                  'version': '3.0',
                  'format': 'json',
                  'instanceid': '565D69FF-E928-4B7E-87DA-9A750B96D9E3',
                  'requestid': uuid.uuid4(),
                  'device.os': 'linux'}
        content_type = "audio/wav; codec=""audio/pcm""; samplerate=16000"

        def stream_audio_file(speech_file, chunk_size=1024):
            with open(speech_file, 'rb') as f:
                while 1:
                    data = f.read(1024)
                    if not data:
                        break
                    yield data

        headers = {'Authorization': 'Bearer ' + self.token, 
                   'Content-Type': content_type}
        resp = requests.post(endpoint, 
                            params=params, 
                            data=stream_audio_file(speech_file), 
                            headers=headers)
        
        try:
            val = json.loads(resp.text)
            return val["results"][0]["name"], val["results"][0]["confidence"]        
        except:
            print('Unknown error for file %s code %i' % (speech_file, resp.status_code))
            print(resp.text)
            return ('', 0)


def speech_to_text(ms_asr, audio, frames, file_num):
    filename = 'wavs/output.' + str(file_num) + '.wav'

    waveFile = wave.open(filename, 'wb')
    waveFile.setnchannels(CHANNELS)
    waveFile.setsampwidth(audio.get_sample_size(FORMAT))
    waveFile.setframerate(RATE)
    waveFile.writeframes(b''.join(frames))
    waveFile.close()

    text, confidence = ms_asr.transcribe(filename)
    print(text, confidence)

def mic_mode(ms_asr):
    audio = pyaudio.PyAudio()
    stream = None

    try:
        stream = audio.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)
        print "Recording..."
        frames = []
        for file_num in range(RECORD_FILES_COUNT):
            for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
                data = stream.read(CHUNK)
                frames.append(data)
            print "Got %i frames, writing file %i" % (len(frames), file_num)

            copy_frames = list(frames)

            split = int(len(frames) - RATE / CHUNK)
            frames = frames[split:]   # Keep last second

            thr = threading.Thread(target=speech_to_text, args=[ms_asr, audio, copy_frames, file_num], kwargs={})
            thr.start()

    finally:
        if stream is not None:
            stream.stop_stream()
            stream.close()
        audio.terminate()


if __name__ == '__main__':
    with open('../../../api_keys.yml', 'r') as f:
        keys = yaml.load(f)

    ms_asr = Microsoft_ASR(keys['binq_voice_key_1'])
    ms_asr.get_speech_token()

    mic_mode(ms_asr)


# app = Flask(__name__)

# @app.route('/')
# def index():
#     return "Hello, World!"

# if __name__ == '__main__':
#     app.run(debug=True)