FROM nginx:stable-alpine-slim
# Copy the static files to the Nginx document root
WORKDIR /usr/share/nginx/html
COPY ./dist .
COPY ./default.conf /etc/nginx/conf.d/default.conf 
# Expose port 80 for Nginx
EXPOSE 80
# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
