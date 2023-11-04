// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
import path from "path";
import {readdir} from "fs/promises";

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
  for await (const f of getFiles(".")) {
    console.log(f);
  }
})();
