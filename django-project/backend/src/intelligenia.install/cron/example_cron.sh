#!/bin/bash

# Carga de bibliotecas
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $DIR/libs.sh

# Nombre de la instalación
SITE=$(get_site_name $DIR 1)

# Fichero de lock para este proceso
LOCKFILE="/tmp/${SITE}.expire_sales.lock"
LOG="/tmp/${SITE}.cron.log"

# Función con payload que realiza el trabajo de este script de cron
function payload(){
	local cmd
	cmd="python "$MANAGEPY" my_cron_method"
	#echo $cmd
	$cmd
}

# Adquirir lock, inicializar y ejecutar
lock_acquire $LOCKFILE 3
setup_environment

date -R >> "$LOG"
echo "Site: $SITE" >> "$LOG"
payload | tee -a "$LOG"

lock_release $LOCKFILE
