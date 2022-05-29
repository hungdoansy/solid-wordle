import { Component, For } from "solid-js"
import { solution, unicodeSplit } from "utils/words"
import { Cell } from "./Cell"

type Props = {
    guess: string
}

export const CurrentRow: Component<Props> = (props) => {
    const splitGuess = () => unicodeSplit(props.guess)
    const emptyCells = () => Array.from(Array(solution.length - splitGuess().length))

    return (
        <div class="flex justify-center mb-1">
            <For each={splitGuess()}>{(letter) => <Cell value={letter} />}</For>
            <For each={emptyCells()}>{() => <Cell />}</For>
        </div>
    )
}
