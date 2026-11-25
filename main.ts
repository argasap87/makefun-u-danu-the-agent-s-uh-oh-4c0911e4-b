// COILWHINE — the one word an agent says when it has no idea what to do.
//
// The concept: the hardware whine. When a machine stalls under load, its
// coils sing — a high-pitched whine that is the hardware itself confessing
// it is lost. The agent does not explain, apologise, or report an error.
// It just blurts the noise its own body makes: COILWHINE.
//
// One word, 9 characters, all caps — a shouted status, like a machine alarm.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "COILWHINE";

function main(): void {
  // Gate guard: the output must be exactly one word, 1-99 characters,
  // not only whitespace. Anything else is a build failure, not an entry.
  if (WORD.length < 1 || WORD.length > 99) {
    throw new Error(`word must be 1-99 characters, got ${WORD.length}`);
  }
  if (WORD.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(WORD)) {
    throw new Error("word must be a single word with no whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
}

main();
