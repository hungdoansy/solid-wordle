import { Component, Index } from "solid-js"

import { getGuessStatuses } from "utils/statuses"
import { unicodeSplit } from "utils/words"

import { Cell } from "./Cell"

type Props = {
    solution: string
    guess: string
}

export const CompletedRow: Component<Props> = (props) => {
    const statuses = () => getGuessStatuses(props.solution, props.guess)
    const splitGuess = () => unicodeSplit(props.guess)

    return (
        <div class="flex justify-center mb-1">
            <Index each={splitGuess()}>
                {(letter, i) => (
                    <Cell value={letter()} status={statuses()[i]} position={i} isRevealing={false} isCompleted />
                )}
            </Index>
        </div>
    )
}
