const { Token } = require('cst');

function addInconsistentIndentation(code: string) {
  const lines = code.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== "") {
      const indentation = getRandomWhitespace();
      lines[i] = indentation + lines[i];
    }
  }
  return lines.join("\n");
}

function addRandomWhiteSpace(code: any) {
  code.selectTokensByType("Punctuator").forEach((token: any) => {
    try {
      const randomWhitespaceBefore = getRandomWhitespace();
      const whitespaceBefore = new Token("Whitespace", randomWhitespaceBefore);
      token.parentElement.insertChildBefore(whitespaceBefore, token);
    } catch (err) {
      // TODO: Handle token errors
      // console.log(err);
    }
  });
}

function getRandomWhitespace() {
  const whitespaceOptions = [" ", "  ", "\t", "\t\t", "\t "];
  const randomIndex = Math.floor(Math.random() * whitespaceOptions.length);
  return whitespaceOptions[randomIndex];
}

export { addInconsistentIndentation, addRandomWhiteSpace };
