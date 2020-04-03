Manage packages
=========

Role to manage pip or apt packages.

Requirements
------------

The server must be a debian distro.

Role Variables
--------------

The tasks of this role depend on the variables to be executed. Each role depends on certain variables.

If the vars of each tasks are defined, the task will run.

- Task: add_apt_repository
- Vars:
    - **key_url_list**: List of urls to download the repo key.
    - **add_repo_list**: List of apt repos to add.

- Task: install_apt_packages
- Vars:
    - **apt_package_list**: List of packages to install.

- Task: install_pip_packages
- Vars:
    - **pip_package_list**: List of pip packages to install.

- Task: remove_apt_packages
- Vars:
    - **remove_apt_packages**: List of apt packages to remove.
  
- Task: remove_apt_repository
- Vars:
    - **remove_apt_repo**: List of apt repo to remove.


Example Playbook
----------------

Example of var files for installing some packages.
```yml
 apt_package_list:
   - python-apt
   - sudo
   - lftp
   - htop
   - dnsutils
   - netcat
   - iotop
   - ntp
   - bash-completion
   - git
   - curl
   - wget
   - bzip2
   - unzip
   - net-tools
   - python-pip
   - python3-pip

pip_package_list:
  - proxmoxer
  - requests

```

That vars will run **install_apt_packages** and **install_pip_packages**

```yml
    - hosts: servers
      roles:
         - manage_packages
```

License
-------

BSD

Author Information
------------------

Víctor Moreno Jiménez. victormoreno@correo.ugr.es
