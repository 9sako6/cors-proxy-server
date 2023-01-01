FROM denoland/deno:alpine-1.28.3
WORKDIR /app
COPY . /app/
EXPOSE 8000
CMD [ "deno", "task", "run" ]
