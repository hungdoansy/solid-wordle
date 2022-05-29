import { Index, onMount } from "solid-js"

import { getStatusesOfLetters } from "utils/statuses"
import { localeAwareUpperCase } from "utils/words"
import { ENTER_TEXT, DELETE_TEXT } from "constants/strings"

import { Key } from "./Key"

type Props = {
    onChar: (value: string) => void
    onDelete: () => void
    onEnter: () => void
    solution: string
    guesses: string[]
    isRevealing?: boolean
}

export const Keyboard = (props: Props) => {
    const charStatuses = () => getStatusesOfLetters(props.solution, props.guesses)

    const onClick = (value: string) => {
        if (value === ENTER_TEXT) {
            props.onEnter()
        } else if (value === DELETE_TEXT) {
            props.onDelete()
        } else {
            props.onChar(value)
        }
    }

    onMount(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === "Enter") {
                props.onEnter()
            } else if (e.code === "Backspace") {
                props.onDelete()
            } else {
                const key = localeAwareUpperCase(e.key)
                // TODO: check this test if the range works with non-english letters
                if (key.length === 1 && key >= "A" && key <= "Z") {
                    props.onChar(key)
                }
            }
        }
        window.addEventListener("keyup", listener)
        return () => {
            window.removeEventListener("keyup", listener)
        }
    })

    return (
        <div>
            <div class="flex justify-center mb-1">
                <Index each={["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]}>
                    {(key) => (
                        <Key
                            width={40}
                            value={key()}
                            onClick={onClick}
                            status={charStatuses()[key()]}
                            isRevealing={props.isRevealing}
                        />
                    )}
                </Index>
            </div>
            <div class="flex justify-center mb-1">
                <Index each={["A", "S", "D", "F", "G", "H", "J", "K", "L"]}>
                    {(key) => (
                        <Key
                            width={40}
                            value={key()}
                            onClick={onClick}
                            status={charStatuses()[key()]}
                            isRevealing={props.isRevealing}
                        />
                    )}
                </Index>
            </div>
            <div class="flex justify-center">
                <Key width={65.4} value={ENTER_TEXT} onClick={onClick}>
                    {ENTER_TEXT}
                </Key>
                <Index each={["Z", "X", "C", "V", "B", "N", "M"]}>
                    {(key) => (
                        <Key
                            width={40}
                            value={key()}
                            onClick={onClick}
                            status={charStatuses()[key()]}
                            isRevealing={props.isRevealing}
                        />
                    )}
                </Index>
                <Key width={65.4} value={DELETE_TEXT} onClick={onClick}>
                    {DELETE_TEXT}
                </Key>
            </div>
        </div>
    )
}
