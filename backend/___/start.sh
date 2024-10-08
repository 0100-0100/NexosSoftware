python3 -m venv .venv
source .venv/bin/activate
pip3 install -r ../requirements.txt
python3 manage.py makemigrations &&
    python3 manage.py migrate &&
    python3 manage.py collectstatic --noinput &&
    python3 -m uvicorn ___.asgi:application --reload
