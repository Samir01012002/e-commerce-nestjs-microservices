FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install -g npm@latest && npm cache clean --force
RUN npm install -g @nestjs/cli
RUN npm install --save-dev @types/node
RUN npm install prisma --save-dev

COPY . .

RUN npm install
RUN npm run build

# -------------------------------------------------------------

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3002

CMD sh -c "sleep 20 && npm run start:migrate:prod"