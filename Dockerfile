# AI-KÄYTTÖ ALKAA | Työkalu: Claude (Anthropic) | Tarkoitus: Docker-kuvan määritys sekä sen refaktorointi
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
# AI-KÄYTTÖ PÄÄTTYY
