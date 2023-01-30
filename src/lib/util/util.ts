export function getTranslatedContent(node) {
  const clonedNode = node.cloneNode(true);
  const codeElements = clonedNode.querySelectorAll(
    "span:not(.chordsOnly) > span > code"
  );
  codeElements.forEach((code) => {
    code.textContent = "[" + code.textContent + "]";
  });
  const content = clonedNode.textContent;
  return content;
}
