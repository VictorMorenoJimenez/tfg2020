# Update upgrade playbook
Simply install the required packages to use the apt ansible module and then update the apt repositories and upgrade all packages.

```yml
---
- name: Install python package
  apt:
    pkg:
      - python-apt
      - python3-apt
      - python
      - python3

- name: Update apt cache
  apt:
    update_cache: yes

- name: Upgrade all packages to the latest version
  apt:
    name: "*"
    state: latest

```