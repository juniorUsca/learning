FROM alpine:3.6
RUN apk --update add --no-cache \
        nodejs nodejs-npm && \
    npm -g install stylus && \
    npm -g install nib && \
    npm cache clean
WORKDIR /app
#COPY . /app
