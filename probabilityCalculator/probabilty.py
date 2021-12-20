def probabilityOccuringXTimes(proability, repeatTimes):
    proability = int(proability)
    repeatTimes = int(repeatTimes)
    chance = (proability / 100) ** repeatTimes
    return chance


def probabilityNotOccuring(probability, repeatTimes):
    probability = int(probability)
    repeatTimes = int(repeatTimes)
    chance = (1 - (probability / 100)) ** repeatTimes
    return chance


def probabilityOccuring(probability, repeatTimes):
    probability = int(probability)
    repeatTimes = int(repeatTimes)
    chance = 1 - (1 - (probability / 100)) ** repeatTimes
    return chance


def probabilityAOccurXTimesAndBOccurXTimes(probabilityA, repeatTimesA, probabilityB, repeatTimesB):
    probabilityA = int(probabilityA)
    repeatTimesA = int(repeatTimesA)
    probabilityB = int(probabilityB)
    repeatTimesB = int(repeatTimesB)
    chance = ((probabilityA / 100) ** repeatTimesA) * ((probabilityB / 100) ** repeatTimesB)
    return chance


def probabilityNeitherOccur(probabilityA, repeatTimesA, probabilityB, repeatTimesB):
    probabilityA = int(probabilityA)
    repeatTimesA = int(repeatTimesA)
    probabilityB = int(probabilityB)
    repeatTimesB = int(repeatTimesB)
    chance = ((1 - (probabilityA / 100)) ** repeatTimesA) * ((1 - (probabilityB / 100)) ** repeatTimesB)
    return chance


def probabilityBothAAndBOccur(probabilityA, repeatTimesA, probabilityB, repeatTimesB):
    probabilityA = int(probabilityA)
    repeatTimesA = int(repeatTimesA)
    probabilityB = int(probabilityB)
    repeatTimesB = int(repeatTimesB)
    chance = (1 - (1 - (probabilityA / 100)) ** repeatTimesA) * (1 - (1 - (probabilityB / 100)) ** repeatTimesB)
    return chance


def probabilityAOccursXTimesNotB(probabilityA, repeatTimesA, probabilityB, repeatTimesB):
    probabilityA = int(probabilityA)
    repeatTimesA = int(repeatTimesA)
    probabilityB = int(probabilityB)
    repeatTimesB = int(repeatTimesB)
    chance = ((probabilityA / 100) ** repeatTimesA) * ((1 - (probabilityB / 100)) ** repeatTimesB)
    return chance


def probabilityBOccursXTimesNotA(probabilityA, repeatTimesA, probabilityB, repeatTimesB):
    probabilityA = int(probabilityA)
    repeatTimesA = int(repeatTimesA)
    probabilityB = int(probabilityB)
    repeatTimesB = int(repeatTimesB)
    chance = ((1 - (probabilityA / 100)) ** repeatTimesA) * ((probabilityB / 100) ** repeatTimesB)
    return chance


def probabilityAOccurringNotB(probabilityA, repeatTimesA, probabilityB, repeatTimesB):
    probabilityA = int(probabilityA)
    repeatTimesA = int(repeatTimesA)
    probabilityB = int(probabilityB)
    repeatTimesB = int(repeatTimesB)
    chance = (1 - (1 - (probabilityA / 100)) ** repeatTimesA) * ((1 - (probabilityB / 100)) ** repeatTimesB)
    return chance


def probabilityBOccurringNotA(probabilityA, repeatTimesA, probabilityB, repeatTimesB):
    probabilityA = int(probabilityA)
    repeatTimesA = int(repeatTimesA)
    probabilityB = int(probabilityB)
    repeatTimesB = int(repeatTimesB)
    chance = ((1 - (probabilityA / 100)) ** repeatTimesA) * (1 - (1 - (probabilityB / 100)) ** repeatTimesB)
    return chance
