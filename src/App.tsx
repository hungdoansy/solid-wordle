import { Component, createEffect, createSignal } from "solid-js"
import GraphemeSplitter from "grapheme-splitter"

import { Keyboard } from "components/Keyboard"
import { Grid } from "components/Grid"
import NavBar from "components/NavBar"
import { MAX_GUESSES, REVEAL_TIME_MS } from "constants/settings"
import { isWinningWord, solution, unicodeLength } from "utils/words"

console.log({ solution })

const App: Component = () => {
    const [currentGuess, setCurrentGuess] = createSignal("")
    const [isGameWon, setGameWon] = createSignal(false)
    const [isGameLost, setGameLost] = createSignal(false)
    const [isRevealing, setRevealing] = createSignal(false)
    const [guesses, setGuesses] = createSignal<string[]>([])

    createEffect(() => {
        console.log("currentGuess", currentGuess())
    })

    const onChar = (value: string) => {
        if (
            unicodeLength(`${currentGuess()}${value}`) <= solution.length &&
            guesses().length < MAX_GUESSES &&
            !isGameWon()
        ) {
            setCurrentGuess(`${currentGuess()}${value}`)
        }
    }

    const onDelete = () => {
        setCurrentGuess(new GraphemeSplitter().splitGraphemes(currentGuess()).slice(0, -1).join(""))
    }

    const onEnter = () => {
        if (isGameWon() || isGameLost()) {
            return
        }

        setRevealing(true)
        // turn this back off after all
        // chars have been revealed
        setTimeout(() => {
            setRevealing(false)
        }, REVEAL_TIME_MS * solution.length)

        const winningWord = isWinningWord(currentGuess())

        if (unicodeLength(currentGuess()) === solution.length && guesses().length < MAX_GUESSES && !isGameWon()) {
            setGuesses([...guesses(), currentGuess()])
            setCurrentGuess("")

            if (winningWord) {
                setGameWon(true)
                return
            }

            if (guesses.length === MAX_GUESSES - 1) {
                setGameLost(true)
                return
            }
        }
    }

    return (
        <div class="h-screen flex flex-col">
            <NavBar />
            <div class="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
                <div class="pb-6 grow">
                    <Grid
                        solution={solution}
                        guesses={guesses()}
                        currentGuess={currentGuess()}
                        isRevealing={isRevealing()}
                    />
                </div>
                <Keyboard
                    onChar={onChar}
                    onDelete={onDelete}
                    onEnter={onEnter}
                    solution={solution}
                    guesses={guesses()}
                    isRevealing={isRevealing()}
                />
            </div>
        </div>
    )
}

export default App
