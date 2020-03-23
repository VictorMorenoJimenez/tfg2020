# Configure server playbook
This is the master playbook that holds 3 sub-playbooks in order to configure the Hetzner server:

```yml
---
- import_playbook: activate_rescue.yml
- import_playbook: install_hetzner_image.yml
- import_playbook: common_steps.yml
```

As you can see simply calls the other 3 subplaybooks. You can run this playbook from the ansible folder:

```bash
ansible-playbook playbooks/configure_server.yml --vault-pass=.vault_pass.txt --extra-vars="target=host_ip"
```

Notice that we need some extra configuration:

* **--extra-vars**: It's used to add extra vars on the command line to the playbook, in our case with give value to the var target.
                Just add the host_ip on that var.
* **--vault-pass**: In order to store sensible data as passwords, we use [ansible-vault](https://docs.ansible.com/ansible/latest/user_guide/vault.html). Briefly vault encrypts files with sensible data. Learn more on [docs](https://docs.ansible.com/ansible/latest/user_guide/vault.html). When you create an ansible-vault file you are asked for a password. In order to make it easier we store the password on a hidden file in the ansible folder, in our case its **.vault_pass.txt** you have to include the password string.

## Sub playbooks
* [activate_rescue](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/activate_rescue.md)
* [common_steps](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/common_steps.md)
* [install_hetzner_image](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/playbooks/install_hetzner_image.md)