---
binary: /root/.oldroot/nfs/install/installimage
boot_loader: grub
raid:
  active: 'yes'
  level: 1
disks:
  - nvme1n1 
  - nvme0n1
image: /root/.oldroot/nfs/images/Debian-103-buster-64-minimal.tar.gz
partitions:
  - /boot:ext4:512M
  - lvm:vg00:50G
  - lvm:vgsas:all
logical_volumes:
  - vg00:root:/:ext4:30G
  - vg00:swap:swap:swap:4G
  - vg00:tmp:/tmp:xfs:5G
  - vg00:home:/home:ext4:5G
  - vg00:var:/var:ext4:6G
format_second: 'no'
hostname: tfg.intelligenia.com 