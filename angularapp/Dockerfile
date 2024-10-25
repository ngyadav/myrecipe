# Step 1: Use the official Node.js image as the base image
FROM node:14 AS build
 
# Step 2: Set the working directory
WORKDIR /app
 
# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./
 
# Step 4: Install the application dependencies
RUN npm install
 
# Step 5: Copy the rest of the application code
COPY . .
 
# Step 6: Build the Angular application
RUN npm run build --prod
 
# Step 7: Use a lightweight web server to serve the built application
FROM nginx:alpine
 
# Step 8: Copy the build output to the Nginx server directory
COPY --from=build /dist/angular-app /usr/share/nginx/html
 
# Step 9: Expose the default port for Nginx
EXPOSE 80
 
# Step 10: Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
