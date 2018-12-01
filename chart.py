import csv
import sys
import mpld3
import numpy as np
import matplotlib.pyplot as plt
userid = '385b2c636949e7034945e26d868c47b1a1275c71d1df951eda2e39d354e8bf'
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
fig_size = plt.rcParams["figure.figsize"]
fig_size[0] *= 3.5
plt.rcParams["figure.figsize"] = fig_size
fig = plt.subplots()[0]
x = np.arange(0, len(site)*6, 6)
plt.bar(x-1, height=total,width=2)
plt.bar(x+1, height=actual,width=2)
plt.xticks(x, site, rotation='90')
plt.ylabel('Actual activity time (sec)')
plt.legend(['Total Time', 'Actual Activity Time'])
print(mpld3.fig_to_html(fig))
