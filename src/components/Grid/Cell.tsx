import { Component, createMemo, mergeProps } from "solid-js"
import classnames from "classnames"

import { CharStatus } from "utils/statuses"
import { REVEAL_TIME_MS } from "constants/settings"

type Props = {
    value?: string
    status?: CharStatus
    isRevealing?: boolean
    isCompleted?: boolean
    position?: number
}

export const Cell: Component<Props> = (_props) => {
    const props = mergeProps({ position: 0, value: "" }, _props)

    const isHighContrast = false
    const isFilled = createMemo(() => props.value && !props.isCompleted)
    const shouldReveal = createMemo(() => props.isRevealing && props.isCompleted)
    const animationDelay = createMemo(() => `${props.position * REVEAL_TIME_MS}ms`)
    const value = createMemo(() => props.value)

    const classes = createMemo(() =>
        classnames(
            "w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white",
            {
                "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600": !props.status,
                "border-black dark:border-slate-100": props.value && !props.status,
                "absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700":
                    props.status === CharStatus.Absent,
                "correct shadowed bg-orange-500 text-white border-orange-500":
                    props.status === CharStatus.Correct && isHighContrast,
                "present shadowed bg-cyan-500 text-white border-cyan-500":
                    props.status === CharStatus.Present && isHighContrast,
                "correct shadowed bg-green-500 text-white border-green-500":
                    props.status === CharStatus.Correct && !isHighContrast,
                "present shadowed bg-yellow-500 text-white border-yellow-500":
                    props.status === CharStatus.Present && !isHighContrast,
                "cell-fill-animation": isFilled(),
                "cell-reveal": shouldReveal(),
            }
        )
    )

    return (
        <div class={classes()} style={{ animationDelay: animationDelay() }}>
            <div class="letter-container" style={{ animationDelay: animationDelay() }}>
                {value()}
            </div>
        </div>
    )
}
