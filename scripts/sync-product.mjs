import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { URL } from "node:url";
const source = new URL("../../papergraph/package.json", import.meta.url);
// Committed metadata keeps standalone website checkouts buildable.
if (existsSync(source)) {
  const { version, build } = JSON.parse(readFileSync(source, "utf8"));
  const { owner, repo } = build.publish.find(entry => entry.provider === "github");
  writeFileSync(new URL("../src/product.json", import.meta.url), JSON.stringify({ version, repository: `https://github.com/${owner}/${repo}` }, null, 2) + "\n");
}
