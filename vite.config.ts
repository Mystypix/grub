import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import dotenv from "dotenv-vault-core";
import path from "path";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgSpritePlugin({
      symbolId: "icon-[name]-[hash]",
      svgo: false,
    }),
  ],
  css: {
    modules: {
      generateScopedName: "[name]_[local]_[hash:base64:5]",
      localsConvention: "camelCase",
    },
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "./src/assets"),
      common: path.resolve(__dirname, "./common"),
      components: path.resolve(__dirname, "./src/components"),
      src: path.resolve(__dirname, "./src"),
    },
  },
});
