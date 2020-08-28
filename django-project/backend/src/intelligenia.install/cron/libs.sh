#!/bin/bash

# ----------------------------------------------------------------------------
# ADQUIRIR LOCKFILE
# ----------------------------------------------------------------------------
# Adquiere el fichero de lock indicado como argumento. Si el fichero de lock
# está adquirido por otro proceso en ejecución, se finaliza el programa y
# se sale con código de error 255. Si se indica un nº de intentos, tras cada
# fallo en la adquisición del lock se hace una espera de 10 segundos y se
# reintenta, hasta agotar el nº de intentos
# 
# Parámetros
#  $1 - ruta al fichero de lock
#  $2 - número de intentos (por defecto 1 intento)
# ----------------------------------------------------------------------------
function lock_acquire() {
	local LOCKFILE=$1
	local TRIES=${2:-1}    # leer $2, si es vacío poner por defecto 1 intento

	local sleeptime=10

	while [ "$TRIES" -gt 0 ] ; do
		TRIES=$(( $TRIES - 1 ))
		if [ -e ${LOCKFILE} ] && kill -0 `cat ${LOCKFILE}`; then
			echo "Ya hay una instancia de este script en ejecución (pid `cat ${LOCKFILE}`)"

			if [ "$TRIES" -eq 0 ] ; then
				echo "Saliendo"
				exit 255
			else
				echo "Quedan ${TRIES} intentos para adquirir el lock, durmiendo ${sleeptime} segundos"
				sleep $sleeptime
			fi

		fi
	done

	# eliminar lockfile al salir o abortar
	trap "rm -f ${LOCKFILE}; exit" INT TERM EXIT
	echo $$ > ${LOCKFILE}
}


# ----------------------------------------------------------------------------
# LIBERAR LOCKFILE
# ----------------------------------------------------------------------------
# Elimina el fichero de lock indicado como argumento
#
# Parámetros
#  $1 - ruta al fichero de lock
# ----------------------------------------------------------------------------
function lock_release(){
	local LOCKFILE=$1

	rm -f ${LOCKFILE}
}


# ----------------------------------------------------------------------------
# DETERMINAR RUTAS A VIRTUALENV Y SETTINGS_LOCAL
# ----------------------------------------------------------------------------
# Encuentra rutas al virtualenv, intelligenia_local y activa virtualenv
#
# Parámetros:
#  ninguno
#
# Lee variables de entorno:
#  DIR      - Ruta a script actual. Puede contener enlaces simbólicos
#
# Modifica variables de entorno:
#  REALPATH   - Ruta a script actual sin enlaces simbólicos
#  VENVPATH   - Ruta a directorio 'venv'
#  INTELLIGENIALOCAL_PATH - Ruta a directorio 'intelligenia_local' o vacío
#  PYTHONPATH - Ruta a directorio padre de INTELLIGENIALOCAL_PATH
#  MANAGEPY   - Ruta a ejecutable 'manage.py'
#
# Otros efectos laterales:
#  Se activa el virtualenv
# ----------------------------------------------------------------------------
function setup_environment(){
	local pathtemp

	REALPATH=`realpath "${DIR}"`
	VENVPATH="$REALPATH/venv"
	INTELLIGENIALOCAL_PATH="$REALPATH/intelligenia_local"

	# Calcular ruta al 'venv'
	VENVPATHTEMP="$REALPATH"
	while ! [ -d "$VENVPATH" ] ; do
		VENVPATHTEMP=`realpath "$VENVPATHTEMP/.."`
		VENVPATH="$VENVPATHTEMP/venv"
		#echo $VENVPATH
	done

	# Calcular ruta a directorio 'intelligenia_local'
	INTELLIGENIALOCAL_PATH="$DIR/intelligenia_local"
	if ! [ -f "$DIR/settings.py" ]; then
		# Calcular ruta al directorio con el módulo 'intelligenia_local'
		pathtemp="$REALPATH"
		while ! [ -d "$INTELLIGENIALOCAL_PATH" ] ; do
			pathtemp=`realpath "$pathtemp/.."`
			INTELLIGENIALOCAL_PATH="$pathtemp/intelligenia_local"

			if [ -n "$DEBUG" ] ; then
				echo "INTELLIGENIALOCAL_PATH $INTELLIGENIALOCAL_PATH"
			fi

			if [ "$pathtemp" == "/" ] ; then
				INTELLIGENIALOCAL_PATH=""
				break
			fi
		done
	fi

	# Exportar PYTHONPATH si se ha encontrado el directorio 'intelligenia_local'
	if [ -n "INTELLIGENIALOCAL_PATH" ] ; then
		export PYTHONPATH=`realpath "$INTELLIGENIALOCAL_PATH/.."`
	fi

	# Calcular ruta a ejecutable 'manage.py'
	MANAGEPY="$DIR/manage.py"
	if ! [ -f "$MANAGEPY" ]; then
		# Calcular ruta al directorio con el ejecutable 'manage.py'
		pathtemp="$REALPATH"
		while ! [ -f "$MANAGEPY" ] ; do
			pathtemp=`realpath "$pathtemp/.."`
			MANAGEPY="$pathtemp/manage.py"
			if [ "$pathtemp" == "/" ] ; then
				MANAGEPY=""
				break
			fi
		done

		export MANAGEPY
	fi

	# Mostrar variables de entorno
	if [ -n "$DEBUG" ] ; then
		echo "DIR=${DIR}"
		echo "REALPATH=${REALPATH}"
		echo "PYTHONPATH=${PYTHONPATH}"
		echo "VENVPATH=${VENVPATH}"
		echo "MANAGEPY=${MANAGEPY}"
	fi

	# Si no hay 'manage.py', salir
	if [ -z "MANAGEPY" ] ; then
		echo "No se ha encontrado el ejecutable 'manage.py'"
		exit 255
	fi

	# Activar virtualenv
	source "$VENVPATH/bin/activate"
}


