import { defineConfig } from "vite"

import solidPlugin from "vite-plugin-solid"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [
        solidPlugin(),
        tsconfigPaths(), // resolve absolute paths
    ],
    build: {
        target: "esnext",
        polyfillDynamicImport: false,
    },
    // This is a quick fix for
    // `Uncaught ReferenceError: process is not defined`
    define: {
        "process.env": {},
    },
})
