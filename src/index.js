const { question } = require('readline-sync');
const initCLI = require('./cli.js');

async function run() {
  const cli = initCLI();
  console.log(
    `Available commands: ADD, REMOVE, KEYS, MEMBERS, REMOVEALL, CLEAR, KEYEXISTS, MEMBEREXISTS, ALLMEMBERS, ITEMS`
  );

  while (true) {
    const input = question('>');
    if ([':q', ':Q'].includes(input)) break;
    cli(input);
    console.log('\n');
  }
}

run().then();
