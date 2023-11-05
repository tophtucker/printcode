// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
import path from "path";
import {readFile} from "fs/promises";
import {glob} from "glob";

// const allowedExtensions = ["js", "ts", "mjs", "json", "txt", "md"];

const root = process.argv[2] || ".";
const absoluteRoot = path.resolve(root);
const title = absoluteRoot.split("/").filter(d => d.length).at(-1);

let doc = `<html>
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

<h1>${title}</h1>`;

// arbitrary initial ignore stuff, works for me, idk, i should let ppl pass this in
let ignore = ["*.pdf", "package-lock.json", "yarn.lock", "*.png", "*.svg", "*.jpg"];
try {
  ignore.push(...(await readFile(path.resolve(root, ".gitignore"), "utf8")).split("\n").filter(d => d));
} catch (e) {
  // ignore
}

// https://stackoverflow.com/a/30970751/120290
function escape(s) {
  let lookup = {
      '&': "&amp;",
      '"': "&quot;",
      '\'': "&apos;",
      '<': "&lt;",
      '>': "&gt;"
  };
  return s.replace( /[&"'<>]/g, c => lookup[c] );
}

async function getFiles(dir, level = 2) {
  const dirents = (await glob(dir + "/*", {cwd: absoluteRoot, ignore, withFileTypes: true}))
    .sort((a, b) => a.name.localeCompare(b.name));
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      doc += `<h${level}>${dirent.name}</h${level}>`;
      await getFiles(res, level + 1);
    } else {
      doc += `<h${level + 1}>${dirent.name}</h${level + 1}>
        <pre>${escape(await readFile(res, "utf8"))}</pre>`;
    }
  }
}

await getFiles(root);

doc += "</body></html>";
process.stdout.write(doc);