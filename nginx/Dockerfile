FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
RUN apk add tzdata
COPY ./nginx.conf/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]