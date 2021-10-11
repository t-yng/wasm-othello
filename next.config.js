module.exports = {
  webpack(config, { isServer }) {
    // prettier-ignore
    config.output.webassemblyModuleFilename = `${isServer ? "../" : ""}static/wasm/web-assembly.wasm`;
    config.experiments = { asyncWebAssembly: true };
    return config;
  },
};
