## Deploy pfsense firewall
After executing this playbook on a node with all tags:

* 2 VM created on Proxmox.
* PfSense master and slave installed and configured.

### How to execute this playbook

Before executing this playbook you must fill some vars. All vars available are on `roles/pfsense/defaults`. This are the must fill vars:

* First part, create VM on Proxmox:
  Configure all vars available on the playbook, variables are self-explanatory: [playbook](https://github.com/VictorMorenoJimenez/tfg2020/blob/master/ansible/playbooks/deploy_pfsense_firewall.yml)

### Execution

Add the new VM's to `hosts.yml` file. As an example:

```yml
      pfsense_master:
          hosts:
              pfsense-01.tfg.vps:
                  ansible_host: 138.201.229.85
                  ansible_user: root  
      pfsense_slave:
          hosts:
              pfsense-02.tfg.vps:
                  ansible_host: 144.76.2.118
                  ansible_user: root  
      pfsense:
          hosts:
              pfsense-01.tfg.vps:
              pfsense-02.tfg.vps:
```

Now we can execute the playbook:

```bash
    make PLAYBOOK=display_pfsense_firewall TAGS=all playbook
```