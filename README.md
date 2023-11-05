I wanted to print out a repository of about ~2,000 lines of code with every line legible but also some sense of hierarchy.

<img src="demo.png">

There’s one external dependency, on [glob](https://www.npmjs.com/package/glob). To install:

`npm i`

To run:

`node index.js`

It defaults to the current directory, or you can give it a path (and send it to a new file): 

`node index.js ../path/to/dir > test.html`

To ignore some random default stuff I wanted to ignore:

`node index.js ../path/to/dir -i > test.html`

There’s gotta be a better way to do that…

In making this it was helpful to count the lines in a repo with variants on `git ls-files | grep '\.js' | xargs wc -l` ([via](https://stackoverflow.com/questions/26881441/can-you-get-the-number-of-lines-of-code-from-a-github-repository)). Also, shoutout to [Neary’s one-liner](https://twitter.com/_mattneary/status/1720988530464395331), `tail -n +1 **/*.ts | sed 's/    /•/g'`.
