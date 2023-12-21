import { Token } from 'cst';

function addInconsistentIndentation(code: string) {
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const text = lines[i].trim();

    if (text !== '') {
      const indentation = getRandomWhitespace();
      lines[i] = indentation + text;
    }
  }
  return lines.join('\n');
}

function addRandomWhiteSpace(code: any) {
  code.selectTokensByType('Punctuator').forEach((token: any) => {
    try {
      const randomWhitespaceBefore = getRandomWhitespace();

      const prevToken = token.getPreviousToken();
      if (prevToken.isWhitespace) {
        prevToken.value = randomWhitespaceBefore;
        prevToken._sourceCode = randomWhitespaceBefore;
        prevToken._sourceCodeLines = [randomWhitespaceBefore];
      } else {
        const whitespaceBefore = new Token(
          'Whitespace',
          randomWhitespaceBefore
        );
        token.parentElement.insertChildBefore(whitespaceBefore, token);
      }
    } catch (err) {
      // TODO: Handle token errors
      // console.log(err);
    }
  });
}

function getRandomWhitespace() {
  const whitespaceOptions = [' ', '  ', '\t', '\t\t', '\t '];
  const randomIndex = Math.floor(Math.random() * whitespaceOptions.length);
  return whitespaceOptions[randomIndex];
}

export { addInconsistentIndentation, addRandomWhiteSpace };
