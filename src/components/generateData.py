import random
import json

lats = []
longs = []

for x in range(100):
	n1 = random.uniform(51.280283,51.259833)
	n2 = random.uniform(4.345967,4.408521)
	lats.append(n1)
	longs.append(n2)
	
with open(data, 'wb') as outfile:
    json.dump(lats, outfile)