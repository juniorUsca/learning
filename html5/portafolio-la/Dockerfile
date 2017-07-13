#FROM alpine:3.6
## Its to generate root directory ##
#RUN cd /root && touch ".builded.$(date +%F_%R)" && cd / && \
    #apk --update add --no-cache \
        #python
FROM ubuntu
RUN apt-get update && apt-get install python -y
WORKDIR /app
COPY . /app
EXPOSE 8000
CMD ["python", "-m", "SimpleHTTPServer"]