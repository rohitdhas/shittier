import { Parser } from 'cst';
import { readFileSync, writeFileSync } from 'fs';
import { extname } from 'path';
import yargs from 'yargs';
import { randomizeCase } from './utils/cst-formatter/case';
import {
  addInconsistentIndentation,
  addRandomWhiteSpace,
} from './utils/cst-formatter/white-space';

function shittify(code: string) {
  const modifiedCode = addInconsistentIndentation(code);
  const cst = new Parser().parse(modifiedCode);
  randomizeCase(cst);
  addRandomWhiteSpace(cst);

  return cst.getSourceCode();
}

const argv = yargs
  .usage('Usage: shittier [options] <input> <output>')
  .option('h', {
    alias: 'help',
    describe: 'Show help',
    type: 'boolean',
  })
  .option('f', {
    alias: 'force',
    describe: 'Overwrite the output file if it already exists',
    type: 'boolean',
  })
  .help('h').argv;
if (argv.help) {
  yargs.showHelp();
  process.exit(0);
}

const inputFilePath = argv._[0];
const outputFilePath = argv._[1] || inputFilePath;

// Validate file extension
const supportedExtensions = ['.js'];
const inputFileExtension = extname(inputFilePath.toString()).toLowerCase();

if (!supportedExtensions.includes(inputFileExtension)) {
  console.error(
    `❌ ERROR: Unsupported file type. Only JavaScript files are supported currently.`
  );
  process.exit(1);
}

try {
  const code = readFileSync(inputFilePath, 'utf-8');
  const shittifiedCode = shittify(code);
  writeFileSync(outputFilePath, shittifiedCode, {
    encoding: 'utf-8',
    flag: argv.force || inputFilePath === outputFilePath ? 'w' : 'wx',
  });

  console.log('Your code has been successfully shittified. 🎉');
} catch (err) {
  if (err instanceof Error) {
    if (err.message.includes('EEXIST')) {
      console.log(
        `❌ ERROR: ${outputFilePath} already exists. Use --force to override`
      );
    } else if (err.message.includes('ENOENT')) {
      console.error('❌ ERROR: Invalid file path!');
    } else if (err.name === 'SyntaxError') {
      console.log(
        `❌ ERROR: Can't parse file. Looks like ${inputFilePath} has syntax errors!`
      );
    }
  }
}
