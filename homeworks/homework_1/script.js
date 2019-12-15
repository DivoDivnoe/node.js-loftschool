'use strict';

const yargs = require('yargs');
const { createFolder, sort } = require('./sort');
const removeDir = require('./remove');

const argv = yargs
  .usage('Usage: $0 [option]')
  .help('help')
  .alias('help', 'h')
  .version('1.0.0')
  .alias('version', 'v')
  .example('$0 --entry ./entry_folder --dest ./destination_folder --remove true')
  .option('entry', {
    alias: 'e',
    describe: 'entry folder',
    demandOption: true
  })
  .option('dest', {
    alias: 'd',
    describe: 'destination folder',
    demandOption: true
  })
  .option('remove', {
    alias: 'r',
    describe: 'remove entry folder or not',
    default: false
  })
  .epilog('files sorting console application').argv;

const { entry, dest, remove } = argv;

createFolder(dest, () => {
  sort(entry, dest, () => {
    if (!remove) return console.log('done');

    removeDir(entry, () => {
      console.log('done');
    });
  });
});
