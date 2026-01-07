# ==== CONFIGURE =====
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# ==== METADA =====
LABEL name="cards-banking"
LABEL version="1.0"
LABEL description="Cards Banking"
LABEL owner="SII"

# ==== ENV VARIABLES =====
ENV TZ=America/Santo_Domingo

# ==== BUILD =====
COPY . .

RUN npm install && npm run build

# ==== RUN =======
EXPOSE 9280

ENV NODE_ENV=production

CMD [ "npx", "next", "start", "-p", "9280" ]