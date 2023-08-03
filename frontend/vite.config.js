import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import path, { resolve } from 'path';

const pageData = {
    '/index.html': {
        test: {
            dirname: __dirname,
            title: 'my site'
        },
    },
    '/pages/login/login.html': {
        names: [{name: 'JORA'}, {name:'OLEG'}, {name:'tit'}],
    }
};

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                login: resolve(__dirname, 'src/pages/login/login.html'),
                404: resolve(__dirname, 'src/pages/404/404.html'),
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