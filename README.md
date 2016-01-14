# link-store
A Place To Store Links

    curl -F 'url=https://duckduckgo.com/' https://port22.co.uk/links

Bash shorthand create **~/plink.sh**:

    #!/bin/bash
    curl -F "url=$1" https://port22.co.uk/links

Add an alias to your **~/.bashrc**

    alias plink='sh ~/Dropbox/plink.sh'

Now you can add links by running: 

    plink https://matrix.ac