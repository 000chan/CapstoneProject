# sudo python3 makemigrations
# sudo python3 migrate

uwsgi --http 0.0.0.0:8000 --module config.wsgi &

# this file needs to locate '/home/ychan/CapstoneProject/was/web/backend'
