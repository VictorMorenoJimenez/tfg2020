# Upload iso proxmox role
This role allows you to upload the required iso files to create VM's in the Proxmox environment.

You can choose wich iso upload just changing the get_url url on the tasks:

```yml
---

- name: Download debian 10 iso
  get_url:
    url: https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-10.3.0-amd64-netinst.iso
    dest: ./debian10.iso

- name: Upload iso to proxmox
  proxmox_template:
    node: "{{ proxmox.node }}" 
    api_user: "{{ proxmox.user }}"
    api_password: "{{ proxmox.password }}"
    api_host: "{{ target }}" 
    storage: "{{ proxmox.storage }}" 
    content_type: iso 
    src: ./debian10.iso 
    force: yes

- name: Download pfsense iso
  get_url:
    url: https://nyifiles.pfsense.org/mirror/downloads/pfSense-CE-2.4.4-RELEASE-p3-amd64.iso.gz
    dest: ./pfsense.iso

- name: Upload pfsense iso to proxmox
  proxmox_template:
    node: "{{ proxmox.node }}" 
    api_user: "{{ proxmox.user }}"
    api_password: "{{ proxmox.password }}"
    api_host: "{{ target }}" 
    storage: "{{ proxmox.storage }}" 
    content_type: iso 
    src: ./pfsense.iso 
    force: yes
```

This role requires a vars/main.yml file with the following structure:

You can create this file with **ansible-vault**:

```bash
ansible-vault create roles/upload_iso_proxmox/vars/main.yml --vault-pass=.vault_pass.txt
```

With the password string in the file **.vault_pass.txt**.

```yml
proxmox:
  node: node_name
  storage: storage_name 
  user: user@pam
  password: password
```

