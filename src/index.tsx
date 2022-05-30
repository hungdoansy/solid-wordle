/* @refresh reload */
import { render } from "solid-js/web"
import { GlobalStateProvider } from "contexts/globalState"
import App from "./App"
import "./index.css"

render(
    () => (
        <GlobalStateProvider>
            <App />
        </GlobalStateProvider>
    ),
    document.getElementById("root") as HTMLElement
)
