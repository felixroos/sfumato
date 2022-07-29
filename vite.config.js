// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "sfumato",
      // the proper extensions will be added
      fileName: "sfumato",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["soundfont2"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        /* globals: {
          vue: "Vue",
        }, */
      },
    },
  },
});
