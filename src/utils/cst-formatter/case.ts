interface Imap {
    [key: string]: string; 
}

const requiredTokenTypes = ["VariableDeclarator", "FunctionDeclaration", "ClassDeclaration"];
const map: Imap = {};

function randomizeCase(ast: any) {
  ast.selectTokensByType('Identifier').forEach((token: any) => {
    try {
      if (requiredTokenTypes.includes(token.parentElement.parentElement.type)) {
        if (!map[token.value]) {
          const update = changeCaseRandomly(token.value);
          map[token.value] = update;
        }
        const val = map[token.value];
        token.value = val;
        token._sourceCode = val;
        token._sourceCodeLines = [val];
      } else {
        const val = map[token.value] || token.value;
        token.value = val;
        token._sourceCode = val;
        token._sourceCodeLines = [val];
      }
    } catch(err) {
      // handle token errors
      // console.log(err);
    }
  });
}

function changeCaseRandomly(str: string) {
  let modifiedStr = '';
  for (let i = 0; i < str.length; i++) {
    const randomCase = Math.random() < 0.5 ? 'toUpperCase' : 'toLowerCase';
    modifiedStr += str[i][randomCase]();
  }
  return modifiedStr;
}

export { randomizeCase };