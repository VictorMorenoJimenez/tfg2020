# Create users role

Create bash users. 
Feel free to change the name users or add more users as needed.

```yml
---

- name: Create user mario
  user:
    name: mario
    password: "{{ user_passwords.mario }}"
    groups:
      - sudo
    create_home: yes
    shell: /bin/bash
    comment: User mario, must be on every server
    state: present

- name: Change password to root and generate ssh keys
  user:
    name: root
    generate_ssh_key: yes
    ssh_key_bits: 4096
    ssh_key_file: "/root/.ssh/id_rsa"
    password: "{{ user_passwords.root }}"
```

This role needs a vars/main.yml file with the next structure:

You can create this file with **ansible-vault**:

```bash
ansible-vault create roles/create_users/vars/main.yml --vault-pass=.vault_pass.txt
```

With the password string in the file **.vault_pass.txt**.



```yml
user_passwords:
  mario: encryptedpassword
  root: encryptedpassword.
```

