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

data = dict()
with open('adam.json', 'r') as f:
	adam = json.load(f)
	for a,v in adam.items():
		data['adam'] = v

with open('aksha.json', 'r') as f:
	aksha = json.load(f)
	for a,v in aksha.items():
		data['aksha'] = v
		
with open('arthur.json', 'r') as f:
	arthur = json.load(f)
	for a,v in arthur.items():
		data['arthur'] = v

	
	agreement = []
	for emotions in np.asarray(list(data.values())).T:
		sort, counter = frequency(emotions)
		a = counter[sort[0]]
		for j in range(1, len(sort)):
			a -= counter[sort[j]]
		agreement.append((2*(a/len(emotions)))-1)
	
	print(agreement)
	
with open('emotionAgreement.json', 'w') as outfile:
    json.dump(agreement, outfile)