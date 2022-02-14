import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "rollup-plugin-json";
import { readFileSync, writeFileSync, copyFileSync } from "fs";
import nodePolyfills from "rollup-plugin-node-polyfills";
import pkg from "./package.json";

let numberOfBundlesBuilt = 0;
let outputBundles = [
  {
    file: "./dist/dist/twelvedata.js",
    format: "umd",
    name: pkg.name,
  },
  {
    file: "./dist/dist-esm/twelvedata.js",
    format: "es",
  },
];

export function initRollupPostScript() {
  try {
    // Read internal packagejson and create public package json
    const internalPackageJson = JSON.parse(readFileSync(`./package.json`));

    delete internalPackageJson.scripts;
    delete internalPackageJson.devDependencies;
    delete internalPackageJson.jest;
    delete internalPackageJson.files;
    delete internalPackageJson.source;

    writeFileSync(
      `./dist/package.json`,
      JSON.stringify(internalPackageJson, null, 2)
    );

    copyFileSync("README.md", "dist/README.md");
    copyFileSync("LICENSE.txt", "dist/LICENSE.txt");
  } catch (Error) {
    console.error("Post script failed", Error);
  }
}
export default {
  input: "index.js",
  output: outputBundles,
  external: ["cross-fetch", "cross-fetch/polyfill"],
  plugins: [
    sourceMaps(),
    nodePolyfills(),
    nodeResolve({
      mainFields: ["jsnext", "main"],
      preferBuiltins: true,
      browser: true,
    }),
    commonjs({
      include: "node_modules/**",
    }),
    json({
      compact: true,
    }),
    {
      name: "buildHooks",
      writeBundle() {
        numberOfBundlesBuilt++;
        if (numberOfBundlesBuilt === outputBundles.length) {
          console.log("Done with Bundles. Running post script");
          initRollupPostScript();
          numberOfBundlesBuilt = 0;
        }
      },
    },
  ],
};
