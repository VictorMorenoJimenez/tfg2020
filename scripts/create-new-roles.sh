#!/bin/bash


# Check if there is at least one argument
if [ $# -eq 0 ]; then
  echo "Usage: ./create-new-roles.sh role1 role2 role3..."
fi

# First go to the roles directory
cd ../ansible/roles

# Iterate arguments and create all roles
for role in "$@"; do
  #ansible-galaxy init $role
  molecule init role $role -d docker
done
