module.exports = {
  verbose: false,
  ignoreFiles: [
    'icons/icon-off.png',
    'icons/icon.svg',
    'icons/icon-run.svg',
    'jsconfig.json',
    '*/js2flowchart/',
    '*/*.js.svg',
    '*.log',
    'note/',
    'package.json',
    'resource/',
    'test/',
    '.tern-project',
    'tsconfig.json',
    'web-ext-config.js',
    'web-ext-artifacts/',
    'yarn.lock',
  ],
  build: {
    overwriteDest: true,
  },
};
