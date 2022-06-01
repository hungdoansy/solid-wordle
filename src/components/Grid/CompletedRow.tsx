import { Component, Index } from "solid-js"

import { useGlobalState } from "contexts/globalState"
import { getGuessStatuses } from "utils/statuses"
import { unicodeSplit } from "utils/words"

import { Cell } from "./Cell"

type Props = {
    guess: string
    isRevealing?: boolean
}

export const CompletedRow: Component<Props> = (props) => {
    const { answer } = useGlobalState()

    const statuses = () => getGuessStatuses(answer, props.guess)
    const splitGuess = () => unicodeSplit(props.guess)

    return (
        <div class="flex justify-center mb-1">
            <Index each={splitGuess()}>
                {(letter, i) => (
                    <Cell
                        isRevealing={props.isRevealing}
                        value={letter()}
                        status={statuses()[i]}
                        position={i}
                        isCompleted
                    />
                )}
            </Index>
        </div>
    )
}
