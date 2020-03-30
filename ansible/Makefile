ROLES_DIR=./roles
SHELL= /bin/bash

full_test_all: $(ROLES_DIR)/*
	for role in $^; do \
		cd $${role} && molecule test && cd ../../; \
	done

test_all: $(ROLES_DIR)/*
	for role in $^; do \
		ansible-playbook $${role}/tests/test.yml -i \
										 $${role}/tests/inventory \
										 --syntax-check; \
	done

test_create_bash_users:
	ansible-playbook roles/create_bash_users/tests/test.yml -i \
									 roles/create_bash_users/tests/inventory \
									 --syntax-check

test_install_image:
	ansible-playbook roles/install_image/tests/test.yml -i \
									 roles/install_image/tests/inventory \
									 --syntax-check

full_test_create_bash_users:	
	cd roles/create_bash_users && molecule test && cd ../../
full_test_install_image:
	cd roles/install_image && molecule test && cd ../../

