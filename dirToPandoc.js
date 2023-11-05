// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
import path from "path";
import {readdir, readFile} from "fs/promises";

const allowedExtensions = ["js", "ts", "mjs", "json", "txt", "md"];

const root = process.argv[2] || ".";

async function* getFiles(dir) {
  const dirents = await readdir(dir, {withFileTypes: true});
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

(async () => {
  let md = "# Title"
  for await (const f of getFiles(root)) {
    if (allowedExtensions.includes(f.split(".").at(-1))) {
      md += ` \n\n## ${f}\n\n\`\`\``
      md += (await readFile(f, "utf8"));
      md += "\`\`\`"
    }
  }
  md += "\n "
  process.stdout.write(md);
})();
