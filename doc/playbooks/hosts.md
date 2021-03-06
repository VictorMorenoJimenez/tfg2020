## Host file 
If you want to deploy all services availables on cluster your hosts file should look like this:

```yml
---
all:
    hosts:
    children:
        "Part 1 configuration"
        .
        .
        .

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


        kubernetes:
            hosts:
                k8_master:
                    ansible_host: 10.6.100.20
                    ansible_user: user 
                    vm_hostname: k8-master  
                k8_node_01:
                    ansible_host: 10.6.100.21
                    ansible_user: user 
                    vm_hostname: k8-node-01 
                k8_node_02:
                    ansible_host: 10.6.100.22
                    ansible_user: user 
                    vm_hostname: k8-node-02 
                k8_node_03:
                    ansible_host: 10.6.100.23
                    ansible_user: user 
                    vm_hostname: k8-node-03 

        k8_workers:
            hosts:
                k8_node_01:
                k8_node_02:
                k8_node_03:


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
        
        ceph_nodes:
            hosts:
                ceph_node_01:
                ceph_node_02:
                ceph_node_03:
                    
                    
        webproxy:
            hosts:
                webproxy-01:
                    ansible_host: 10.6.100.1
                    ansible_user: user 
                    vm_hostname: webproxy   

        docker_swarm:
            hosts:
                docker_swarm_01:
                    ansible_host: 10.6.100.40
                    ansible_user: user 
                    vm_hostname: docker-swarm-01    
                docker_swarm_02:
                    ansible_host: 10.6.100.41
                    ansible_user: user
                    vm_hostname: docker-swarm-02
                docker_swarm_03: 
                    ansible_host: 10.6.100.42
                    ansible_user: user 
                    vm_hostname: docker-swarm-03
        swarm_manager:
            hosts:
                docker_swarm_01:
        swarm_nodes:
            hosts:
                docker_swarm_02:
                docker_swarm_03:

        gitlab_server:
            hosts:
                gitlab:
                    ansible_host: 10.6.100.50
                    ansible_user: user
                    vm_hostname: gitlab
                gitlab_runner:
                    ansible_host: 10.6.100.51
                    ansible_user: user 
                    vm_hostname: gitlab-runner

        monitors:
            hosts:
                icinga2:
                    ansible_host: 10.6.100.60
                    ansible_user: user
                    vm_hostname: icinga2

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

        brokers:
            hosts:
                rabbitmq-01:
                    ansible_host: 10.6.100.80
                    ansible_user: user
                    vm_hostname: rabbitmq-01

        virtualmingroup:
            hosts:
                virtualmin:
                    ansible_host: 10.6.100.90
                    ansible_user: user 
                    vm_hostname: virtualmin


```