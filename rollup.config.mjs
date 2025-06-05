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
  {
    input: 'amd/src/configuration.js',
    output: {
      file: 'amd/build/configuration.min.js',
      format: 'amd',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), terser()],
  },
  {
    input: 'amd/src/dialogue.js',
    output: {
      file: 'amd/build/dialogue.min.js',
      format: 'amd',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), terser()],
  },
  {
    input: 'amd/src/options.js',
    output: {
      file: 'amd/build/options.min.js',
      format: 'amd',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), terser()],
  },
  {
    input: 'amd/src/common.js',
    output: {
      file: 'amd/build/common.min.js',
      format: 'amd',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), terser()],
  }
];
