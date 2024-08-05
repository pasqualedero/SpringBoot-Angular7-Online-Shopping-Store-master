**BACKEND**

You ought to simply run the code in IntelliJ


**FRONTEND**

You may need the following commands to be prompted prior to the execution on default port 4200:

1) *curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash*

2) *export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm*

3) *nvm install 18.13.0*

4) *nvm alias default 18.13.0*

5) *export NODE_OPTIONS=--openssl-legacy-provider
   ng serve*


