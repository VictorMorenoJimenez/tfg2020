## Dockerize Django + Angular app.
Let's start with the Django part:

### Django
The django project was created from the cookiecutter template with the next folder structure:
```bash
├── backend
│   ├── compose
│   ├── Dockerfile
│   ├── __init__.py
│   ├── Makefile
│   ├── README.md
│   └── src
├── db
│   └── compose
├── docker-compose-prod.yml
├── docker-compose.yml
├── env-template
├── frontend
│   ├── angular.json
│   ├── compose
│   ├── CREDITS
│   ├── Dockerfile
│   ├── e2e
│   ├── gulp
│   ├── gulpfile.js
│   ├── LICENSE
│   ├── Makefile
│   ├── package.json
│   ├── package-lock.json
│   ├── patch.js
│   ├── proxy.conf.json
│   ├── README.md
│   ├── src
│   ├── swagger.json
│   ├── tsconfig.json
│   └── tslint.json
├── Makefile
├── README.md
├── setup.cfg
└── swagger-update.sh
```

For the Django part we are only interested on the `Dockerfile` inside backend folder.

```Dockerfile
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
```

Feel free to check `/compose/entrypoint`, and `/compose/prod/start` scripts.
This Dockerfile will build the container with our Django backend running. Remember that the container is going to execute `/entrypoint`.
We need to upload this container image to an accessible registry.

### Frontend
The Angular project can be found at `frontend` folder. Here we also have a Dockerfile to build the frontend container:

```Dockerfile
    FROM node:12.0.0 as builder

    RUN npm install npm@6.9.0
    RUN npm install -g @angular/cli@9.1.3

    COPY . ./app
    WORKDIR /app

    RUN npm install
    RUN npm update

    RUN npm run build-prod

    FROM nginx:1-alpine
    COPY ./compose/prod/nginx.conf /etc/nginx/conf.d/default.conf
    RUN rm -rf /usr/share/nginx/html/*
    COPY --from=builder /app/dist/ /usr/share/nginx/html
    EXPOSE 80

    CMD ["nginx", "-g", "daemon off;"]
```

This container will expose our Angular app with nginx.

## Compile and upload image to registry.
To deploy our application in a orquestation tool, we need the container images to be accesible.
That's why, we need to configure Gitlab registry. See [create_gitlab](https://github.com/VictorMorenoJimenez/tfg2020/blob/master/doc/playbooks/create_gitlab.md). It's very important to separate backend and frontend in two GitLab repositories in order to have the images isolated. We recommend using github submodules to create the repositories.
Once we have our registry up and running and our repositories on GitLab ready, we can use the `Makefile` on `frontend` and `backend`.

```cat backend/Makefile```
```Makefile
.DEFAULT_GOAL := help

REGISTRY = tfg-registry.domain.com
DOCKER_IMAGE_NAME = django-project
TAG = backend
GROUP = project_group

runner=$(shell whoami)
gitver=$(shell git log -1 --pretty=format:"%H")

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo

build:
	docker build -f Dockerfile -t $(DOCKER_IMAGE_NAME):$(gitver) .
	docker tag $(DOCKER_IMAGE_NAME):$(gitver) $(REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):latest
	docker tag $(DOCKER_IMAGE_NAME):$(gitver) $(REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):$(gitver)

push: build
	docker login $(REGISTRY)
	docker push $(REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):$(gitver)
	docker push $(REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):latest
```

```cat frontend/Makefile```
```Makefile
ALL := help

REGISTRY = tfg-registry.domain.com
DOCKER_IMAGE_NAME = django-project
TAG = frontend
GROUP = group

runner=$(shell whoami)
gitver=$(shell git log -1 --pretty=format:"%H")

help: ## This help.
				@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
				@echo

build:
				docker build -f Dockerfile -t $(DOCKER_IMAGE_NAME):$(gitver) .
				docker tag $(DOCKER_IMAGE_NAME):$(gitver) $(REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):latest
				docker tag $(DOCKER_IMAGE_NAME):$(gitver) $(REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):$(gitver)


push: build
				docker login $(REGISTRY)
				docker push $(REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):$(gitver)
				docker push $(REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):latest

```

Usage:
```bash
    # Build and push image to registry.
    make push
```

Before executing any `Makefile` command, you have to login to your registry [see docs](https://docs.gitlab.com/ee/user/packages/container_registry/).


