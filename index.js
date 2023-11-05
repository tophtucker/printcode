import path from "path";
import {readFile} from "fs/promises";
import {glob} from "glob";

const root = process.argv[2] || ".";
const absoluteRoot = path.resolve(root);
const title = absoluteRoot.split("/").filter(d => d.length).at(-1);

// arbitrary initial ignore stuff, works for me, idk, i should let ppl pass this in
let ignore = ["*.pdf", "package-lock.json", "yarn.lock", "*.png", "*.svg", "*.jpg"];
try {
  // respect .gitignore
  ignore.push(...(await readFile(path.resolve(root, ".gitignore"), "utf8")).split("\n").filter(d => d));
} catch (e) {
  // there's no .gitignore, that's ok
}

// https://stackoverflow.com/a/30970751/120290
function escape(s) {
  let lookup = {'&': "&amp;", '"': "&quot;", '\'': "&apos;", '<': "&lt;", '>': "&gt;"};
  return s.replace( /[&"'<>]/g, c => lookup[c] );
}

async function getFiles(dir, level = 2) {
  const dirents = (await glob(dir + "/*", {cwd: absoluteRoot, ignore, withFileTypes: true}))
    .sort((a, b) => a.name.localeCompare(b.name));
  return `${await Promise.all(dirents.map(async dirent => {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      return `<h${level}>${dirent.name}</h${level}>
        ${await getFiles(res, level + 1)}`;
    } else {
      return `<h${level + 1}>${dirent.name}</h${level + 1}>
        <pre>${escape(await readFile(res, "utf8"))}</pre>`;
    }
  }))}`
}

process.stdout.write(`<html>
<title>${title}</title>
<style>
h1, h2, h3, h4, h5, h6 { margin-bottom: 1rem; }
h6 { font-size: 1rem; }
h5 { font-size: 2rem; }
h4 { font-size: 4rem; }
h3 { font-size: 8rem; }
h2 { font-size: 16rem; }
h1 { font-size: 32rem; }
</style>
<body>

<h1>${title}</h1>

${await getFiles(root)}

</body>
</html>`);