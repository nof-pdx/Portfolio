import requests
from htmldate import find_date
import time

results = requests.get('http://www.ibew.org/IBEW-COE')
results.raise_for_status()
oldDate = find_date('http://www.ibew.org/IBEW-COE', outputformat='%c')
print("Last time webstie was updated was:", oldDate)
print("Checking for updates")
# newDate = find_date('http://www.ibew.org/IBEW-COE', outputformat='%c')
# print(oldDate)
while True:
    newDate = find_date('http://www.ibew.org/IBEW-COE', outputformat='%c')
    if oldDate != newDate:
        newDate = oldDate
        print("Date was updated from ", oldDate, " to ", newDate)
    time.sleep(86400)
