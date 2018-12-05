import csv
import sys
import json
file=open("file.csv","r")
d={}
userid = sys.argv[1]
hostname = sys.argv[2]
with open('file.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        # print (row,row[1],row[1] !=userid and row[2]==hostname)
        if row[1] !=userid and row[2]==hostname:
            #print(row[4],d)
            #if row[4]=='':
                #print ("no path name")
            if row[4] in d:
                # print (row[4],"aready exits in dict")
                d[row[4]][0]+=1
                d[row[4]][1]+=int(row[7])
                d[row[4]][2]+=int(row[8])
            else:
                # print (row[4],"doesn't exits in dict")
                d[row[4]]=[]
                d[row[4]].append(1)
                d[row[4]].append(int(row[8]))
                d[row[4]].append(int(row[7]))
                d[row[4]].append(row[6])
                if row[3]!='':
                    d[row[4]].append(row[3])
#print ("this is dic:")
#for i in d:
    #print(i,d[i])
s=sorted(d.items(), key=lambda i:(i[1][0],i[1][1],i[1][2],i[1][3]),reverse=True)
l1,l2,l3=s[0],s[1],s[2]
#print((l1[1][3]))
finalList = []
if len(l1[1])==5:
    finalList.append({'title':l1[1][3],'url':hostname+':'+l1[1][4]+l1[0]})
else:
    finalList.append({'title':l1[1][3],'url':hostname+l1[0]})
if len(l2[1])==5:
    finalList.append({'title':l2[1][3],'url':hostname+':'+l2[1][4]+l2[0]})
else:
    finalList.append({'title':l2[1][3],'url':hostname+l2[0]})
if len(l3[1])==5:
    finalList.append({'title':l3[1][3],'url':hostname+':'+l3[1][4]+l3[0]})
else:
    finalList.append({'title':l3[1][3],'url':hostname+l3[0]})
print(json.dumps(finalList))
