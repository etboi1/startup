# GitHub

## How to Commit Changes:
1. Make the change
2. Type the command "git add ." in the git bash terminal
3. Type the command "git commit" in the terminal
4. Type the command "git push" in the terminal
5. To pull changes down from github, type "git pull"
6. Use "git status" to see how the local cloned repository compares to the github repository

# Markdown Syntax

## Styling text:
- wrap w/ "**" = bold
- wrap w/ "* *" = italic
- wrap w/ "~~" = strikethrough
- wrap w/ "***" = all bold italic
- precede quoted text with ">"

# Amazon Web Services - EC2

## Things to Remember:
- command to remote shell into the server = "ssh -i documents/cs260/my_first_key_pair.pem ubuntu@3.86.141.52"
- server elastic IP address = 3.86.141.52

# Caddy, HTTPS, TLS, certs

## General Notes:
- DNS = routes a request to the server (which has caddy in it)
- Caddy = routes the request internally within the computer (server machine) after the DNS has routed it
    - it will map the request to static files or servers running simon/startup for our purposes
- Web Certificates = sends a nonce to the person owning the web certificate when a request is made. Nonce must be sent back to authenticate