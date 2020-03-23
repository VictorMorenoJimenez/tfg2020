# Activate rescue playbook
This playbook is responsible for activate the rescue shell on a Hetzner server.
This playbook needs a vault with some sensible data (ansible vars) for the role [activate_rescue](https://github.com/VictorMorenoJimenez/tfg2020/tree/master/doc/role/activate_rescue.md). It's explained on the role docs.

The playbook simply calls one role:

```yml
---
- hosts: localhost 
  gather_facts: false
  roles:
      - activate_rescue 
```

Notice that the host now is **localhost** because we will activate the rescue mode with the [Hetzner server API](https://robot.your-server.de/doc/webservice/en.html#preface).