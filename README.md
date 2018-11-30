# Snail Team 6 Project

11/29/2018 Edit by Steven Tran
## Functionality for a client webpage to pull data from a MongoDB database hosted on AWS (Steven Tran)
 1. Created the API to GET and POST data to the database stored in "/Backend/routes/api/"
   - Schema for the data is stored in "/Backend/models/Items.js"
 2. Created "server.js" to handle GETting and and sending data from the database
   - The server runs with the command "npm run server" and is hosted on Localhost:5000, connected to the AWS server hosted on 54.211.35.130 with the use of "/config/keys.js"
 3. Created the table in the "table.js" file within the client folders to show data from the mongodb server on a simple react table

## Login Page (Ben Ullman)
 1. Created a simple login webpage where upon entering u: admin@umass.edu and p: password, renders the table component where the data is stored
 2. log out functions that renders the login page again

## Download Feature on the table (Zach Lovvorn)
 1. Created a button on the table, where when clicked, downloads the content of the data with the name "filename.json"

10/23/2018 Edit By Zach Lovvorn
Clone'd repo in Vidual studio code instructions
Hit F1, type "Git: Clone"
hit Enter and then type https://github.com/aphuangumass/F18CS320-Team4.git" and hit Enter again.
it will prompt you to login to Github and choose a destination folder, the default is fine. After that you will be prompted to open up the source from source control.

install Node.js version 8.12.0 from the web

install npm....

10/23/2018 Edit by Eric Hsu
Testing 

#Comments on the structure of the project
We are currently using two ports on localhost to host a client server and a server that communicates with each other to pull data from each other.
The commands for either the client or server that can be run are found in package.json

/Backend
  /models/Items.js
   - holds the schema for the data being entered so mongo and easily pull and query data from items in the db
  /routes/api/items.js
   - holds the functions that the server uses to directly alter content on the db
/config/keys.js
  - holds the connection variable to the AWS ec2 instance that is hosting the mongodb database (currently 54.211.35.130 on db /items)
/teamfour/ 
  - the current client that is shown to the user
  /public/
    - the html docs that are shown to the user on localhost:3000
  /src/
    - the react components and css that the project is using
    /components/
      - holds both webpages that show the login page and table 
server.js
  - The file that simply sets up the server on localhost:5000

#Comments for getting the (in-progress) project running
Make sure Node.js is installed on your local machine

1. Check to see if node dependencies are installed by running "npm install" and "npm run client-install"
  - Common errors are with concurrently and nodemon not being installed with the "npm install" command, so install those seperately if issues arises
2. Start both the server and the client with the command "npm run dev"
3. The client is running on Localhost:3000, but should be ran with a browser with website security disabled so that the two servers hosted on localhost can communicate
  - On Mac OS, the command to open chrome without website security is "open -a Google\ Chrome --args --disable-web-security --user-data-dir="
  - On Windows, the command to open chrome without website security is ""C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="c:/chromedev""
4. Rejoice in having a working project

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
  5. commit: Used to tell your local repository that you have made changes to files within the repository. "git commit -m "message for updates"
  6. push: Command to formally update the online GitHub so other people can access your changes to files. commit before pushing! "git push"
  7. merge: This will allow for cross branch updates. merges files from another branch into current branch. IE merge AricBranch into master so master can be updated to have what AricBranch has. Similar to git pull but from another branch. "git merge master"
  8. fetch: Looks into what the status of the GitHub repository is like, if 2 people are working on same branch, you can do "git fetch" to see what updates are made that you, on your local machine, don't have.
  9. add/rm: Adds and removes files from your local repository. "git add/rm filename"

Things to note when programming in a team:
- make sure to work on your own branch(git checkout yourbranchname) to not break master.
- git status often
- if you mess up, don't freak out, we as a team will fix it.
- commit often to make sure things still work locally.
- Make pull requests on GitHub website to let others review your code.
