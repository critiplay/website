import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        compression({
            verbose: true,
            disable: false,
            threshold: 0,
            algorithm: 'brotli',
            ext: '.br',
            deleteOriginFile: false,
            filter: (file) => !file.endsWith('.map'),
            compressionOptions: {
                level: 11,
            },
        }),
    ],
})
