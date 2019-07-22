FROM node:latest
WORKDIR /app/
COPY . .
RUN yarn
RUN git clone https://github.com/vishnubob/wait-for-it.git
CMD ["./wait-for-it/wait-for-it.sh", "db:5432", "-t", "0", "--", "yarn", "up"]
