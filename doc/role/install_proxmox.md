# Install Proxmox role
This role is responsible for install Proxmox on the server.

Also removes the enterprise version of proxmox, because we dont need it.

Proxmox-ve, postfix and open-iscsi are required. [Proxmox doc](https://pve.proxmox.com/wiki/Install_Proxmox_VE_on_Debian_Buster).

```yml
---
- name: Add the Proxmox VE key
  shell: wget http://download.proxmox.com/debian/proxmox-ve-release-6.x.gpg -O /etc/apt/trusted.gpg.d/proxmox-ve-release-6.x.gpg

- name: Add Proxmox VE repository
  apt_repository:
    repo: deb http://download.proxmox.com/debian/pve buster pve-no-subscription
    state: present

- name: Remove Proxmox PVE entreprise repository
  apt_repository:
    repo: deb https://enterprise.proxmox.com/debian/pve buster pve-enterprise
    absent: present

- name: Upgrade all packages to the latest version
  apt:
    name: "*"
    state: latest

- name: Install Proxmox VE packages
  apt:
    pkg:
      - proxmox-ve
      - postfix
      - open-iscsi
```