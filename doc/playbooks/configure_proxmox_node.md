## Configure proxmox node
After executing this playbook on a node with all tags you will have:

* Proxmox installed.
* Proxmox configured.
* SSL cert configured on server.


### How to execute this playbook

Before executing this playbook you must fill some vars. All vars available are on `roles/proxmox_nodes/defaults`. This are the must fill vars:

* First part, install ISO image on node.

  - `install_image_opt`: 'yes' if you want to install the ISO image.
  - `partitions`: 'define here desired partitions'
  - `logical_volues`: 'define here desired logical volumes'
  - `iso`: Choosen iso, you can check available iso [here](https://docs.hetzner.com/robot/dedicated-server/operating-systems/installimage)

* Second part, install and configure Proxmox on nodes.

- `install_proxmox_opt` : 'yes' if you want to install Proxmox.
- `configure_node_opt`: 'yes' if you want to configure node.
- `create_users_groups_opt` : 'yes' if you want to create system users/groups. Depend on vars `create_groups` and `users`.    
- `install_packages_opt`: 'yes' install custom packages on system defined on var `apt_package_list`. 

System Users and Groups
- `users`: list of system users to create, check example on `roles/proxmox_nodes/defaults`.
- `create_groups`: list of system groups to create, check example on `roles/proxmox_nodes/defaults`.

Proxmox Users and Groups:
- `pve_users`: list of Proxmox users to create, check example on `roles/proxmox_nodes/defaults`.
- `pve_groups`: list of Proxmox groups to create, check example on `roles/proxmox_nodes/defaults`. 

Vlan nodes id, defineds on VSwtich Hetzner control panel.

- `vlan_nodes_id`: 
- `vlan_lan_id`: 
- `vlan_pfsync_id`: 
- `vlan_nodes2_id`: 

* SSL
  - `servername`: domain name to create SSL cert.
  - `certbot_admin_email`: valid email to send confirmation.
  - `create_ssl_certificate_opt`: 'yes' if you want to create SSL certificate on nodes.


### Execution

After filling vars and configuring `hosts.yml` file we can execute the playbook with: 

```bash
    make PLAYBOOK=configure_proxmox_nodes TAGS=all playbook
```
