import sys
import numpy as np
import soundfile as sf
import tables


def sineWave(freq1, freq2, freq3, note, equalOrJust):
    t = np.linspace(0, 1, 48000 * 1, endpoint=False)
    sineData1 = (1 / 6) * np.sin(freq1 * 2 * np.pi * t)
    sineData2 = (1 / 6) * np.sin(freq2 * 2 * np.pi * t)
    sineData3 = (1 / 6) * np.sin(freq3 * 2 * np.pi * t)
    sineData = sineData1 + sineData3 + sineData2
    sf.write(note + '-' + equalOrJust + '.wav', sineData, 48000, subtype='PCM_16', endian='LITTLE')


def justCalculations(step, note, equalOrJust):
    steps = stepCaluation(step)
    step1 = steps[0]
    step2 = steps[1]
    step3 = steps[2]

    freq1 = justFreq(step1)
    freq2 = justFreq(step2)
    freq3 = justFreq(step3)
    sineWave(freq1, freq2, freq3, note, equalOrJust)


def justFreq(step):
    justFrequency = 440 * tables.just_ratios[step - 72]
    return justFrequency


def equalCalculations(step, note, equalOrJust):
    steps = stepCaluation(step)
    step1 = steps[0]
    step2 = steps[1]
    step3 = steps[2]

    freq1 = equalFreq(step1)
    freq2 = equalFreq(step2)
    freq3 = equalFreq(step3)
    sineWave(freq1, freq2, freq3, note, equalOrJust)


def equalFreq(step):
    equalFrequency = 440 * 2 ** ((step - 72) / 12)
    return equalFrequency


def stepCaluation(step):
    step1 = step
    step2 = step
    step3 = step
    distance = 0
    # print("final value", step)
    while distance <= 7:
        distance = distance + 1
        step = step + 1
        if step > 83:
            step = step - 12
        if distance == 5:
            step2 = step
            # print("final value", step)
        if distance == 7:
            step3 = step
            # print("final value", step)
    steps = [step1, step2, step3]
    return steps


def main():
    step = tables.name_to_key.get(sys.argv[1])
    if sys.argv[2] == 'just':
        justCalculations(step, sys.argv[1], sys.argv[2])
    else:
        justCalculations(step, sys.argv[1], sys.argv[2])


if __name__ == "__main__":
    main()
