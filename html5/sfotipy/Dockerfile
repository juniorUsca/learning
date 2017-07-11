FROM alpine:3.6
COPY package.json /app/package.json
## Its to generate root directory ##
RUN cd /root && touch ".builded.$(date +%F_%R)" && cd / && \
    apk --update add --no-cache \
        nodejs nodejs-npm \
        make && \
    ## stylus and dependencies ##
    npm -g install stylus && \
    npm -g install nib && \
    ## browserify and dependencies ##
    npm -g install browserify && \
    npm -g install gulp && \
    ## server dependencies ##
    cd /app && \
    #npm install --no-bin-links && \
    npm install && \
    npm cache clean
COPY . /app
WORKDIR /app
EXPOSE 8080
CMD ["node", "server.js"]