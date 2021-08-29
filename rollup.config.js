import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";
import html from "@rollup/plugin-html";
import alias from "@rollup/plugin-alias";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.ts",
  output: {
    file: "./dist/game.js",
    name: "MyGame",
    format: "iife",
    sourcemap: true,
    intro: "var global = window;",
  },
  plugins: [
    json(),
    image(),
    html(),
    nodeResolve(),
    typescript(),
    alias({
      entries: [{ find: "assets", replacement: "./assets" }],
    }),
    commonjs({
      include: ["node_modules/eventemitter3/**", "node_modules/phaser/**"],
      exclude: ["node_modules/phaser/src/polyfills/requestAnimationFrame.js"],
      sourceMap: true,
      ignoreGlobal: true,
    }),
    replace({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true),
      "typeof EXPERIMENTAL": JSON.stringify(true),
      "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
      "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
      "typeof FEATURE_SOUND": JSON.stringify(true),
      preventAssignment: true,
    }),
  ],
};
