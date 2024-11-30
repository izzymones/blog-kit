## Running blog locally
You can run your blog locally on your computer.  This runs a webserver that only allows your local machine to see your website.  You can test and debug.  Then when you have everything just the way you want it you can push the changes to your live website.

To run your site locally, got to your blog directory
```
cd git/blog-kit
```
Then run
```
targets/serve.sh cb
```
If you already have a server running it will complain.  I do this all the time and you have to `command C` out of one of them.  

## Saving your changes

##### Seeing current changes
You can see all the changes you've made to your blog by going to the `git/blog-kit` directory and typing
```
git status
```
You'll see two kinds of changes.  In green, files you've changed will be listed as `modified` and in red you'll see `untracked` files. Untracked files are files that you've added to your project by creating and saving the files, but you haven't yet told git to track them.  For example, maybe you made a new page about rockclimbing and saved it in the `_pages` directory. You will also need to `add` them to git to tell git to track them.

##### Adding new files
If you create a whole new file to add to your blog then you'll need to add it to the git repo.  This tells git that you want to track this file and any changes that occur to it.  You can do this with 
```
git add filename
```
Be careful of your file path name here.  For example, if I'm in the `\blog-kit` directory and I want to add a file that's in the `_pages` directory I'll need to type `git add _pages/filename`.  Or I can `cd` into the `_pages` directory and type `git add filename`.  If you mess it all up and add it in the wrong place there is always `git rm` command and the git `git mv` command and many other options to fix it.

When you add a new file that's blog page or post, you need to put a header in it.  I always forget and then I go around in circles for a while trying to figure out why my page doesn't show up.  The header for this page looks like this.  
```
---
title: Development Notes
smartdown: true
description: Everything you need to remember
---
```
##### Saving changes
After you've added new files or edited existing ones you will need to first `commit` your changes and then `push` your changes out to your github repository on the web.  To commit type
`git commit`
You can do this from any directory in `\blog-kit`.  It will prompt you to type in a message about the commit.  Type in a note about what changes you made.  When you realize you've screwed up a ton of stuff and you want to go back to an earlier version of your code, you will use these messages to figure out which commit to go back to.  So it's best not to wait too long between commits.  This makes it easy to go back without losing incremental changes you want to keep.

##### Sending changes back to your repo at github

Type 
`git push`
Currently it makes you enter your github password.  We can fix this so it goes automatically at some point.

## To Access Developer Tools in Chrome

In Chrome Menu go to View -> Developer

There's a bunch of stuff here.  We'll go over all of it.

## Latex
You can use Latex!  To put a formula in text use single `$` signs.  `$\frac{x^2}{\sin(x)}$` is rendered as $\frac{x^2}{\sin(x)}$.  Use double `$$` signs to create a formula on a seperate line.
`$$\lim_{h \to 0} \frac{f(x) - f(x+h)}{h}$$`
becomes
$$\lim_{h \to 0} \frac{f(x) - f(x+h)}{h}$$

## Resources for Formatting
- [MarkDown cheat sheet](https://www.markdownguide.org/cheat-sheet/)
- [smartdown cheat sheet](https://smartdown.site/#gallery/Home.md) You can click on the gray Show Source button up at the top to see the smartdown source for things.
- [git cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf) 


## TO DO for Heidi
- check in code and get site published
- set up ssh key so Izzy doesn't have to keep entering his password
- do some basic formatting changes so it doesn't drive me crazy.  I think I can just copy over my local css
- merge some of the changes to my layout pages so Izzy can easity add header pictures for his pages.
- check out the font errors

## Miscellaneous 

- I set the default version of ruby to 3.1.2 in .zshrc. This shouldn't cause any problems with the system ruby I hope.  We can always take it out of .zshrc if necessary.

