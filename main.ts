// One Line, One Chill — a single sentence of horror, written to /output/entry.txt.
//
// The line is a constant: no randomness, no network, no input of any kind.
// Every run writes byte-identical output — the same 161 characters, no
// trailing newline, so the file is exactly the line and nothing else.
//
// The line: a dead grandmother's handwriting turns up on the grocery list,
// in fresh ink, and the last item on it is the narrator's own name.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I found my dead grandmother's handwriting on the grocery list on the fridge this morning, in fresh blue ink, adding eggs, milk, and, at the very bottom, my name.";

// The gate refuses anything outside 1–200 characters, whitespace-only, or
// more than one sentence, so fail loudly instead of shipping a bad file.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || (LINE.match(/\./g) ?? []).length !== 1) {
  throw new Error("entry line must be a single non-blank sentence");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
