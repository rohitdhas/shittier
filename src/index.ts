import { addRandomWhiteSpace, addInconsistentIndentation } from './utils/cst-formatter/white-space';
import { randomizeCase } from './utils/cst-formatter/case';
import { readFileSync, writeFileSync } from 'fs';
import { extname } from 'path';
import { Parser } from 'cst';
import yargs from 'yargs';

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
const supportedExtensions = ['.js', '.ts'];
const inputFileExtension = extname(inputFilePath.toString()).toLowerCase();

if (!supportedExtensions.includes(inputFileExtension)) {
  console.error(`❌ Unsupported file type. Only JavaScript and TypeScript files are supported currently.`);
  process.exit(1);
}

try {
  const code = readFileSync(inputFilePath, 'utf-8');
  const shittifiedCode = shittify(code);

  writeFileSync(outputFilePath, shittifiedCode, {
    encoding: 'utf-8',
    flag: argv.force ? 'w' : 'wx',
  });
} catch(err: any) {
  if (err.code === 'ENOENT') {
    console.error("❌ Invalid file path!");
  }
}