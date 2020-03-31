.PHONY: help
.DEFAULT_GOAL := help 

ROLES_DIR=./roles
SHELL= /bin/bash

help: ## This help.
	@echo
	@echo -e "\e[1;35m Makefile for ansible role development \e[0m"
	@echo -e "\e[1;33m Test Framework: Molecule \e[0m"
	@echo -e "\e[1;33m Ansible roles path: ./roles  \e[0m"
	@echo -e "\e[1;33m Ansible playbooks path: ./playbooks \e[0m"
	@echo
	@echo
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo

full_test_all: $(ROLES_DIR)/* ## Run full tests with molecular framework of all roles. Execute with make full_test.
	for role in $^; do \
		cd $${role} && molecule test && cd ../../; \
	done

test_all: $(ROLES_DIR)/* ## Run syntax test for all roles. Execute with make test_all.
	for role in $^; do \
		ansible-playbook $${role}/tests/test.yml -i \
										 $${role}/tests/inventory \
										 --syntax-check; \
	done

test_role: ## Run syntax test for rolle specified in ROLE var. Execute with make ROLE=role test_role.
	ansible-playbook roles/$(ROLE)/tests/test.yml -i \
									 roles/$(ROLE)/tests/inventory \
									 --syntax-check

create_role: ## Create role, need NEW_ROLE var. Execute with make NEW_ROLE=role create_role.
	cd $(ROLES_DIR) && molecule init role $(NEW_ROLE) -d docker

playbook: ## Execute playbook, need PLAYBOOK var. Execute with make PLAYBOOK=playbook playbook
	ansible-playbook playbooks/$(PLAYBOOK).yml -i inventories/staging/hosts
	
