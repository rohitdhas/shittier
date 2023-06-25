// TODO: Create insertRandomCommentsRecursive
function insertRandomCommentsRecursive(_node: any) {}

function getRandomComment() {
  // TODO: add sarcastic comments
  const comments: string[] = [];

  const randomIndex = Math.floor(Math.random() * comments.length);
  return comments[randomIndex];
}
