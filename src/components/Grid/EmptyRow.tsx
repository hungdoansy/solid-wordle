import { Component, Index } from "solid-js"
import { solution } from "utils/words"
import { Cell } from "./Cell"

export const EmptyRow: Component = () => {
    const emptyCells = Array.from(Array(solution.length))

    return (
        <div class="flex justify-center mb-1">
            <Index each={emptyCells}>{() => <Cell />}</Index>
        </div>
    )
}
