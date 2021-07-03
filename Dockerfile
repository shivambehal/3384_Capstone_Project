# Mount Node Alpine
# NODE production
FROM node:16-alpine
ARG NODE_ENV=production

LABEL org.opencontainers.image.source=https://github.com/shivambehal/3384_Capstone_Project

WORKDIR /home/priv/app

# Copy package.json and package-lock.json
COPY package*.json ./
# Install production dependencies
RUN npm ci --only=production

# Copy app source
COPY . .

# Add user 
# directory permissions
RUN addgroup -S priv \
  && adduser -S priv -G priv \
  && chmod 700 /home/priv/app \
  && chown -R priv:priv /home/priv/

EXPOSE 80

# Start app
USER priv
CMD [ "node", "server.js" ]