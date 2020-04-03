# Install proxmox playbook

This playbook installs Proxmox VE on a debian 10 configured server.
Also adds users to the system.

```yml
---

- hosts: tfg.intelligenia.com 
  gather_facts: false

  roles:
    - manage_users
    - install_proxmox 

```

## Manage users
Create/Remove proxmox/linux users.

[Learn more about manage_users role](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/ansible/roles/manage_users))

## Install proxmox
Installs Proxmox on Debian environment.

[Learn more about install_proxmox role](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/ansible/roles/install_proxmox))
