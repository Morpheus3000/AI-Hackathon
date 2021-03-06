from __future__ import print_function
import facedetector
from closest import closest
from imutils.video import FileVideoStream
from itertools import groupby as g
import argparse

import time 
import requests
import cv2
import operator
import numpy as np
import math
import json

def frequency(L):
	counter = {}
	for word in L:
		 if word in counter:
			 counter[word] += 1
		 else:
			 counter[word] = 1
	 
	return sorted(counter, key = counter.get, reverse = True), counter
	
def renderResultOnImage( result, img ):
	
	"""Display the obtained results onto the input image"""
	for currFace in result:
		faceRectangle = currFace['faceRectangle']
		cv2.rectangle( img,(faceRectangle['left'],faceRectangle['top']),
						(faceRectangle['left']+faceRectangle['width'], faceRectangle['top'] + faceRectangle['height']),
					color = (255,0,0), thickness = 5 )


	for currFace in result:
		faceRectangle = currFace['faceRectangle']
		currEmotion = max(currFace['scores'].items(), key=operator.itemgetter(1))[0]


		textToWrite = "%s" % ( currEmotion )
		cv2.putText( img, textToWrite, (faceRectangle['left'],faceRectangle['top']-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,0,0), 1 )

def processRequest( json, data, headers, params ):

	"""
	Helper function to process the request to Project Oxford

	Parameters:
	json: Used when processing images from its URL. See API Documentation
	data: Used when processing image read from disk. See API Documentation
	headers: Used to pass the key information and the data type request
	"""

	retries = 0
	result = None

	while True:

		response = requests.request( 'post', _url, json = json, data = data, headers = headers, params = params )

		if response.status_code == 429: 

			print( "Message: %s" % ( response.json()['error']['message'] ) )

			if retries <= _maxNumRetries: 
				time.sleep(1) 
				retries += 1
				continue
			else: 
				print( 'Error: failed after retrying!' )
				break

		elif response.status_code == 200 or response.status_code == 201:

			if 'content-length' in response.headers and int(response.headers['content-length']) == 0: 
				result = None 
			elif 'content-type' in response.headers and isinstance(response.headers['content-type'], str): 
				if 'application/json' in response.headers['content-type'].lower(): 
					result = response.json() if response.content else None 
				elif 'image' in response.headers['content-type'].lower(): 
					result = response.content
		else:
			print( "Error code: %d" % ( response.status_code ) )
			print( "Message: %s" % ( response.json()['error']['message'] ) )

		break
		
	return result
	
def extractEmotions(fileName, frameWindow, frameRate):
	fvs = FileVideoStream(fileName).start()
	time.sleep(1.0)
	
	frameId = 0
	initial = True
	nm = 0

	frame = fvs.read()
	while fvs.more():
		if ( int(frameId-frameWindow/2) % frameRate == 0):
			# collect emitions in the frameWindow
			for j in range(frameWindow):
				curr_tl = []
				# data = frame.tobytes()
				cv2.imwrite('img.jpg', frame)
				pathToFileInDisk = r'.\img.jpg'
				with open( pathToFileInDisk, 'rb' ) as f:
					data = f.read()
				if (data is None):
					break
					
				headers = dict()
				headers['Ocp-Apim-Subscription-Key'] = _key
				headers['Content-Type'] = 'application/octet-stream'
				json = None
				params = None
				
				result = processRequest( json, data, headers, params )
				if result is not None:
					if initial:
						emotionDictionary = dict()
						avgEmotionDictionary = dict()
						# agreements = []
						nmFaces = len(result)
						for i in range(nmFaces):
							emotionDictionary[i] = []
							avgEmotionDictionary[i] = []
						for (i, currFace) in enumerate(result):
							faceRectangle = currFace['faceRectangle']
							tl = (faceRectangle['left'],faceRectangle['top'])
							currEmotion = max(currFace['scores'].items(), key=operator.itemgetter(1))[0]
							emotionDictionary[i].append(currEmotion)
							curr_tl.append(tl)
						initial = False
						
						# data8uint = np.fromstring( data, np.uint8 ) # Convert string to an unsigned int array
						# img = cv2.cvtColor( cv2.imdecode( data8uint, cv2.IMREAD_COLOR ), cv2.COLOR_BGR2RGB )
						# renderResultOnImage( result, img )
						# cv2.imshow('img', img)
						# cv2.waitKey(2)
					else:
						for currFace in result:
							faceRectangle = currFace['faceRectangle']
							tl = (faceRectangle['left'],faceRectangle['top'])
							index = closest(prev_tl, tl)
							currEmotion = max(currFace['scores'].items(), key=operator.itemgetter(1))[0]
							emotionDictionary[index].append(currEmotion)
							curr_tl.append(tl)
						
						# data8uint = np.fromstring( data, np.uint8 ) # Convert string to an unsigned int array
						# img = cv2.cvtColor( cv2.imdecode( data8uint, cv2.IMREAD_COLOR ), cv2.COLOR_BGR2RGB )
						# renderResultOnImage( result, img )
						# cv2.imshow('img', img)
						# cv2.waitKey(2)
					
					prev_tl = curr_tl

				# print(frameId)
				frameId += 1
				time.sleep(0.01)
				frame = fvs.read()
				if not fvs.more():
					break

			# Select the avg emotion per person
			emotionsAtTimepoint = []
			for (person, emotions) in emotionDictionary.items():
				mc_emotion, _ = frequency(emotions)
				avgEmotionDictionary[person].append(mc_emotion[0])
				# emotionsAtTimepoint.append(mc_emotion[0])
			for i in range(nmFaces):
				emotionDictionary[i] = []			
			# print(emotionsAtTimepoint)
			emotions, freqDict  = frequency(emotionsAtTimepoint)
			# agreements.append(freqDict[emotions[0]]/nmFaces)
		else:
			time.sleep(0.01)
			frame = fvs.read()
			# print(frameId)
			frameId += 1
		
	fvs.stop()
	print(avgEmotionDictionary)
	# print(agreements)
	
	return avgEmotionDictionary


# Variables
_url = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize'
_key = '418f9d88e1c34fabb4cb1fa9e7dab1fc'
_maxNumRetries = 10
	
ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video", required=True, help="path to input video file")
ap.add_argument("-o", "--output", required=True, help="path to json output")
ap.add_argument("-w", "--window", required=False, help="frame window to average emotion across", default=1)
ap.add_argument("-r", "--rate", required=False, help="frame rate to extract emotions", default=180)
args = vars(ap.parse_args())	
	
fileName = args["video"]
frameWindow = args["window"]
frameRate = args["rate"]

dict = extractEmotions(fileName, frameWindow, frameRate)

with open(args["output"], 'w') as outfile:
    json.dump(dict, outfile)


