FROM httpd
COPY ./dist /usr/local/apache2/htdocs/
COPY ./docker/public /usr/local/apache2/htdocs/
RUN a2enmod rewrite
RUN service apache2 restart
