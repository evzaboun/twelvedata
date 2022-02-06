import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "rollup-plugin-json";
import { readFileSync, writeFileSync, copyFileSync } from "fs";
import pkg from "./package.json";

let numberOfBundlesBuilt = 0;

//const externalDependencies = ["axios"];

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

    Object.keys(internalPackageJson.dependencies).forEach((dep) => {
      if (externalDependencies.indexOf(dep) < 0) {
        delete internalPackageJson.dependencies[dep];
      }
    });
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
  //external: [...Object.keys(pkg.dependencies || {})],

  plugins: [
    sourceMaps(),
    nodeResolve({
      mainFields: ["module", "browser"],
      browser: true,
      preferBuiltins: false,
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
