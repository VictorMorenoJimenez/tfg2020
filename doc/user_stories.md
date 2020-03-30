# User Stories

The purpose of this document is to make a description of the functionalities that the system must incorporate, describing each functionality that you want to carry out.


## Problem Description.

My company has been developing software since 2008.

There are currently two different teams in the company. The Operations or Systems team and the Software Development team.
Every time that a developer wants to upload changes to a project, it must first go through the operations team that runs a series
scripts and deploys the new version.
There is no type of continuous integration or continuous delivery channel. Software development is slower since many times
it is necessary to debug the errors once the version is uploaded to the server and each upload to the servers requires the attention of the systems department,
taking away time to other maintenance or improvement tasks.

For this reason, it has been decided to adopt a more DevOps vision, implementing a Continuous Integration and Continuous Delivery channel.

## Continuous integration

Continuous integration is a way to develop software to be able to detect faults as soon as possible.
Integration consists of compiling and running tests on a project.

Continuous integration helps us with:
- Developers can detect faults or bugs quickly.
- Constant availability of a demo version or tests to show the client.
- Immediate execution of unit tests.
- Continuous monitoring of project metrics.

### Developers

- As a developer I can ask to build a infrastructure on demand for software development.
- As a developer I can push any branch to the server without the Ops team.
- As a developer I know exacly the environment in wich the app is deployed.
- As a developer you can have a test environment for a new project in less than 1 hour.
- As a developer I have feedback after every upload of the result.
- As a developer I know the impact that the application has on the system.
- As a developer I know the configuration files on which the application depends.


### Systems administrator

The other side of the coin in the process is system administrators or sysadmins.

## First part
- As a system administrator I can activate the rescue system of a server at any time.
- As a system administrator I can install desired packages to a desired server.
- As a system administrator I can install proxmox to a desired server.

- As a system administrator I can configure a new server (bare metal) automatically with an IaC configuration file.
- As a system administrator I can deploy a virtualization system on a configured server through a configuration file.
- As a system administrator I can deploy a basic firewall-proxy-webserver infrastructure on a given virtualization system through a configuration file.
- As a system administrator I can deploy virtual machines on the infrastructure through a configuration file.
- As a system administrator I can provision virtual machines through a configuration file so that updating them is relatively easy.
