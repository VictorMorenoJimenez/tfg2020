FROM python:3.7-slim AS compile-image

RUN apt-get update && apt-get install -y --no-install-recommends build-essential gcc gettext default-libmysqlclient-dev
RUN python -m venv /opt/venv

# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

COPY ./src/requirements/base.txt /base.txt
RUN pip install -r base.txt
RUN pip install uwsgi==2.0.18
RUN pip install django-minio-storage==0.3.5

######


FROM python:3.7-slim AS build-image

RUN apt-get update && apt install -y --no-install-recommends gettext libmariadb3
COPY --from=compile-image /opt/venv /opt/venv

# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app
COPY compose/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/prod/start /start
RUN sed -i 's/\r//' /start
RUN chmod +x /start

COPY ./compose/prod/uwsgi.ini uwsgi.ini
COPY ./src /app

ENTRYPOINT ["/entrypoint"]
