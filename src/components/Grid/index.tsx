import { MAX_GUESSES } from "constants/settings"
import { Component, For, Show } from "solid-js"

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
            <For each={props.guesses}>
                {(guess, i) => (
                    <CompletedRow
                        solution={props.solution}
                        guess={guess}
                        isRevealing={props.isRevealing && props.guesses.length - 1 === i()}
                    />
                )}
            </For>

            <Show when={props.guesses.length < MAX_GUESSES}>
                <CurrentRow guess={props.currentGuess} />
            </Show>

            <For each={empties()}>{() => <EmptyRow />}</For>
        </>
    )
}
