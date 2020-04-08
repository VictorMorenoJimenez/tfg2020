Manage users
=========

Role for managing Linux and Proxmox VE users.

Requirements
------------
A server with a Debian distro installed.
If you want to use the Proxmox ad users tasks Proxmox installed is required. See [install proxmox](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/ansible/roles/install_proxmox) role.

Role Variables
--------------
Each task depends on its variables to be executed.
If the vars are not defined, the task will not run.

- Task: create_user
- Vars:
    - **users**: List to users to add.
      - Example:
    ```yml
    users:
    - name: foo
        username: foo
        uid: 1100
        password: "{{ foo_password }}"
        comment: foo
        home: yes
        update_password: on_create
        generate_ssh_key: yes
        shell: /bin/bash
        groups: [sudo,www-data]
        user_state: present
     ```
    - **foo_password**: On a encrypted vault, you need to define
    the password of the user encrypted with SHA-512.
    You can generate a password with: ``` mkpasswd --method=SHA-512```
    - **create_groups**: List of groups to create.
    - **pve_users**: List of PVE users to create. You will need to create an encrypted vault again because it contains passwords.
    You can create a vault with: ```ansible-vault create secrets.yml```
      - Example:
        ```yml
           pve_users:
            - name: root@pam
              username: root
              password: foo
            - name: foo@pam
              username: foo
              password: foopassword
            - name: foo2@pam
              username: foo2
              password: foo2password
        ```
- Task: remove_user
- Vars:
    - **remove_users**: List of users to remove (Not working for PVE users)


Example Playbook
----------------

If the vars above are defined, you just need to call the role to execute all the tasks. It will only run the tasks with the defined vars.
```yml
    - hosts: servers
      roles:
         - manage_users
```

License
-------

BSD

Author Information
------------------

Víctor Moreno Jiménez. victormoreno@correo.ugr.es
