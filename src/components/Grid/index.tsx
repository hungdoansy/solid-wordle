import { Component, Index, Show } from "solid-js"

import { MAX_GUESSES } from "constants/settings"
import { useGlobalState } from "contexts/globalState"

import { CompletedRow } from "./CompletedRow"
import { CurrentRow } from "./CurrentRow"
import { EmptyRow } from "./EmptyRow"

export const Grid: Component = () => {
    const { guesses, currentGuess, isRevealing } = useGlobalState()

    const empties = () =>
        guesses().length < MAX_GUESSES - 1 ? Array.from(Array(MAX_GUESSES - 1 - guesses().length)) : []

    return (
        <>
            <Index each={guesses()}>
                {(guess, i) => (
                    <CompletedRow isRevealing={isRevealing() && i === guesses().length - 1} guess={guess()} />
                )}
            </Index>

            <Show when={guesses().length < MAX_GUESSES}>
                <CurrentRow guess={currentGuess()} />
            </Show>

            <Index each={empties()}>{() => <EmptyRow />}</Index>
        </>
    )
}
