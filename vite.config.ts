/// <reference types="vitest" />
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx"
import { presetUno, presetAttributify, presetIcons } from "unocss";
import Unocss from "./config/unocss";

// https://vitejs.dev/config/
const rollupOptions = {
    external: ["vue", "vue-router"],
    output: {
        globals: {
            vue: "Vue",
        },
    },
};

export default defineConfig({

    plugins: [vue(), vueJsx({}), // 添加UnoCSS插件
        Unocss()],
    // 添加库模式配置

    build: {
        rollupOptions,
        minify:false,
        lib: {
            entry: "./src/entry.ts",
            name: "BasicUI",
            fileName: "basic-ui",
            // 导出模块格式
            formats: ['es', "umd","iife"],
        },
        cssCodeSplit: true,   // cssCodeSplit 这个选项是为了决定在编译的时候是否要独立输出 css
    },

    test: {
        // enable jest-like global test APIs
        globals: true,
        // simulate DOM with happy-dom
        // (requires installing happy-dom as a peer dependency)
        environment: 'happy-dom',
        // 支持tsx组件，很关键
        transformMode: {
            web: [/.[tj]sx$/]
        }
    }
});