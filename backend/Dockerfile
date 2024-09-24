FROM python AS compiler
ENV PYTHONBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

RUN mkdir /___/
WORKDIR /___/

RUN adduser --system --group django

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY ./requirements.txt /___/requirements.txt
RUN pip3 install -Ur requirements.txt

FROM python AS runner
WORKDIR /___/
COPY --from=compiler /opt/venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"
COPY ./backend/___ ./___

RUN mkdir /static
RUN python3 manage.py collectstatic --noinput

EXPOSE 8000
CMD ["python3", "-m", "gunicorn", "___.asgi:application", "-b", "0.0.0.0:8000", "-k", "uvicorn_worker.UvicornWorker"]
