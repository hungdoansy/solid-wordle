import { Component } from "solid-js"

type Props = {
    class?: string
}

const InformationCircleIcon: Component<Props> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            view-box="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            class={props.class}
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    )
}

export default InformationCircleIcon
