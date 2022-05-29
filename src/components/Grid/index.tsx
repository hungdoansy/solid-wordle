import { Component, Index, Show } from "solid-js"
import { MAX_GUESSES } from "constants/settings"

import { CompletedRow } from "./CompletedRow"
import { CurrentRow } from "./CurrentRow"
import { EmptyRow } from "./EmptyRow"

type Props = {
    solution: string
    guesses: string[]
    currentGuess: string
    isRevealing?: boolean
}

export const Grid: Component<Props> = (props) => {
    const empties = () =>
        props.guesses.length < MAX_GUESSES - 1 ? Array.from(Array(MAX_GUESSES - 1 - props.guesses.length)) : []

    return (
        <>
            <Index each={props.guesses}>
                {(guess, i) => <CompletedRow solution={props.solution} guess={guess()} />}
            </Index>

            <Show when={props.guesses.length < MAX_GUESSES}>
                <CurrentRow guess={props.currentGuess} />
            </Show>

            <Index each={empties()}>{() => <EmptyRow />}</Index>
        </>
    )
}
