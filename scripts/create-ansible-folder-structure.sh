#!/bin/bash

# Fill this variable with the roles you need
roles=(install_image)


# Everything will be under the ansible folder
mkdir ../ansible && cd ../ansible

# Inventory directory for staging and production
mkdir -p inventories/production/host_vars
mkdir -p inventories/production/group_vars
mkdir -p inventories/staging/host_vars
mkdir -p inventories/staging/group_vars

# Inventory file for staging and production
touch inventories/production/hosts
touch inventories/staging/hosts

# Optional directorys (Rarely used)
mkdir {library,module_utils,filter_plugins}

# Playbooks directory (Not in the official docs)
mkdir playbooks

# Roles directory, below Roles everything will be created with ansible-galaxy init
mkdir roles && cd roles

# Create roles 
for i in ${roles[@]}; do
  ansible-galaxy init $i
done

