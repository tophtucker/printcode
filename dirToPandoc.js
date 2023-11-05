// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
import path from "path";
import {readdir, readFile} from "fs/promises";

const allowedExtensions = ["js", "ts", "mjs", "json", "txt", "md"];

const root = process.argv[2] || ".";
const title = process.argv[3] || root.split("/").filter(d => d.length).at(-1);
let doc = `<html><title>${title}</title><body>

<h1>${title}</h1>`;

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
  const dirents = await readdir(dir, {withFileTypes: true});
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      doc += `<h${level} style="page-break-before:always;">${res}</h${level}>${getFiles(res, level + 1)}`
    } else if (allowedExtensions.includes(res.split(".").at(-1))) {
      doc += `<h${level + 1}>${res}</h${level + 1}><pre>${escape(await readFile(res, "utf8"))}</pre>`;
    }
  }
}

await getFiles(root);

doc += "</body></html>";
process.stdout.write(doc);