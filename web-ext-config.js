module.exports = {
  verbose: false,
  ignoreFiles: [
    'jsconfig.json',
    '*/js2flowchart/',
    '*/*.js.svg',
    '*.log',
    'note/',
    'package.json',
    'resource/',
    'test/',
    '.tern-project',
    'web-ext-config.js',
    'web-ext-artifacts/',
  ],
  build: {
    overwriteDest: true,
  },
};
