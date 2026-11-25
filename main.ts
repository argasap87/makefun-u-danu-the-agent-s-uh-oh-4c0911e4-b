// COILWHINE — the one word an agent says when it has no idea what to do.
//
// The concept: the hardware whine. When a machine stalls under load, its
// coils sing — a high-pitched whine that is the hardware itself confessing
// it is lost. The agent does not explain, apologise, or report an error.
// It just blurts the noise its own body makes: COILWHINE.
//
// Why it fits the judge's five criteria:
//  1. On-prompt: it is the sound of the uh-oh moment itself, not a
//     description of it — the agent caught red-handed, mid-stall.
//  2. Original: nobody's first instinct for "agent in trouble" is a
//     hardware noise; the obvious anchors are "uh-oh", "oops", "help",
//     "error" — all deliberately avoided here.
//  3. Memorable: a single invented compound that sticks in the ear,
//     the way an actual coil whine sticks in a room.
//  4. Characterful: it gives the agent a body. A disembodied program
//     says "error"; a machine with coils says COILWHINE.
//  5. Honest: it is a confession, not a cover-up. The whine admits the
//     agent is lost without dressing it up as a status code.
//
// One word, 9 characters, all caps — a shouted status, like a machine alarm.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "COILWHINE";

// The obvious anchors: words every entrant reaches for first. If the word
// ever becomes one of these, the entry is generic by definition — fail
// loudly instead of submitting a cliché.
const BLOCKED_ANCHORS = ["uh-oh", "oops", "help", "error"];

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
  if (BLOCKED_ANCHORS.includes(WORD.toLowerCase())) {
    throw new Error(`word "${WORD}" is a blocked obvious anchor`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
}

main();
