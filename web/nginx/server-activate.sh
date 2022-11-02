# sudo python3 makemigrations
# sudo python3 migrate

uwsgi --http 0.0.0.0:8000 --module config.wsgi &

# cd /home/ychan/CapstoneProject/web/was/
