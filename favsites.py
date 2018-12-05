import sys
import json
import pandas as pd
from collections import Counter
userid = sys.argv[1]
df = pd.read_csv("file.csv")
df.loc[df['userid']==userid]
saved_column=df.hostname
#res = str(Counter(saved_column))
a = Counter(saved_column)
d = []
for k,v in a.items():
    d.append({"name": k, "count": v})
print(json.dumps(d))
