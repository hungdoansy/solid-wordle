import { Component } from "solid-js"
import { GAME_TITLE } from "constants/strings"

import ChartBarIcon from "./ChartBarIcon"
import CogIcon from "./CogIcon"
import InformationCircleIcon from "./InformationCircleIcon"

type Props = {
    class?: string
}

const NavBar: Component<Props> = (props) => {
    return (
        <div class="navbar">
            <div class="flex items-center justify-between h-12 px-5">
                <div class="flex w-24 justify-start">
                    <InformationCircleIcon class="h-6 w-6 mr-2 cursor-pointer dark:stroke-white" />
                </div>
                <p class="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
                <div class="flex w-24 justify-end">
                    <ChartBarIcon class="h-6 w-6 mr-3 cursor-pointer dark:stroke-white" />
                    <CogIcon class="h-6 w-6 cursor-pointer dark:stroke-white" />
                </div>
            </div>
            <hr></hr>
        </div>
    )
}

export default NavBar
