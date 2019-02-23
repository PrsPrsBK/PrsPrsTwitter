module.exports = {
  verbose: false,
  ignoreFiles: [
    'chrome/',
    'jsconfig.json',
    '*/js2flowchart/',
    '*/*.js.svg',
    '*.log',
    'note/',
    'package.json',
    '*.ps1',
    'resources/',
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
