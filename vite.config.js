import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { resolve } from 'path';
import checker from "vite-plugin-checker";
import vitePluginHandlebarsPrecompile from "./vite-plugin-handelbars-precompile.js";

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
            },
        },
    },
    plugins: [
        vitePluginHandlebarsPrecompile(),
        checker({
            typescript: true,
        }),
    ],
});

