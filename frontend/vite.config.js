import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import path, { resolve } from 'path';
import pageData from './src/pageData.json' assert {type: 'json'};

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                login: resolve(__dirname, 'src/pages/login/login.html'),
                404: resolve(__dirname, 'src/pages/404/404.html'),
                500: resolve(__dirname, 'src/pages/500/500.html'),
            },
        },
    },
    plugins: [handlebars({
        context(pagePath) {
            return pageData[pagePath];
        },
        partialDirectory: resolve(__dirname, 'src/partials'),
        helpers: {
            capitalize: (str) => str.toUpperCase(),
        },
    })],
});