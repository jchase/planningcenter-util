import { describe, it, expect } from "vitest";
import * as util from "./util";

describe("util", () => {
  it("should exist", () => {
    expect(util).to.be.ok;
  });
});

describe("sanity check", () => {
  it("should have a unit test that is able to test a div", () => {
    const node = document.createElement("div");
    node.innerHTML = `<span><span><code>test</code></span></span>`;
    expect(node.innerHTML).toBe("<span><span><code>test</code></span></span>");
    expect(node.querySelectorAll("span").length).toBe(2);
    expect(node.querySelectorAll("code").length).toBe(1);
    expect(node.querySelectorAll("div").length).toBe(0);
    expect(node.textContent).toBe("test");
    expect(node.querySelectorAll("span > span > code").length).toBe(1);
    expect(
      node.querySelectorAll("span:not(.chordsOnly) > span > code").length
    ).toBe(1);
    const clonedNode = node.cloneNode(true);
    expect(clonedNode.innerHTML).toBe(
      "<span><span><code>test</code></span></span>"
    );
    expect(clonedNode.querySelectorAll("span").length).toBe(2);
    expect(clonedNode.querySelectorAll("code").length).toBe(1);
    expect(clonedNode.querySelectorAll("div").length).toBe(0);
    expect(clonedNode.textContent).toBe("test");
    expect(clonedNode.querySelectorAll("span > span > code").length).toBe(1);
    expect(
      clonedNode.querySelectorAll("span:not(.chordsOnly) > span > code").length
    ).toBe(1);
  });
});

describe("handleTranslateContent", () => {
  it("should wrap code elements in brackets", () => {
    const node = document.createElement("div");

    node.innerHTML = `<span><span><code>test</code></span></span>`;
    const output = util.getTranslatedContent(node);
    expect(output).toBe("[test]");
  });

  it("should ignore chordsOnly spans", () => {
    const node = document.createElement("div");
    node.innerHTML = `<span class="chordsOnly"><span><code>test</code></span></span>`;

    const output = util.getTranslatedContent(node);

    expect(output).toBe("test");
  });
});
