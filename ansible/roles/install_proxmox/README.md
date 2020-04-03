Role Name
=========

Installs Proxmox VE 6.0 on Debian system.

Requirements
------------

The server must have debian distro installed.

Role Variables
--------------

Variables are defined on vars/main.yml.
There is no need to override any variable if deploying on Debian 10 buster.

Just change debian version on variables to run on stretch or similar.

- **apt_package_list**:
  - proxmox-ve
  - postfix
  - open-iscsi

- **key_url_list**: http://download.proxmox.com/debian/proxmox-ve-release-6.x.gpg

- **add_repo_list**:
  - deb http://download.proxmox.com/debian/pve buster pve-no-subscription

**remove_apt_repo**: deb https://enterprise.proxmox.com/debian/pve buster pve-enterprise

The enterprise repo is not signed, that's why we remove it.

Dependencies
--------------
This role depends on the [manage_packages](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/ansible/roles/manage_packages) role. Override the default vars from manage_packages.

Example Playbook
----------------

Including an example of how to use your role (for instance, with variables passed in as parameters) is always nice for users too:

```yml
    - hosts: servers
      roles:
         - install_proxmox
```

License
-------

BSD

Author Information
------------------

Víctor Moreno Jiménez. victormoreno@correo.ugr.es