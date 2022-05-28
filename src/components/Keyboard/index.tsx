import { createMemo, For, onMount } from "solid-js"
import { getStatusesOfLetters } from "utils/statuses"
import { ENTER_TEXT, DELETE_TEXT } from "constants/strings"
import { localeAwareUpperCase } from "utils/words"

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
    const solution = createMemo(() => props.solution)
    const guesses = createMemo(() => props.guesses)
    const charStatuses = createMemo(() => getStatusesOfLetters(solution(), guesses()))

    const onClick = (value: string) => {
        if (value === "ENTER") {
            props.onEnter()
        } else if (value === "DELETE") {
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
                <For each={["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]}>
                    {(key) => (
                        <Key value={key} onClick={onClick} status={charStatuses[key]} isRevealing={props.isRevealing} />
                    )}
                </For>
            </div>
            <div class="flex justify-center mb-1">
                <For each={["A", "S", "D", "F", "G", "H", "J", "K", "L"]}>
                    {(key) => (
                        <Key value={key} onClick={onClick} status={charStatuses[key]} isRevealing={props.isRevealing} />
                    )}
                </For>
            </div>
            <div class="flex justify-center">
                <Key width={65.4} value="ENTER" onClick={onClick}>
                    {ENTER_TEXT}
                </Key>
                <For each={["Z", "X", "C", "V", "B", "N", "M"]}>
                    {(key) => (
                        <Key value={key} onClick={onClick} status={charStatuses[key]} isRevealing={props.isRevealing} />
                    )}
                </For>
                <Key width={65.4} value="DELETE" onClick={onClick}>
                    {DELETE_TEXT}
                </Key>
            </div>
        </div>
    )
}
