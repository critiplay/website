import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: 'docs',
        assetsInlineLimit: 100000000,
        cssCodeSplit: false,
    },
    plugins: [
        react(),
        viteSingleFile(),
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
