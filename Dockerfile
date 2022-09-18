FROM node:16

# Create app directory
WORKDIR /app


COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build


EXPOSE 3000
CMD ["npm", "run", "start"]

docker run -p 80:3000 -d restream-fe 