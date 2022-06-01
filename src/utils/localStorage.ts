const GAME_STATE_KEY = "GAME_STATE"

type GameState = {
    guesses: string[]
    answer: string
}

export const saveGameStateToLocalStorage = (gameState: GameState) => {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = (): GameState | null => {
    const state = localStorage.getItem(GAME_STATE_KEY)
    return state ? (JSON.parse(state) as GameState) : null
}
