import { defineConfig } from 'vite';
import { vite as vitePackageJson } from './package.json';
import { preact } from '@preact/preset-vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
const { assign } = Object;

const pluginEntrypoints = {
  '@preact/preset-vite': preact(),
  'vite-plugin-minify': ViteMinifyPlugin(),
};

function parseConfig(config) {
  if (config.plugins) {
    config.plugins = config.plugins.map((pkgName) => pluginEntrypoints[pkgName]);
  }

  return config;
}

export default defineConfig(({ mode }) => {
  const config = parseConfig(vitePackageJson.default);
  if (mode && vitePackageJson[mode]) {
    const specific = parseConfig(vitePackageJson[mode]);
    const mergedPlugins = { plugins: config.plugins.concat(specific.plugins) };
    return assign(config, specific, mergedPlugins);
  }
  return config;
});
