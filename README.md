# Final Degree Project.
The purpose of this repository is to host the end of degree project in Computer Engineering from the Higher School of Informatics and Telecommunications of Granada.

The main objective of this work can be divided into different parts.

- Automate everything related to infrastructure of a company using Ansible playbooks.

- Implement CI/CD for a company that develops Django and Wordpress projects.


Anyway, to make this repository more readable, it will be divided into three blocks that are explained below.


## Part 1. Automatic server provisioning and deployment with Ansible Playbooks.

This first part consists of a series of playbooks with their associated roles.
Each playbook is explained with their roles in each link.

Summarizing these playbooks, configure a Hetzner server from scratch, 
installing the virtualization service proxmox. For more detail follow the links below.

### Playbooks:
* [configure_server](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/configure_server.md)
* [activate_rescue](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/activate_rescue.md)
* [common_steps](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/common_steps.md)
* [install_hetzner_image](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/install_hetzner_image.md)

## Part 2. Automatic VM provisioning and deployment with Ansible Playbooks

If Part 1 is completed, we should have:

* Hetzner Server provisioned with some packages and Debian 10 installed.
* [Proxmox](https://www.proxmox.com/en/)

This second part includes:

* Creation and provisioning of different types of VM's.
* Creation of infrastructure.

Ideally the infrastructure should look like:

![infrastructure](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/images/tg-diagram.png)



## Part 3. CI/CD pipeline for Django and Wordpress projects.
