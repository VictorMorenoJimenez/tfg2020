[![Build Status](https://travis-ci.org/VictorMorenoJimenez/tfg2020.svg?branch=master)](https://travis-ci.org/VictorMorenoJimenez/tfg2020)
# Final Degree Project.
The purpose of this repository is to host the end of degree project in Computer Engineering from the Higher School of Informatics and Telecommunications of Granada.

The main objective of this work can be divided into different parts.

- Automate everything related to infrastructure of a company using Ansible playbooks.

- Implement CI/CD for a company that develops Django projects.

Anyway, to make this repository more readable, it will be divided into three blocks that are explained below.

## Part 1. Automatic server provisioning and deployment with Ansible Playbooks.

Summarizing this part, configure a Hetzner server from scratch, 
installing and configuring the virtualization service proxmox. For more detail follow the links below.

### Playbooks:
* [configure_proxmox_node](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/configure_proxmox_node.md)

### How to

* Activate rescue mode on the nodes on Hetzner panel.
* Create your `hosts.yml` file. As an example if you want to execute first part of the project a `hosts.yml` file should look like:

```yml
---
all:
    hosts:
    children:
        proxmox_master:
            hosts:
                node1.yourdomain.com:
                    ansible_host: node1.yourdomain.com 
                    ansible_user: root
                    node: node1
        proxmox_slave:
            hosts:
                node2.yourdomain.com:
                    ansible_host: node2.yourdomain.com 
                    ansible_user: root
                    node: node2
        proxmox_nodes:
            hosts:
                node3.yourdomain.com:
                    ansible_host: node3.yourdomain.com  
                    ansible_user: root
                    node: node3
        proxmox:
            hosts:
                node1.yourdomain.com:
                node2.yourdomain.com:
                node3.yourdomain.com:
```

* Make sure that `Makefile` is pointing to correct hosts.yml file.

* Configure playbook vars. At the beggining of the playbook there are a few vars you must fill.

* Execute playbook. With TAGS var you can choose wich parts of the playbook execute, in case you don't want to execute everything.

```bash 
    make PLAYBOOK=configure_proxmox_nodes TAGS=all playbook
```

* Finally, you can access proxmox control panel through https://nodeX.domain.com:8006



## Part 2. Automatic services deployment with Ansible Playbooks

If Part 1 is completed, we should have:

* Hetzner Server provisioned with some packages and Debian 10 installed.
* [Proxmox](https://www.proxmox.com/en/)

This second part includes:

* Creation and provisioning of different types of VM's.
* Creation of LAN infrastructure.

Ideally the infrastructure should look like:

[Redundant infrastructure](https://github.com/VictorMorenoJimenez/tfg2020/blob/master/doc/images/tfg-diagram.png)

Includes:
* **Failover IP**: If master node goes down failover IP will change to the slave node.
* **Redundant firewall**: Two pfSense firewall VM's. One in each node. In case that master goes down, the CARP virtual ip switches to the slave that takes the control till master comes back.


### Playbooks:
* [deploy_pfsense_firewall.yml](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/deploy_pfsense_firewall.md)
* [create_gitlab.yml](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/create_gitlab.md)
* [create_ceph_cluster.yml](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/create_ceph_cluster.md)
* [create_virtualmin.yml](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/create_virtualmin.md)
* [create_webproxy.yml](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/create_webproxy.md)
* [create_icinga2.yml](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/create_icinga2.md)
* [create_galera_cluster.yml](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/create_galera_cluster.md)
* [create_rabbitmq.yml](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/create_rabbitmq.md)
* [create_swarm_cluster.yml](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/create_swarm_cluster.md)
* [create_kubernetes_cluster.yml](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/create_kubernetes_cluster.md)


### How to

This part includes the deployment of many services on the Proxmox cluster. You may want to deploy all of some of them. Each service is managed by an Ansible playbook and has a role associated. Check each playbook doc to learn how to deploy each service.

* Configure `hosts.yml` file. You must add one entry per each service you want to deploy. For example, if we want to deploy all services our hosts file should look like [hosts file](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/hosts.md).




## Part 3. CI/CD pipeline for Django project.

### Dockerize app
This project is for Django + Angular application. Check [dockerize app](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/app/dockerize.md) to learn how to dockerize a Django + Angular app.

### Gitlab CI.
Thanks to the deployment of servies of part 2, we have GitLab on our cluster and we are going to configure it in order to create CI/CD pipelines. Check [gitlab ci](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/app/ci-cd.md) to learn how to create CI/CD pipelines for a containerized app.


