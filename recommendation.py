import csv
import operator
import sys
print("hello")
file=open("file.csv","r")
d={}
userid = sys.argv[1]
hostname = sys.argv[2]
print(userid,hostname)
with open('file.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        if row[1] !=userid and row[2]==hostname:
            print("inside")
            if row[3] in d:
                d[row[3]][0]+=1
                d[row[3]][1]+=int(row[4])
                d[row[3]][2]+=int(row[5])
            else:
                d[row[3]]=[]
                d[row[3]].append(1)
                d[row[3]].append(int(row[4]))
                d[row[3]].append(int(row[5]))
def sort_key(student):
    return student[1]
print(d)
print (sorted(d.items(), key=operator.itemgetter(1)))
print (sorted(d.items(), key=operator.itemgetter(1),reverse=True))
