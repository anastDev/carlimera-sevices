import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react(), tailwindcss()],
    // base: "/carlimera-services",
    server: {
        allowedHosts: [ "backboard-expensive-slinky.ngrok-free.dev" ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
