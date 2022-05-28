import { unicodeSplit } from "./words"

export enum CharStatus {
    Absent = "Absent",
    Present = "Present",
    Correct = "Correct",
}

// get status of all keys in the keyboard
// return a map indexed by keys
// if a key doesn't exist, it's `absent`
export const getStatusesOfLetters = (solution: string, guesses: string[]): { [key: string]: CharStatus } => {
    const statusByLetter: { [key: string]: CharStatus } = {}
    const correctLetters = unicodeSplit(solution)

    guesses.forEach((word) => {
        unicodeSplit(word).forEach((letter, i) => {
            if (!correctLetters.includes(letter)) {
                statusByLetter[letter] = CharStatus.Absent
                return
            }

            if (letter === correctLetters[i]) {
                statusByLetter[letter] = CharStatus.Correct
                return
            }

            if (statusByLetter[letter] !== CharStatus.Correct) {
                statusByLetter[letter] = CharStatus.Present
            }
        })
    })

    return statusByLetter
}

export const getGuessStatuses = (solution: string, guess: string): CharStatus[] => {
    const correctLetters = unicodeSplit(solution)
    const guessesLetters = unicodeSplit(guess)

    const solutionCharsTaken = correctLetters.map((_) => false)

    const statuses: CharStatus[] = Array.from(Array(guess.length))

    guessesLetters.forEach((letter, i) => {
        if (letter === correctLetters[i]) {
            statuses[i] = CharStatus.Correct
            solutionCharsTaken[i] = true
        }
    })

    guessesLetters.forEach((letter, i) => {
        if (statuses[i]) {
            return
        }

        if (!correctLetters.includes(letter)) {
            statuses[i] = CharStatus.Absent
            return
        }

        const indexOfPresentChar = correctLetters.findIndex((x, index) => x === letter && !solutionCharsTaken[index])
        if (indexOfPresentChar > -1) {
            statuses[i] = CharStatus.Present
            solutionCharsTaken[indexOfPresentChar] = true
            return
        }

        statuses[i] = CharStatus.Absent
    })

    return statuses
}
