docker stop $(docker ps -a -q) 2>>/dev/null;
docker rm $(docker ps -a -q) 2>>/dev/null;
docker compose pull && docker compose build && docker compose up
