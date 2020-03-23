# Install common packages role
As its name says this role simply install some common packages for the server. It include a few utils. Feel free to modify it.

**Proxmoxer** and **Requests** are required to use the Ansible's Proxmox module.

```yml
---

- name: Install sudo
  apt:
    name: sudo

- name: Install basic packages for server (lftp atop dnsutils netcat iotop htop openvpn ntp bash-completion git curl bzip2 unzip net-tools)
  apt:
    pkg:
      - lftp
      - atop
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

- name: Install proxmoxer required for Ansible proxmox module
  pip:
    name: proxmoxer

- name: Install requests required for Ansible proxmox module
  pip:
    name: requests
```