# ----------------------------------------------------------------------------
# EJECUTAR PAYLOAD EN BUCLE Y COMPROBAR RUTAS
# ----------------------------------------------------------------------------
# Ejecuta en bucle infinito la función o procedimiento pasado como primer 
# argumento. La función recalcula la ruta actual antes de volver a lanzar el
# payload para comprobar si las rutas han cambiado. En caso de que esto haya
# sucedido, se finaliza la ejecución del programa con código de salida 199.
#
# Variables de entorno utilizadas
#  $DIR      - Ruta al script actual, con enlaces simbólicos
#  $REALPATH - Ruta al script actual, sin enlaces simbólicos
#
# Parámetros
#  $1 - nombre de la función payload
#  $2 - tiempo de espera entre ejecuciones consecutivas (por defecto, 10s)
# ----------------------------------------------------------------------------
function loop_payload(){
	local PAYLOAD=$1
	local WAITTIME=$2

	if [ -z "$WAITTIME" ] ; then 
		WAITTIME=10
	fi

	# En currentpath se comprueba si ha cambiado el directorio enlazado por "current".
	# Si ha cambiado se sale y dejamos que cron lance una nueva instancia
	current_realpath=`realpath "${DIR}"`
	while [ "$current_realpath" == "$REALPATH" ] ; do
		# Ejecutar payload
		$PAYLOAD

		# Capturar salida de proceso mediante aborto por teclado (254) o
		# porque hay otra instancia en ejecución (255)  y terminar la ejecución de 
		# este script en esos casos
		status=$?
		if [ "$status" -eq 254 ] || [ "$status" -eq 255 ]; then
			exit 199
		fi
		
		# Dormir 10 segundos y repetir, recalculando directorio actual por si hubiera
		# cambiado con respecto a la ejecución anterior
		sleep $WAITTIME
		current_realpath=`realpath "${DIR}"`
	done

	if [ "$current_realpath" != "$REALPATH" ] ; then
		echo "La ruta a ${DIR} ha cambiado (ahora es ${current_realpath}). Se finaliza el script copicloud.sh"
	fi
}

# ----------------------------------------------------------------------------
# DEVUELVE NOMBRE DEL 'SITE' DONDE ESTÁ INSTALADO EL SCRIPT
# ----------------------------------------------------------------------------
# Devuelve el nombre del site donde está instalado el script. Para ello busca
# el patrón .../www-data/SITE/... dentro de la ruta indicada
#
# Variables de entorno utilizadas
#  $DIR      - Ruta al script actual, con enlaces simbólicos
#
# Parámetros
#  $1 - Ruta que se va a analizar
#  $2 - Si se define con cualquier valor, en la salida se reemplazan puntos
#       por caracteres de subrayado _
#
# Salida
#  imprime el nombre del site por STDOUT
# ----------------------------------------------------------------------------
function get_site_name(){
	local dirname=$1
	local site

	site=$( echo -n $dirname | sed 's@^.*www-data/@@ ; s@/.*$@@' )

	if [ -n "$2" ] ; then
		site=$( echo -n $site | sed 's@\.@_@g' )
	fi

	if [ -z "$site" ] ; then
		echo "desconocido"
	else
		echo $site
	fi
}

