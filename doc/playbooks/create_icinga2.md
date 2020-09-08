## Create GitLab cluster
After executing this playbook on a node with all tags:

* 1 VM created on Proxmox.
* Icinga2 and Icinga2 director installed and configured.

### How to execute this playbook

Before executing this playbook you must fill some vars. All vars available are on `roles/icinga2/defaults`. This are the must fill vars:

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
  - `create_vms`: list of VM's to create, check template on `role/icinga2/defaults/main.yml`.
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

  * Install Icinga2 and Icinga2 director cluster on virtual machines.
    - `director_db`: name of director db (required).
    - `director_db_user`: user for director db (required).
    - `director_db_password`: password for director db (required).
    - `mysql_root_password`: mysql root password (required).
    - `icingaweb2_db_user`: db user for icinga web db (required).
    - `icinga_db_user`: icinga db user (required).
    - `icinga_db_password`: 'yes' if you want to install gitlab runner on cluster (required for ci/cd pipelines).
    - `icinga_db`: user for icinga db (required).
    - `api_users`: users for icinga2 API (required).

### Execution

Add the new VM's to `hosts.yml` file. As an example:

```yml
    monitors:
        hosts:
            icinga2:
                ansible_host: 10.6.100.60
                ansible_user: user
                vm_hostname: icinga2
```

Now we can execute the playbook:

```bash
    make PLAYBOOK=create_icinga2 TAGS=all playbook
```