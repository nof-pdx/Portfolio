import time
import probabilty


# -------------------
# Name: Noah Funderburgh
# Date:12/11/2021
# Description: The program will tell you the probability of a series of independent events
# happening.
# All the information for this program was gathered from this website
# https://www.calculator.net/probability-calculator.html?cal4pa=0.5&cal4par=5&cal4pb=0.5&cal4pbr=3&calctype=series&x=71&y=32#series
# ------------------
def main():
    probabilityA = input("Probability of A occurring 1-100 :")
    repeatTimesA = input("Repeat Times:")
    probabilityB = input("Probability of B occurring 1-100 :")
    repeatTimesB = input("Repeat Times:")
    chance = probabilty.probabilityOccuringXTimes(probabilityA, repeatTimesA)
    print("Probability A occuring ", repeatTimesA, " times is: ", chance)
    chance = probabilty.probabilityNotOccuring(probabilityA, repeatTimesA)
    print("Probability A not occuring is: ", chance)
    chance = probabilty.probabilityOccuring(probabilityA, repeatTimesA)
    print("Probability A occuring is: ", chance)
    # ----------------------------------------------------------
    chance = probabilty.probabilityOccuringXTimes(probabilityB, repeatTimesB)
    print("Probability B occuring ", repeatTimesA, " times is: ", chance)
    chance = probabilty.probabilityNotOccuring(probabilityB, repeatTimesB)
    print("Probability B not occuring is: ", chance)
    chance = probabilty.probabilityOccuring(probabilityB, repeatTimesB)
    print("Probability B occuring is: ", chance)
    # ----------------------------------------------------------
    chance = probabilty.probabilityAOccurXTimesAndBOccurXTimes(probabilityA, repeatTimesA, probabilityB, repeatTimesB)
    print("Probability of A occuring ", repeatTimesA, " times and B ocurring ", repeatTimesB, " times is: ", chance)
    chance = probabilty.probabilityNeitherOccur(probabilityA, repeatTimesA, probabilityB, repeatTimesB)
    print("Probability neither A nor B occuring is: ", chance)
    chance = probabilty.probabilityBothAAndBOccur(probabilityA, repeatTimesA, probabilityB, repeatTimesB)
    print("Probability both A and B occuring is: ", chance)
    chance = probabilty.probabilityAOccursXTimesNotB(probabilityA, repeatTimesA, probabilityB, repeatTimesB)
    print("Probability A occurs", repeatTimesA, " times but not B is: ", chance)
    chance = probabilty.probabilityBOccursXTimesNotA(probabilityA, repeatTimesA, probabilityB, repeatTimesB)
    print("Probability B occurs", repeatTimesB, " times but not A is: ", chance)
    chance = probabilty.probabilityAOccurringNotB(probabilityA, repeatTimesA, probabilityB, repeatTimesB)
    print("Probability A occurs but not B is: ", chance)
    chance = probabilty.probabilityBOccurringNotA(probabilityA, repeatTimesA, probabilityB, repeatTimesB)
    print("Probability B occurs but not A is: ", chance)

    time.sleep(3)


if __name__ == '__main__':
    main()
