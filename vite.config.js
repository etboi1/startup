import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        notify: {
            '/api': 'http//localhost:3000',
            '/ws': {
                target: 'ws://localhost:3000',
                ws:true,
            },
        },
    },
});