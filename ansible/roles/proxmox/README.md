Proxmox
=========

This role is created to manage and configure a Proxmox cluster

1. Install proxmox
2. Configure promox node.
3. Create/Destroy VM
4. Manage VM

Requirements
------------

For configure\_node role you need to create a VSWITCH on Hetzner Control panel.

Role Variables
--------------

Each task on this role depends on a variable to be executed. You can define the variables
in the playbook.

- Task: configure\_node:
- Vars:
  - **configure_node_opt**: If set to yes execute this task.
  - **ppal_iface**: Main interface of the server ex. (enp0s3)
  - **hetzner_ip**:  You can check this on Hetzner control panel.
  - **hetzner_broadcast**: You can check this on Hetzner control panel.
  - **hetzner_gateway**: You can check this on Hetzner control panel.
  - **pfsense_ip**: The firewall IP.
  - **failover_ip**: Failover IP hired from Hetzner.
  - **node_proxmox_ip**: the ip inside the proxmox net ex. (192.168.100.1)
  

- Task: create\_vm
- Vars:
  - **create_vm_opts**: If set to yes execute this task.
  - **node**: Proxmox node where the VM will be created.
  - **create_vm**: Diccionary with this sub-vars. This variables will
  be used to create the VM.
      - vmid:
      - host:
      - name:
      - memory:
      - sockets:
      - cores:
      - password:
      - hostname:
      - template:
      - bridge:

- Task: install\_proxmox:
- Vars:
  - **install_proxmox_opt**: If set to yes execute this task

- Task: upload\_iso:
- Vars:
  - **upload_iso_opts**: If set to yes execute this task
  - **host**: Proxmox host
  - **iso_name**: name of the iso to upload
  - **node**: proxmox node 
  - **iso_url**: url where download the iso


Dependencies
------------

A list of other roles hosted on Galaxy should go here, plus any details in regards to parameters that may need to be set for other roles, or variables that are used from other roles.

Example Playbook
----------------

Including an example of how to use your role (for instance, with variables passed in as parameters) is always nice for users too:

    - hosts: servers
      roles:
         - { role: username.rolename, x: 42 }

License
-------

BSD

Author Information
------------------

An optional section for the role authors to include contact information, or a website (HTML is not allowed).
