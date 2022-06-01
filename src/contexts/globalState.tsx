import { createSignal, createContext, useContext, Component, JSX, Accessor, Setter, onMount } from "solid-js"
import { loadGameStateFromLocalStorage } from "utils/localStorage"
import { solution as answer } from "utils/words"

type IContext = {
    answer: string

    isRevealing: Accessor<boolean>
    setRevealing: Setter<boolean>

    currentGuess: Accessor<string>
    setCurrentGuess: Setter<string>

    guesses: Accessor<string[]>
    setGuesses: Setter<string[]>
}

const GlobalContext = createContext<IContext>()

export const GlobalStateProvider: Component<{ children: JSX.Element }> = (props) => {
    const [isRevealing, setRevealing] = createSignal(false)
    const [currentGuess, setCurrentGuess] = createSignal("")
    const [guesses, setGuesses] = createSignal<string[]>([])

    const store: IContext = {
        answer,
        isRevealing,
        setRevealing,
        currentGuess,
        setCurrentGuess,
        guesses,
        setGuesses,
    }

    onMount(() => {
        const loadedState = loadGameStateFromLocalStorage()
        if (loadedState?.answer === answer) {
            setGuesses(loadedState.guesses)
        }
    })

    return <GlobalContext.Provider value={store}>{props.children}</GlobalContext.Provider>
}

export function useGlobalState() {
    return useContext(GlobalContext)
}
