import { Component, For } from "solid-js"
import { solution } from "utils/words"
import { Cell } from "./Cell"

export const EmptyRow: Component = () => {
    const emptyCells = Array.from(Array(solution.length))

    return (
        <div class="flex justify-center mb-1">
            <For each={emptyCells}>{() => <Cell />}</For>
        </div>
    )
}
