# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "generic/openbsd6"
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.synced_folder './', '/vagrant'
  config.vm.provision "shell", inline: <<-SHELL
    pkg_add meson kcgi 
    # 
    cd /vagrant
    # 
    meson build 
    ninja -C build
    # 
    install -m 0555 build/link-store.cgi /var/www/cgi-bin/links.cgi
    # 
    install -m 644 httpd.conf /etc/httpd.conf
    rcctl enable httpd
    rcctl restart httpd
    rcctl enable slowcgi
    rcctl restart slowcgi
  SHELL
end

