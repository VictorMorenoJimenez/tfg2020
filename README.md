[![Build Status](https://travis-ci.org/VictorMorenoJimenez/tfg2020.svg?branch=master)](https://travis-ci.org/VictorMorenoJimenez/tfg2020)
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

[Redundant infrastructure](https://github.com/VictorMorenoJimenez/tfg2020/blob/master/doc/images/tfg-diagram.png)

Includes:
* **Failover IP**: If master node goes down failover IP will change to the slave node.
* **Redundant firewall**: Two pfSense firewall VM's. One in each node. In case that master goes down, the CARP virtual ip switches to the slave that takes the control till master comes back.
* **Redundant proxy**: Nginx webserver acting as proxy. Ideally this would be built on a docker swarm to grant HA.
* **Redundant webservers**: Final webservers.

In our case, since we just have one server node we will build both pfSense master and slave on node 1, using different interfaces.

Note that this is not the best solution, if we lose node 1 everything will go down. But unfortunately we just have 1 server for this project.

Anyways the only difference is that instead of having a second server we will have an extra ip and extra interface on Node 1 that will act like the second redundant node.

## Part 3. CI/CD pipeline for Django and Wordpress projects.
