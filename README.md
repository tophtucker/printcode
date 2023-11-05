To run: `node dirToPandoc.js`

Or try:

node dirToPandoc.js | pandoc -s -o test.html
node dirToPandoc.js | pandoc -s -o test.pdf --pdf-engine=/Library/TeX/texbin/pdflatex -f markdown-raw_tex
node dirToPandoc.js ../cli/src/

Links along the way:

- `git ls-files | grep '\.js' | xargs wc -l` https://stackoverflow.com/questions/26881441/can-you-get-the-number-of-lines-of-code-from-a-github-repository
- https://pandoc.org/MANUAL.html#pandocs-markdown
- \newpage https://stackoverflow.com/questions/16965490/pandoc-markdown-page-break
- "You need to wrap your head around the idea that Git stores at least three, and sometimes up to five active copies of each file" https://stackoverflow.com/questions/56235287/what-does-git-ls-files-do-exactly-and-how-do-we-remove-a-file-from-it
- https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
- https://gist.github.com/lovasoa/8691344
