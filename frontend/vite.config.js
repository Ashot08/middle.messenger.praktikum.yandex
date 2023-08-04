import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import path, { resolve } from 'path';

const pageData = {
    '/index.html': {
        meta: {
            title: 'Yandex Practicum Project',
            description: 'Yandex Practicum middle frontend developer project by Ashot08',
        },
    },
    '/pages/login/login.html': {
        meta: {
            title: 'Login Page',
            description: 'Login Page - Yandex Practicum middle frontend developer project by Ashot08',
        },
    },
    '/pages/404/404.html': {
        meta: {
            title: '404 - Not Found Page',
            description: '404 Not Found Page - Yandex Practicum middle frontend developer project by Ashot08',
        },
        link: {
            url: '/',
            text: 'Назад к чатам'
        },
        error: {
            code: '404',
            description: 'Не туда попали'
        }
    },
    '/pages/500/500.html': {
        meta: {
            title: '500 - Server Error',
            description: '500 Server Error Page - Yandex Practicum middle frontend developer project by Ashot08',
        },
        link: {
            url: '/',
            text: 'Назад к чатам'
        },
        error: {
            code: '500',
            description: 'Мы уже фиксим'
        }
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