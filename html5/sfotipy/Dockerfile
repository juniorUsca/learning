FROM alpine:3.6
COPY . /app
## Its to generate root directory ##
RUN cd /root && touch ".builded.$(date +%F_%R)" && cd / && \
    apk --update add --no-cache \
        nodejs nodejs-npm && \
    ## stylus and dependencies ##
    npm -g install stylus && \
    npm -g install nib && \
    ## browserify and dependencies ##
    npm -g install browserify && \
    ## server dependencies ##
    cd /app && \
    #npm install --no-bin-links && \
    npm cache clean
WORKDIR /app
EXPOSE 8080
CMD ["node", "server.js"]