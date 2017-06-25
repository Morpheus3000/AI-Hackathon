import numpy as np
import pandas as pd

from flask import Flask
from flask import jsonify

from plot import *

scores = pd.read_csv('topics.csv')
scores = scores.drop(scores.columns[0:3], axis=1)
scores = scores.T.to_dict().values()

app = Flask(__name__)

@app.route('/topic_stats')
def index():
    return jsonify(scores)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
