Install Hetzner Image
=========

Install an ISO image on a Hetzner server on rescue mode.

Requirements
------------

Hetzner server with rescue mode activated.

Role Variables
--------------

The roles define wich ISO install, type of partitions etc.
The variables are self explanatory.

```yml
raid:
  active: 'yes'
  level: 1
disks:
  - nvme1n1 
  - nvme0n1
image: /root/.oldroot/nfs/images/Debian-103-buster-64-minimal.tar.gz
partitions:
  - /boot:ext4:512M
  - lvm:vg00:50G
  - lvm:vgsas:all
logical_volumes:
  - vg00:root:/:ext4:30G
  - vg00:swap:swap:swap:4G
  - vg00:tmp:/tmp:xfs:5G
  - vg00:home:/home:ext4:5G
  - vg00:var:/var:ext4:6G
format_second: 'no'
hostname: server
target: server
binary: 
boot_loader: grub
```

Example Playbook
----------------

```yml
    - hosts: servers
      roles:
         - install_hetzner_image
```
License
-------

BSD

Author Information
------------------

Víctor Moreno Jiménez. victormoreno@correo.ugr.es