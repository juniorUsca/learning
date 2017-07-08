FROM alpine:3.6
COPY . /app
RUN apk --update add --no-cache \
        nodejs nodejs-npm && \
    # stylus and dependencies
    npm -g install stylus && \
    npm -g install nib && \
    # server dependencies
    cd /app && \
    npm install --no-bin-links && \
    npm cache clean
WORKDIR /app
EXPOSE 8080
CMD ["node", "server.js"]