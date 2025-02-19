FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest && npm cache clean --force
RUN npm install -g @nestjs/cli
RUN npm install --save-dev @types/node

COPY . .

RUN npm install
RUN npm run build

# -------------------------------------------------------------

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3003

#sleep 10 para esperar que kafka esté disponible
CMD ["sh", "-c", "sleep 10 && npm run start:prod"]