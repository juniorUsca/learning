FROM alpine:3.6
## Its to generate root directory ##
RUN cd /root && touch ".builded.$(date +%F_%R)" && cd / && \
    apk --update add --no-cache \
         nodejs nodejs-npm
COPY package.json /app/package.json
WORKDIR /app
#RUN set -x && \
#	apk add --no-cache --virtual .build-deps \
#		autoconf \
#		automake \
#		build-base \
#		libpng-dev \
#		nasm && \
RUN npm install && \
#	apk del .build-deps && \
    ## stylus and dependencies ##
#    npm -g install stylus && \
#    npm -g install nib && \
    npm cache clean
COPY . /app
EXPOSE 3000
#CMD ["npm", "run", "start"]
