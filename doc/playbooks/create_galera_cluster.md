## Create galera cluster
After executing this playbook on a node with all tags:

* 3 VM created on Proxmox.
* Galera cluster created and configured.

### How to execute this playbook

Before executing this playbook you must fill some vars. All vars available are on `roles/galera/defaults`. This are the must fill vars:

* First part, configure pfSense DHCP:
  - `pfsense_config_path`: path to config file of pfsense, default `/cf/conf/config.xml`.
  - `pfsense_ssh_port`: pfSense ssh port.
  - `pfsense_configure_dhcp_opt`: 'yes' if you want to configure pfSense DHCP with new VM.
  
* Second part, create virtual machines on Proxmox:
  - `create_vm_opt`: 'yes' if you want to create the vm on `create_vms` var.
  - `start_after_create`: start VM after creation.
  - `interface`: network interface of VM.
  - `host_user`: user on VM.
  - `downloads`: Debian 10 generic template, don't change this.
  - `create_vms`: list of VM's to create, check template on `role/galera/defaults/main.yml`.
  - `vm_id`: new virtual machine id.

* Third part, install and configure galera.
  * Configure VM and install common packages.
    -  `configure_vm_opt`: 'yes' if you need to configure virtual machine.
    -  `vm_domain`: domain of local network.
    -  `interface`: network interface of virtual machine.
    -  `host_user`: user of virtual machine.
    -  `recommended_packages`: list of packages to install on virtual machine.
  
  * Restart DHCP server
    - `pfsense_ssh_port`: pfSense ssh port.

  * Install galera cluster on virtual machines.
    - `configure_galera_opt`: 'yes' if you want to configure the galera cluster (required).
    - `install_mariadb_opt`: 'yes' if you want to install mariadb (required).
    - `mysql_root_password`: mysql root password.
    - `galera_cluster_name`: galera cluster name
    - `galera_cluster_nodes`: ip address of galera nodes.

### Execution

Add the new VM's to `hosts.yml` file. As an example:

```yml
    galera:
        hosts:
            galera-node-01:
                ansible_host: 10.6.100.70
                ansible_user: user
                vm_hostname: galera-node-01
                first_node: "yes"
                galera_node_address: 10.6.100.70
            galera-node-02:
                ansible_host: 10.6.100.71
                ansible_user: user
                vm_hostname: galera-node-02
                first_node: "no"
                galera_node_address: 10.6.100.71
            galera-node-03:
                ansible_host: 10.6.100.72
                ansible_user: user
                vm_hostname: galera-node-03
                first_node: "no"
                galera_node_address: 10.6.100.72  
```

Now we can execute the playbook:

```bash
    make PLAYBOOK=create_galera_cluster TAGS=all playbook
```