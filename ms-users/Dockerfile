FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install -g npm@latest && npm cache clean --force
RUN npm install -g @nestjs/cli
RUN npm install --save-dev @types/node
RUN npm install prisma --save-dev
RUN apk add --no-cache python3 make g++  # Required for bcrypt

COPY . .

RUN npm install
RUN npm rebuild bcrypt --build-from-source  # Ensures bcrypt is compiled for Alpine
RUN npm run build

# -------------------------------------------------------------

FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++  # Required for bcrypt in the production image

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Rebuild bcrypt in the final image
RUN npm rebuild bcrypt --build-from-source

EXPOSE 3001

CMD sh -c "sleep 20 && npm run start:migrate:prod"