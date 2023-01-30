import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/svelte";
import App from "./App.svelte";

describe("App", () => {
  it("should render", () => {
    render(App);
    expect(screen.getByText("Paste your song from SongSelect:")).to.be.ok;
  });
});
