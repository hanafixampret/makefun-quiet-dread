import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "LGTM. The code works, the docs are honest, and I have made my peace with the parts I did not read.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== ENTRY) throw new Error("round-trip mismatch");
if (ENTRY.length < 1 || ENTRY.length > 140)
  throw new Error(`entry length ${ENTRY.length} outside 1-140`);
if (ENTRY.trim().length === 0) throw new Error("entry is whitespace only");
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");
if (ENTRY !== ENTRY.trim())
  throw new Error("entry must not start or end with whitespace");
console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
