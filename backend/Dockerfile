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
COPY ./___ ./___
RUN python3 ./___/manage.py collectstatic --noinput
