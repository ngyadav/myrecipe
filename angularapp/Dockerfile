# Use the official Node.js image to build the app
FROM node:14 AS build
 
# Set the working directory
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY angularapp/package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code
COPY angularapp ./
 
# Build the Angular app
RUN npm run build --prod
 
# Use a lightweight web server to serve the application
FROM nginx:alpine
 
# Copy the built application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html
 
# Expose port 80
EXPOSE 80
 
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
