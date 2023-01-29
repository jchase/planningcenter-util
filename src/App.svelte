<script lang="ts">
  let inputEl;
  let output = "";
  let outputEl;
  let showClipboardStatus = false;

  function handleSelectInitial(event) {
    const range = document.createRange();
    range.selectNodeContents(inputEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function handleTranslateContent(event) {
    const clonedNode = deepCloneNode(event.target);
    const codeElements = clonedNode.querySelectorAll(
      "span:not(.chordsOnly) > span > code"
    );
    codeElements.forEach((code) => {
      code.textContent = "[" + code.textContent + "]";
    });
    const content = clonedNode.innerText;
    output = content;
  }

  function deepCloneNode(node) {
    const clonedNode = node.cloneNode();

    node.childNodes.forEach((childNode) => {
      clonedNode.appendChild(deepCloneNode(childNode));
    });

    return clonedNode;
  }

  function copyToClipboard() {
    var el = document.createElement("textarea");
    el.value = output;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    var selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }

    outputEl.focus();
    outputEl.select();

    showClipboardStatus = true;
    window.setTimeout(function () {
      showClipboardStatus = false;
    }, 2000);
  }
</script>

<main class="p-20 h-screen">
  <div class="grid grid-cols-2 gap-x-20 h-full">
    <p class="font-bold">Paste your song from Song Select:</p>
    <p class="font-bold">
      Corrected output for Planning Center:
      <span class:hidden={!showClipboardStatus} class="text-green-600"
        >Copied to clipboard!</span
      >
    </p>
    <div
      bind:this={inputEl}
      on:keyup={handleTranslateContent}
      on:click={handleSelectInitial}
      contenteditable="true"
      class="border-2 rounded-lg text-2xl font-bold overflow-y-scroll outline-none"
    />
    <textarea
      bind:this={outputEl}
      bind:value={output}
      on:click={copyToClipboard}
      class="border-2 border-gray-500 rounded-lg outline-none font-mono"
      class:border-green-500={showClipboardStatus}
    />
  </div>
</main>

<style>
  .grid {
    grid-template-rows: 2rem 1fr;
  }
</style>
