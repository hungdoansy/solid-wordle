import { Component, createEffect } from "solid-js"
import GraphemeSplitter from "grapheme-splitter"

import { Keyboard } from "components/Keyboard"
import { Grid } from "components/Grid"
import NavBar from "components/NavBar"
import { useGlobalState } from "contexts/globalState"
import { MAX_GUESSES, REVEAL_TIME_MS } from "constants/settings"
import { solution, unicodeLength } from "utils/words"

const App: Component = () => {
    const { answer, currentGuess, setCurrentGuess, setRevealing, guesses, setGuesses } = useGlobalState()

    const hasWon = () => guesses().includes(answer)
    const hasLost = () => !hasWon() && guesses().length === MAX_GUESSES

    const onChar = (value: string) => {
        if (
            unicodeLength(`${currentGuess()}${value}`) <= solution.length &&
            guesses().length < MAX_GUESSES &&
            !hasWon()
        ) {
            setCurrentGuess(`${currentGuess()}${value}`)
        }
    }

    const onDelete = () => {
        setCurrentGuess(new GraphemeSplitter().splitGraphemes(currentGuess()).slice(0, -1).join(""))
    }

    const onEnter = () => {
        if (hasWon() || hasLost()) {
            return
        }

        setRevealing(true)
        // turn this back off after all
        // chars have been revealed
        setTimeout(() => {
            setRevealing(false)
        }, REVEAL_TIME_MS * solution.length)

        if (unicodeLength(currentGuess()) === solution.length && guesses().length < MAX_GUESSES && !hasWon()) {
            setGuesses([...guesses(), currentGuess()])
            setCurrentGuess("")
        }
    }

    createEffect(() => {
        console.log("currentGuess", currentGuess())
    })

    return (
        <div class="h-screen flex flex-col">
            <NavBar />
            <div class="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
                <div class="pb-6 grow">
                    <Grid />
                </div>
                <Keyboard onChar={onChar} onDelete={onDelete} onEnter={onEnter} />
            </div>
        </div>
    )
}

export default App
