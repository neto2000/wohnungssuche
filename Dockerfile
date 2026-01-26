
FROM node:lts-alpine

ENV NODE_ENV development


WORKDIR /usr/src/app


COPY ["package.json", "package-lock.json", "svelte.config.js", "vite.config.js", "./"]



RUN npm install


COPY . .

EXPOSE 5173
EXPOSE 24678


CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
