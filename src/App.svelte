<script lang="ts">
  let output = "";
  let outputEl;
  let showClipboardStatus = false;

  function handleTranslateContent(event) {
    const codeElements = event.target.querySelectorAll(
      "span:not(.chordsOnly) > span > code"
    );
    codeElements.forEach((code) => {
      code.textContent = "[" + code.textContent + "]";
    });
    const content = event.target.innerText;
    output = content;
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

<main class="p-10 h-screen">
  <div class="grid grid-cols-2 gap-10 h-full">
    <p class="font-bold">Paste your song from Song Select:</p>
    <p class="font-bold">
      Corrected output for Planning Center:
      <span class:hidden={!showClipboardStatus} class="text-green-600"
        >Copied to clipboard!</span
      >
    </p>
    <div
      on:keyup={handleTranslateContent}
      contenteditable="true"
      class="border-2 rounded-lg text-2xl font-bold overflow-hidden outline-none"
    />
    <textarea
      bind:this={outputEl}
      bind:value={output}
      on:click={copyToClipboard}
      class="border-2 border-gray-500 rounded-lg outline-none"
      class:border-green-500={showClipboardStatus}
    />
  </div>
</main>

<style>
  .grid {
    grid-template-rows: 0.5rem 1fr;
  }
</style>
