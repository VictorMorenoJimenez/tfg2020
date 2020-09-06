## Create ceph cluster
After executing this playbook on a node with all tags:

* 4 VM created on Proxmox.
* Ceph cluster created and configured.

### How to execute this playbook

Before executing this playbook you must fill some vars. All vars available are on `roles/ceph/defaults`. This are the must fill vars:

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
  - `create_vms`: list of VM's to create, check template on `role/ceph/defaults/main.yml`.
  - `create_disk_opt`: 'yes' if you want to create additional disk.
  - `vm_id`: new virtual machine id.
  - `disk_size`: size in GB of new disk.

  
* Third part, install and configure ceph.
  * Configure VM and install common packages.
    -  `configure_vm_opt`: 'yes' if you need to configure virtual machine.
    -  `vm_domain`: domain of local network.
    -  `interface`: network interface of virtual machine.
    -  `host_user`: user of virtual machine.
    -  `recommended_packages`: list of packages to install on virtual machine.
  
  * Restart DHCP server
    - `pfsense_ssh_port`: pfSense ssh port.

  * Install ceph on virtual machines.
    - `add_nodes_to_cluster_opt`: 'yes' if you want to add ceph nodes to cluster.
    - `install_docker_opt`: 'yes' if you want to install docker. (required)
    - `deploy_ceph_keys_opt`: 'yes' if you want to deploy ceph-master to ceph nodes. (required)
    - `install_ceph_opt`: 'yes' if you want to install ceph (required).
    - `create_cluster_opt`: 'yes' if you want to create ceph cluster (required).
    - `configure_dashboard_access_opt`: 'yes' if you want to configure dashboard access.
    - `deploy_ceph_mons_opt`: 'yes' if you want to deploy mon on cluster.
    - `deploy_ceph_osd_opt`: 'yes' if you want to deploy osd on cluster.
    - `deploy_ceph_mgr_opt`: 'yes' if you want to deploy mgr on cluster.
    - `deploy_ceph_mds_opt`: 'yes' if you want to deploy mds on cluster.
    - `create_cephfs_opt`: 'yes' if you want to create cephfs on cluster.
    - `ceph_dashboard_admin`: admin user for ceph dashboard.
    - `ceph_dashboard_admin_password`: password of ceph dashboard.
    - `osd_disk_path_1`: osd path on node 1 default: /dev/sdb.
    - `osd_disk_path_2`: osd path on node 2 default: /dev/sdb. 
    - `osd_disk_path_3`:osd path on node 3. default: /dev/sdb
    - `host_user`: user on virtual machine.
    - `first_node_ip`: ceph master node ip.
    - `ceph_workers`: list of ceph workers.

### Execution

Add the new VM's to `hosts.yml` file. As an example:

```yml
    ceph:
        hosts:
            ceph_admin:
                ansible_host: 10.6.100.30
                ansible_user: user 
                vm_hostname: ceph-admin 
                ceph_admin: "yes"    
            ceph_node_01:
                ansible_host: 10.6.100.31
                ansible_user: user 
                vm_hostname: ceph-node-01  
                ceph_admin: "no" 
            ceph_node_02:
                ansible_host: 10.6.100.32
                ansible_user: user 
                vm_hostname: ceph-node-02 
                ceph_admin: "no"   
            ceph_node_03:
                ansible_host: 10.6.100.33
                ansible_user: user 
                vm_hostname: ceph-node-03 
                ceph_admin: "no"  
```

Now we can execute the playbook:

```bash
    make PLAYBOOK=create_ceph_cluster TAGS=all playbook
```