# Common steps playbook
This is the main configuration file of the Hetzner server after the [install_hetzner_image](https://github.com/VictorMorenoJimenez/tfg2020/blob/master/doc/playbooks/install_hetzner_image.md) playbook.


```yml
---
- hosts: "{{ target  }}"
  # Gather_facts le dice a ansible que no recoja informaciond el servidor
  gather_facts: false
  remote_user: root
  become: true
  roles:
      - update_upgrade 
      - install_common_packages
      - install_proxmox
      - create_users 
      - {role: upload_iso_proxmox, tags: upload}
      - restart_server
```

## Roles
* [update_upgrade](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/role/update_upgrade.md)
* [install_common_packages](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/role/install_common_packages.md)
* [install_proxmox](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/role/install_proxmox.md)
* [create_users ](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/role/create_users.md)
* [upload_iso_proxmox](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/role/upload_iso_proxmox.md)
* [restart_server](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/role/restart_server.md)
