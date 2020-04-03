# Configure bare metal playbook
This playbook is created to install an iso image to a brand new Hetzner server with the minimun packages.



```yml
---

- hosts: localhost 
  gather_facts: false

  roles:
    - activate_hetzner_rescue

- hosts: tfg.intelligenia.com
  gather_facts: false

  roles:
    - install_hetzner_image
```
There are two different parts here:

## Activate hetzner rescue  
Runs a bunch of POST request to the Hetzner API in order to activate the
rescue mode.

[Learn more about activate_hetzner_rescue role](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/role/activate_hetzner_rescue.md)


## Install Hetzner image
With the rescue mode activated on a Hetzner server, executes the **installimage** script inside the server to install an iso image.

[Learn more about install_hetzner_image role](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/ansible/roles/activate_hetzner_rescue)