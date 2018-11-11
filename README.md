# Snail Team 6 Project

10/23/2018 Edit By Zach Lovvorn
Clone'd repo in Vidual studio code instructions
Hit F1, type "Git: Clone"
hit Enter and then type https://github.com/aphuangumass/F18CS320-Team4.git" and hit Enter again.
it will prompt you to login to Github and choose a destination folder, the default is fine. After that you will be prompted to open up the source from source control.

install Node.js version 8.12.0 from the web

install npm....

10/23/2018 Edit by Eric Hsu
Testing 


#Comments for getting Repo on Local Machine:
Make sure to have Git installed on your local machine

1. Navigate to the folder where you want to keep the project files, this can be in Virtual Studio Code(VSC) or your local machine's terminal.
2. Go to github, when seeing the project, near the top right of the page, there should be a green button called "Clone or Download". 
3. Copy the link after clicking that button.
4. Go back to VSC or terminal, and type "git clone" followed by a space and the copy your link. 
5. Now you have you repository on your local machine!

Step to make sure you are not screwing up the repo:

Once you are in the correct folder where the repository is located, you can run git commands, in the syntax "git + whatever command there is". Each command listed below include examples of what to type for each command. Common commands include:

  1. status: Gives you a description of the "status" of your local machine is. Is useful to see which branch you are in and          what files have been changed. "git status"
  2. branch: Used to create a new branch or switch to the branch if one of the same name already exists. Should include the name of the branch after typing out the command. "git branch AricBranch2"
  3. pull: Used to update local machine's repository to have up to date files that are currently on GitHub. "git pull"
  4. checkout: Used to navigate between branches. Will switch to branch referenced after command is typed. "git checkout AricBranch".
  5. commit: Used to tell your local repository that you have made changes to files within the repository. "git commit -m "message for          updates"
  6. push: Command to formally update the online GitHub so other people can access your changes to files. commit before pushing! "git          push"
  7. merge: This will allow for cross branch updates. merges files from another branch into current branch. IE merge AricBranch into          master so master can be updated to have what AricBranch has. Similar to git pull but from another branch. "git merge master"
  8. fetch: Looks into what the status of the GitHub repository is like, if 2 people are working on same branch, you can do "git fetch"       to see what updates are made that you, on your local machine, don't have.
  9. add/rm: Adds and removes files from your local repository. "git add/rm filename"

Things to note when programming in a team:
- make sure to work on your own branch(git checkout yourbranchname) to not break master.
- git status often
- if you mess up, don't freak out, we as a team will fix it.
- commit often to make sure things still work locally.
- Make pull requests on GitHub website to let others review your code.
