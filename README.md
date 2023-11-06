I wanted to print out a repository of about ~2,000 lines of code with every line
legible but also some sense of hierarchy. This script takes a directory and
converts it to one long HTML file, with great big visible headers. Top-level
directories within the given root always break onto a new page, so you can lay
them out as separate chunks.

<img src="demo.png">

There’s an ignore.txt in here, which is interpreted like a .gitignore file and
has some random stuff I wanted to ignore in my case; you should edit it for
yours. (I was largely trying to filter out binary files; maybe there’s a better
way to do that.) This script also respects any top-level .gitignore file it
finds in the directory you pass, so you don’t get overwhelmed by node modules
and such lol. (I did consider that it’d be more honest to print all that too,
but… well… in my case I didn’t want it. I just wanted to print the code written
by the people I know and work with.)

There’s one external dependency, on [glob](https://www.npmjs.com/package/glob).
To install:

`npm i`

To run:

`node index.js`

It defaults to printing the current directory, or you can give it a path:

`node index.js ../path/to/dir`

And write it to a file:

`node index.js ../path/to/dir > test.html`

To ignore some random default stuff I wanted to ignore:

`node index.js ../path/to/dir -i > test.html`

There’s gotta be a better way to do that…

In making this it was helpful to count the lines in a repo with variants on `git ls-files | grep '\.js' | xargs wc -l`
([via](https://stackoverflow.com/questions/26881441/can-you-get-the-number-of-lines-of-code-from-a-github-repository)).
Also, shoutout to [Neary](https://twitter.com/_mattneary/status/1720988530464395331)
and [Kevin Lacker](https://twitter.com/lacker/status/1721214938063183885)
for this much simpler solution:

`tail -n +1 **/*.ts | sed 's/    /•/g' | enscript -2rG -M Letter`
