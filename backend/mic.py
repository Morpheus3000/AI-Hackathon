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
            text, confidence = val["results"][0]["name"], val["results"][0]["confidence"]
            print(text, confidence)
            return text, confidence
        except:
            print('Unknown error for file %s code %i' % (speech_file, resp.status_code))
            print(resp.text)
            return ('', 0)


def speech_to_text(ms_asr, audio, state, frames, start_second):
    filename = 'wavs/output.' + str(start_second) + '.wav'

    waveFile = wave.open(filename, 'wb')
    waveFile.setnchannels(CHANNELS)
    waveFile.setsampwidth(audio.get_sample_size(FORMAT))
    waveFile.setframerate(RATE)
    waveFile.writeframes(b''.join(frames))
    waveFile.close()

    text, confidence = ms_asr.transcribe(filename)
    state['live_data'].append({'text': text, 'confidence': confidence, 'start_second': start_second})

def listen_mic(ms_asr, state):
    audio = pyaudio.PyAudio()
    stream = None

    try:
        stream = audio.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)
        print "Recording..."
        frames = []
        start_second = 0
        while not state['is_aborted']:
            for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
                data = stream.read(CHUNK)
                frames.append(data)
            print "Got %i frames, writing file %i" % (len(frames), start_second)

            copy_frames = list(frames)

            split = int(len(frames) - RATE / CHUNK)
            frames = frames[split:]   # Keep last second

            thr = threading.Thread(target=speech_to_text, args=[ms_asr, audio, state, copy_frames, start_second], kwargs={})
            thr.start()

            start_second += RECORD_SECONDS

    finally:
        if stream is not None:
            stream.stop_stream()
            stream.close()
        audio.terminate()

def generate_sentiment_request(text):
    request = {}
    request["documents"] = [{"lang" : "en", "id" : 0, "text" : text}]
    return json.dumps(request)

def process_sentiment_request(json_request):
    header = {
    'Accept' : 'application/json',
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '28d6776ec31844a1aeb1095be8d99192',
    }
    try:
        conn = httplib.HTTPSConnection('westus.api.cognitive.microsoft.com')
        
        conn.request("POST", "/text/analytics/v2.0/sentiment", json_request, header)
        response = conn.getresponse()
        sentiment_data = response.read()
        
        conn.request("POST", "/text/analytics/v2.0/keyPhrases", json_request, header)
        response = conn.getresponse()
        key_phrase_data = response.read()
        
        conn.close()
        return sentiment_data, key_phrase_data
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
        return None 

def get_sentiment_main(text):
    sentiment_request = generate_sentiment_request(text)
    sentiment_data, key_phrase_data = process_request(json_request)
    sentiment_score = json.loads(sentiment_data)["documents"][0]
    key_phrases = json.loads(key_phrase_data)["documents"][0]
    return sentiment_score, key_phrases