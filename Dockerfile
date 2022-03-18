FROM node:12.18.3
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
