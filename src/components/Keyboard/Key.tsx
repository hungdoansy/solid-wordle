import { children, Component, JSX } from "solid-js"

import { useGlobalState } from "contexts/globalState"
import { REVEAL_TIME_MS } from "constants/settings"
import { CharStatus } from "utils/statuses"
import { solution } from "utils/words"

type Props = {
    children?: JSX.Element
    value: string
    width: number
    status?: CharStatus
    onClick: (value: string) => void
}

const keyDelayInMs = REVEAL_TIME_MS * solution.length

export const Key: Component<Props> = (props) => {
    // TODO: may not need this?
    const resolved = children(() => props.children)

    const { isRevealing } = useGlobalState()

    // TODO
    const isHighContrast = false

    const classList = () => ({
        "transition ease-in-out": isRevealing(),
        "bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400": !props.status,
        "bg-slate-400 dark:bg-slate-800 text-white": props.status === CharStatus.Absent,
        "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white":
            props.status === CharStatus.Correct && isHighContrast,
        "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white":
            props.status === CharStatus.Present && isHighContrast,
        "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white":
            props.status === CharStatus.Correct && !isHighContrast,
        "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white":
            props.status === CharStatus.Present && !isHighContrast,
    })

    const styles = () => ({
        "transition-delay": isRevealing() ? `${keyDelayInMs}ms` : "unset",
        width: `${props.width}px`,
        height: "58px",
    })

    const handleClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (event) => {
        props.onClick(props.value)
        event.currentTarget.blur()
    }

    return (
        <button
            class="flex items-center justify-center rounded mx-0.5 text-sm font-bold cursor-pointer select-none dark:text-white"
            classList={classList()}
            style={styles()}
            aria-label={`${props.value} ${props.status || CharStatus.Absent}`}
            onClick={handleClick}
        >
            {resolved() || props.value}
        </button>
    )
}
