import requests
import re
import sys
import mpld3
import pandas as pd
from bs4 import BeautifulSoup
from collections import Counter
from string import punctuation
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import matplotlib.pyplot as plt
userid = sys.argv[1]
#main_c=Counter()
def myKey(x):
    return x[1]
df = pd.read_csv("file.csv")
df.loc[df['userid']==userid]
saved_column=df.hostname
urls=set("http://"+saved_column)
final_list = []
for url in urls:
    r = requests.get(url)
    stop_words=set(stopwords.words('english'))
    soup = BeautifulSoup(r.content,features="html.parser")
    text = (''.join(s.findAll(text=True)) for s in soup.findAll('p'))
    c = Counter((x.rstrip(punctuation).upper() for y in text for x in y.split() if x not in stop_words if x not in "!#$%&\'()*+,-./->:;<=>?@[\\]^_`{|}~"))
    words=c.most_common(20)
    #main_c.update(words)
    #print(words)
    for i in words:
          final_list.append(i)
#print([x for x in c if c.get(x) >= 2])
plist = sorted(final_list, key=myKey, reverse=True)[:10]
#print(plist)
explode = (0.1,0,0,0,0,0,0,0,0,0)
sizes, labels = [i[1] for i in plist],[i[0] for i in plist]
fig = plt.subplots()[0]
plt.pie(sizes, explode=explode, labels=labels,autopct='%1.1i%%', shadow=True, startangle=90)
print(mpld3.fig_to_html(fig))
sys.stdout.flush()
