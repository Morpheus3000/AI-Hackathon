from __future__ import print_function
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


with open('emotions.json', 'r') as f:
	data = json.load(f)
	agreement = []
	for emotions in np.asarray(list(data.values())).T:
		sort, counter = frequency(emotions)
		a = counter[sort[0]]
		for j in range(1, len(sort)):
			a -= counter[sort[j]]
		agreement.append((a/len(emotions)*2)-1)
	
	print(agreement)
	
with open('emotionAgreement.json', 'w') as outfile:
    json.dump(agreement, outfile)