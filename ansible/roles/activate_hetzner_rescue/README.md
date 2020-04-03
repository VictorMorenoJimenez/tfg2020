Activate Hetzner Rescue
=========

This role activates the rescue mode of a Hetzner server.

Requirements
------------

To run this Role you need:
- Hetzner Server
- Hetzner API user and password for the server

Role Variables
--------------

There is no need to change rescue_url or hardware_reset_url.

- **server_ip**: server ip
- hetzner:
    - **user**: API user
    - **password**: API password
    - **rescue_url**: "https://robot-ws.your-server.de/boot/{{ server_ip }}/- rescue"
    - **fingerprint**: Fingerprint on Hetzner control panel. For the public key you want to deploy to the server.
    - **hardware_reset_url**: "https://robot-ws.your-server.de/reset/{{ server_ip }}"


Example Playbook
----------------
You can run this role with a simple playbook.
Remember to fill the vars/main.yml with the role variables.

It's recommended to run this playbook on localhost since it will make son POST requests to the Hetzner API. No need to run on remote server.

```yml
    - hosts: 127.0.0.1
      connection: local
      gather_facts: false
      roles:
         - activate_hetzner_rescue
```
License
-------

BSD

Author Information
------------------

Víctor Moreno Jiménez. victormoreno@correo.ugr.es
