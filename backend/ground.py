#!/usr/bin/python

from mic import *
from flask import Flask
from flask import jsonify
import signal
import sys
import time


state = {'is_aborted': False, 'live_data': []}

def signal_handler(signal, frame):
    print("Exiting...")
    state['is_aborted'] = True
    time.sleep(1)
    sys.exit(0)

app = Flask(__name__)

@app.route('/live_data')
def index():
    return jsonify(state['live_data'][-10:])

signal.signal(signal.SIGINT, signal_handler)

if __name__ == '__main__':
    with open('../../../api_keys.yml', 'r') as f:
        keys = yaml.load(f)

    ms_asr = Microsoft_ASR(keys['binq_voice_key_1'])
    ms_asr.get_speech_token()

    # listen_mic(ms_asr, state)

    thr = threading.Thread(target=listen_mic, args=[ms_asr, state], kwargs={})
    thr.start()

    app.run(debug=True, use_reloader=False)
