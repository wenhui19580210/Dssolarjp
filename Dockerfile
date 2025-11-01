# Build stage
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM node:18
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install serve --save
EXPOSE 3000
CMD ["npm", "start"]

