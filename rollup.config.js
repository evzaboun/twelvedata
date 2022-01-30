import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import { readFileSync, writeFileSync } from "fs";
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
const externalDependencies = ["axios"];

export function initRollupPostScript() {
  try {
    // Read internal packagejson and create public package json
    const internalPackageJson = JSON.parse(readFileSync(`./package.json`));

    delete internalPackageJson.scripts;
    delete internalPackageJson.devDependencies;
    delete internalPackageJson.jest;
    delete internalPackageJson.files;
    delete internalPackageJson.source;

    Object.keys(internalPackageJson.dependencies).forEach((dep) => {
      if (externalDependencies.indexOf(dep) < 0) {
        delete internalPackageJson.dependencies[dep];
      }
    });
    writeFileSync(
      `./dist/package.json`,
      JSON.stringify(internalPackageJson, null, 2)
    );
  } catch (Error) {
    console.error("Post script failed", Error);
  }
}
export default {
  input: pkg.source,
  output: outputBundles,
  external: [...Object.keys(pkg.dependencies || {})],

  plugins: [
    json(),
    nodeResolve({
      mainFields: ["module", "browser"],
      preferBuiltins: false,
    }),
    commonjs(),
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
