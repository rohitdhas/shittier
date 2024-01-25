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
      const randomCommentBlockBefore = getRandomCommentBlocks();
      const prevToken = token.getPreviousToken();
      if (prevToken.isWhitespace) {
        prevToken.value = randomWhitespaceBefore;
        prevToken._sourceCode = randomWhitespaceBefore;
        prevToken._sourceCodeLines = [randomWhitespaceBefore];
      } else {
        const shouldUseComments = (Math.random() < 0.2);
        let distractionBefore = (shouldUseComments)
          ? new Token(
            'CommentBlock',
            randomCommentBlockBefore
          )
          : new Token(
            'Whitespace',
            randomWhitespaceBefore
          );
        token.parentElement.insertChildBefore(distractionBefore, token);
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

function getRandomCommentBlocks() {
  const commentOptions = [
    ':3', '.-.', 'hello world', 'T__T', 'i love javascript', 'why', ': - )'
  ];
  const randomIndex = Math.floor(Math.random() * commentOptions.length);
  return ' ' + commentOptions[randomIndex] + ' ';
}

export { addInconsistentIndentation, addRandomWhiteSpace };
