#!/bin/bash

##  Install
# sudo apt install netcat
# sudo apt-get install jq

swagger_filename="frontend/swagger/swagger-api.json"
swagger_download_uri="http://localhost:8000/swagger.json"

[[ -f $swagger_filename ]] || { echo "Error: debe usar este script desde el directorio que contiene a todos los proyectos" && exit -1 ; }
nc -z localhost 8000 || { echo "Error: debe arrancar el contenedor backend" && exit -1; }

current_version=$(cat $swagger_filename | jq -r .info.version)
echo "La version actual de $swagger_filename es '$current_version'"

new_version=$( echo ${current_version} | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g' )

echo "Descargando nueva versión desde $swagger_download_uri ..."
output=$(curl -s $swagger_download_uri | jq ".info.version=\"$new_version\"" )
echo ${output} | jq '.' > $swagger_filename
