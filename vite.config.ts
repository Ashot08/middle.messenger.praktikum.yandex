import { defineConfig } from 'vite'
import checker from "vite-plugin-checker";
import vitePluginHandlebarsPrecompile from "./vite-plugin-handelbars-precompile.js";
import { resolve } from 'path';

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'src/dist'),
    },
    plugins: [
        vitePluginHandlebarsPrecompile(),
        checker({
            typescript: true,
        }),
    ],
});



