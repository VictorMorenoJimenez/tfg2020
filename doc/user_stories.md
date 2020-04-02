# User Stories

The purpose of this document is to make a description of the functionalities that the system must incorporate, describing each functionality that you want to carry out.


## Problem Description.

My company has been developing software since 2008.

There are currently two different teams in the company. The Operations or Systems team and the Software Development team.
Every time that a **developer** wants to upload changes to a project, it must first go through the **operations team** that runs a series
scripts and deploys the new version.

There is no type of continuous integration or continuous delivery channel. Software development is slower since many times
it is necessary to debug the errors once the version is uploaded to the server and each upload to the servers requires the attention of the systems department, taking away time to other maintenance or improvement tasks.

Also, when a new servers needs to be added to the cluster, the operation teams must follow a series of "recipes" and execute a bunch of scripts in order to deploy and add the new server.
This can lead to missconfigurations and human mistakes.

For this reason, it has been decided to adopt a more DevOps vision, implementing a Continuous Integration and Continuous Delivery channel for software development and adopting a new way of deploying infrastructure: **Infrastructure as Code**.

Here we will describe the user stories of each part of the project:

## Systems administrator

### First part :: Configure new server from bare metal.

1. [X] 1. As a **system administrator** I can configure a new server (bare metal) automatically with an IaC configuration file.
2. [X] As a **system administrator** I can activate the rescue system of a server at any time with an automated task.
3. [X] As a **system administrator** I can install desired packages to a desired server with an automated task.
4. [X] As a **system administrator** I can install proxmox to a desired server with an automated task.
5. [ ] As a **system administrator** I can add a new server to the cluster with an automated task.


### Second part :: Provisioning and deployment of VM

1. [ ] As a **system administrator** I can deploy a virtualization system on a configured server through a configuration file.
2. [ ] As a **system administrator** I can deploy a basic firewall-proxy-webserver infrastructure on a given virtualization system through a configuration file.
3. [ ] As a **system administrator** I can deploy virtual machines on the infrastructure through a configuration file.
4. [ ] As a **system administrator** I can provision virtual machines through a configuration file so that updating them is relatively easy.

### 3rd part :: Continuous integration

1. [ ] As a **developer** I can ask to build a infrastructure on demand for software development.
2. [ ] As a **developer** I can push any branch to the server without the Ops team.
3. [ ] As a **developer** I know exacly the environment in wich the app is deployed.
4. [ ] As a **developer** you can have a test environment for a new project in less than 1 hour.
5. [ ] As a **developer** I have feedback after every upload of the result.
6. [ ] As a **developer** I know the impact that the application has on the system.
7. [ ] As a **developer** I know the configuration files on which the application depends.