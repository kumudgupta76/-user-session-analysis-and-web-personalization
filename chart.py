import csv
import sys
import mpld3
import numpy as np
import matplotlib.pyplot as plt
userid = sys.argv[1]
site = list()
actual = list()
total = list()
with open('file.csv') as csvfile:
        readCSV = csv.reader(csvfile, delimiter=',')
        for row in readCSV:
                if row[1]==userid:
                        if row[2] in site:
                                actual[site.index(row[2])] += int(row[8])
                                total[site.index(row[2])] += int(row[7])
                        else:
                                site.append(row[2])
                                actual.append(int(row[8]))
                                total.append(int(row[7]))
fig = plt.subplots()[0]
x = np.arange(len(site))
plt.bar(x-0.1, height=total,width=0.2)
plt.bar(x+0.1, height=actual,width=0.2)
plt.xticks(x, site, rotation=90)
plt.ylabel('Actual activity time (sec)')
plt.legend(['Total Time', 'Actual Activity Time'])
print(mpld3.fig_to_html(fig))
