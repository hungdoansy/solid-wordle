import { Component, createMemo, For } from "solid-js"

import { getGuessStatuses } from "utils/statuses"
import { unicodeSplit } from "utils/words"

import { Cell } from "./Cell"

type Props = {
    solution: string
    guess: string
    isRevealing?: boolean
}

export const CompletedRow: Component<Props> = (props) => {
    const statuses = createMemo(() => getGuessStatuses(props.solution, props.guess))
    const splitGuess = createMemo(() => unicodeSplit(props.guess))

    return (
        <div class="flex justify-center mb-1">
            <For each={splitGuess()}>
                {(letter, i) => (
                    <Cell
                        value={letter}
                        status={statuses()[i()]}
                        position={i()}
                        isRevealing={props.isRevealing}
                        isCompleted
                    />
                )}
            </For>
        </div>
    )
}
