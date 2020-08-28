.PHONY: help

.DEFAULT_GOAL := help
runner=$(shell whoami)


help: ## This help.
	@echo
	@echo "\e[1;35m Port mapping used: $<\e[0m"
	@echo "\e[1;33m - Backend: localhost:8000 $<\e[0m"
	@echo "\e[1;33m - Phpmyadmin: localhost:8080 $<\e[0m"
	@echo "\e[1;33m - Frontend: localhost:4200 $<\e[0m"
	@echo "\e[1;33m - Celery Frower: localhost:5555 $<\e[0m"
	@echo
	@echo "\e[1;36m Testing database credentials in file .envs/.local/.mysql $<\e[0m"
	@echo "\e[1;35m Useful command to backup and restore your database $<\e[0m"
	@echo "\e[1;37m >  docker exec db /usr/bin/mysqldump -u root --password=password DATABASE > backup.sql $<\e[0m $<\e[0m \e[1;36m# create database backup file  $<\e[0m"
	@echo "\e[1;37m >  cat backup.sql | docker exec -i db /usr/bin/mysql -u root --password=password DATABASE $<\e[0m \e[1;36m# restore database from backup file $<\e[0m"
	@echo "\e[1;37m >  docker volume rm mysql-data $<\e[0m \e[1;36m# reset database $<\e[0m"
	@echo
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo


build: ## Build developer containers.
	docker-compose build

up: build ## Run developer containers.
	docker-compose up

silenceup: ## Run developer containers without print messages.
	docker-compose up -d

flake8:
	docker run -it -v $(shell pwd):/code mvantellingen/python-lint:latest flake8 ./backend/src/

createsuperuser: ## Create superuser.
	docker-compose run  --rm backend python manage.py createsuperuser

down: ## Force stop and delete all containers.
	docker-compose down

shell: ## Run django shell.
	docker-compose run  --rm backend python manage.py shell

test: ##Run django unittest.
	docker-compose run --rm backend python manage.py test

migrate: ## Run migrate command in django container.
	docker-compose run  --rm backend python manage.py migrate

makemigrations: ## Run makemigrations command in django container.
	docker-compose run  --rm backend python manage.py makemigrations
	sudo chown -R $(runner):$(runner) -Rf *

empty_makemigrations: ## Run makemigrations command in django container with change own file.
	docker-compose run --rm backend python manage.py makemigrations --empty $(app) --name $(name)
	sudo chown -R $(runner):$(runner) -Rf *

djangologs: ## Show and follow the django console messages
	docker-compose logs -f  backend

swagger: ## Generate Swagger
	./swagger-update.sh

apigen: swagger ## Run NPM APIGEN (yasag)
	docker-compose run --rm frontend npm run apigen

resetdb: ## Clean database volume.
	docker volume rm $(shell basename $(CURDIR))_mysql-data

backup: ## Create database volume backup.
	@docker run -v $(shell basename $(CURDIR))_mysql-data:/volume --rm loomchild/volume-backup backup - > ./$(shell basename $(CURDIR))_mysql-data.tar.bz2

restore: resetdb  ## Restore database volume backup.
	cat ./$(shell basename $(CURDIR))_mysql-data.tar.bz2 | docker run -i -v $(shell basename $(CURDIR))_mysql-data:/volume --rm loomchild/volume-backup restore -

newapp: ## Create new backend app, expects name argument.
	docker-compose run  --rm backend python manage.py startapp '$(name)'
	sudo chown -R $(runner):$(runner) ./backend/src/$(name)
	touch ./backend/src/$(name)/serializers.py
	touch ./backend/src/$(name)/urls.py
	mkdir ./backend/src/$(name)/validators
	touch ./backend/src/$(name)/validators/__init__.py
