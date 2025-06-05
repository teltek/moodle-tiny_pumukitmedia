## MOODLE-TINY_pumukitmedia DEVELOPER GUIDE

How to generate and update the build for Tiny Plugin

#### Step 1: Install dependencies for the work.

```
npm install --save-dev rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs
```

#### Step 2: Create rollup.config.js file

```
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'amd/src/plugin.js',
    output: {
      file: 'amd/build/plugin.min.js',
      format: 'amd',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), terser()],
  },
  ...
  {
    input: 'amd/src/modal.js',
    output: {
      file: 'amd/build/modal.min.js',
      format: 'amd',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), terser()],
  }
];
```

#### Step 3: Add a script to package.json

```
"scripts": {
    "build": "rollup -c"
}
```

#### Step 4: Build to upload code and generate the new version.

```
npm run build
```

#### Step 5: Install the plugin on Moodle

First generates zip of plugin.
```
zip -r moodle-tiny_pumukitmedia.zip moodle-tiny_pumukitmedia/ -x "moodle-tiny_pumukitmedia/.git/*" -x "moodle-tiny_pumukitmedia/.github/*" -x "moodle-tiny_pumukitmedia/.gitignore" -x "moodle-tiny_pumukitmedias/node_modules/*"
```
