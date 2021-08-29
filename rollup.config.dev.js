import config from "./rollup.config";
import serve from "rollup-plugin-serve";

config.plugins.push(
  serve({
    open: true,
    contentBase: "dist",
    host: "localhost",
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
);

export default config;
