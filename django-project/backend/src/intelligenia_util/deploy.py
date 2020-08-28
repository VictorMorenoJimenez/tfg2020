# -*- coding: utf-8 -*-

"""
Módulo con funciones utilizadas en el proceso y/o sistema de despliegue
"""
from subprocess import CalledProcessError

import os
import subprocess
import re
import sys
import importlib
import types


def revfile():
	"""
	Construye la ruta esperada para el fichero "revision"
	:return: str  ruta
	"""
	revpath = os.path.join(get_install_dir(), 'revision')
	return revpath


def revfile_mtime():
	"""
	Devuelve el mtime del fichero "revision"
	:return: None | int  mtime
	"""
	revpath = revfile()
	mtime = None

	if os.path.exists(revpath):
		mtime = os.path.getmtime(revfile())

	return mtime


def get_revision(debug=False):
	"""
	Lee el fichero "revision" y devuelve su valor.

	Este fichero contiene el nº de versión que se ha exportado en explotación
	El fichero debe estar en la ruta relativa con respecto a este fichero
	../../../revision
	:return: (str | None) cadena con la versión o None
	"""

	revision = None
	revpath = revfile()

	if is_production():
		if os.path.exists(revpath):
			try:
				with open(revpath, 'r') as f:
					revision = f.readline()

				revision = revision[:-1] if revision.endswith('\n') else revision
			except (IndexError, IOError):
				pass

		if revision:
			if debug:
				sys.stderr.write("Detectada revision {0}".format(revision))
		else:
			if debug:
				sys.stderr.write("No se ha detectado numero de revision".format(revision))
	else:
		if debug:
			sys.stderr.write("No se usa numero de revision en sistema de desarrollo".format(revision))

	return revision


def get_version():
	"""
	Devuelve la versión actual del código, leyendo el contenido del fichero revision o el id de commit de git actual
	:return: str | None  cadena con el hash de commit
	"""
	version = get_revision()
	print(revfile())

	if version:
		# si existe el fichero "revision", añadirle al nº de versión el mtime por si se ha forzado una recarga mediante touch
		# de dicho fichero
		version += "." + str(revfile_mtime())

	else:
		# Obtener versión desde git
		try:
			version = subprocess.check_output(['git', 'rev-parse', 'HEAD'])
			version = version.decode('utf-8').rstrip()
		except subprocess.CalledProcessError:
			version = None

	return version


def apply_intelligenia_settings_local(debug=False):
	"""
		Sobrescribe valores definidos en el módulo intelligenia_settings con todos aquellos que estén
		definidos en el módulo intelligenia_settings_local.

		Si falla la carga del módulo intelligenia_settings_local no hace nada.

		Normalmente este método se invocará desde settings.py de la siguiente manera:

			from intelligenia_util import deploy
			import intelligenia_settings
			deploy.apply_intelligenia_settings_local()

		Estas líneas deben estar al principio del fichero, antes de acceder a cualquier miembro del
		módulo intelligenia_settings
	"""

	# Cargar el módulo intelligenia_settings para poder sobrescribir sus definiciones
	try:
		package = os.environ.get("DJANGO_SETTINGS_MODULE").split(".")[0]
		intelligenia_settings = importlib.import_module(package + ".intelligenia_settings")
	except ImportError:
		if debug:
			sys.stderr.write("No se ha podido cargar el modulo intelligenia_settings")
		return

	# Sobrescribir definiciones del módulo intelligenia_settings con las que haya en en módulo
	# intelligenia_settings_local.intelligenia_local
	try:
		# Si el módulo no existe, se lanza la excepción ImportError y no se hace nada
		from intelligenia_local import intelligenia_settings_local

		if debug:
			sys.stderr.write("Aplicando definiciones locales en la configuracion")

		for i in dir(intelligenia_settings_local):
			if i.startswith("__"):
				continue

			if type(getattr(intelligenia_settings_local, i)) is types.ModuleType:
				continue

			if not hasattr(intelligenia_settings, i):
				if debug:
					sys.stderr.write("AVISO: intelligenia_settings no tiene el atributo {0}".format(i))
				continue

			try:
				v = getattr(intelligenia_settings_local, i)
				setattr(intelligenia_settings, i, v)
				if debug:
					sys.stderr.write("Aplicada configuracion local: {0}\t\t{1}".format(i, v))
			except Exception as e:
				print(e)
				pass

	except ImportError:
		if debug:
			sys.stderr.write("No se ha podido cargar el modulo intelligenia_local.intelligenia_settings_local")
		return


def get_media_root(debug=False):
	"""
	Obtiene el valor para MEDIA_ROOT apropiado, teniendo en cuenta si se trata de un sistema en explotación
	o de un sistema para desarrollo. En un sistema en explotación, el directorio MEDIA_ROOT quedará fuera
	del directorio exportado, para evitar que se pierdan datos al desplegar nuevas versiones.

	Normalmente este método se invocará desde settings.py de la siguiente manera:

		from intelligenia_util import deploy
		...
		...
		MEDIA_ROOT = deploy.get_media_root()
		...

	:param debug: (Boolean) Flag para indicar si se muestra mensajes de depuración
	:return: (str)  Ruta
	"""

	media_root = get_install_dir(debug=False) + "/media"
	if debug:
		sys.stderr.write("MEDIA_ROOT     = {0}".format(media_root))

	return media_root


def get_install_dir(debug=False):
	"""
	Obtiene la ruta absoluta al directorio donde está instalado el proyecto, Será el directorio que
	contenga "versions/" y otros en el sistema en producción o el directorio "src/" en un sistema de desarrollo

	:param debug: (Boolean) Flag para indicar si se muestra mensajes de depuración
	:return: (str)  Ruta
	"""

	# En el entorno de producción, determinar la ruta de instalación a partir de la ruta del módulo
	# "intelligenia_local"
	if is_production(debug=False):
		try:
			intelligenia_local = importlib.import_module("intelligenia_local")
		except ImportError:
			if debug:
				sys.stderr.write("No se ha podido cargar el modulo intelligenia_local")
			return

		install_dir = os.path.dirname(os.path.dirname(intelligenia_local.__file__))

	# En el entorno de desarrollo, usar la ruta de este propio archivo
	else:
		current_path = os.path.dirname(__file__)
		dev_path = os.path.dirname(os.path.dirname(os.path.join(current_path, "..")))
		install_dir = dev_path

	if debug:
		sys.stderr.write("INSTALL_DIR    = {0}".format(install_dir))
	return install_dir


def get_deployment_dir(debug=False):
	"""
	Obtiene la ruta absoluta al directorio que contiene la versión desplegada o de desarrollo

	Para sistemas en explotación:
		Si existe el fichero "INSTALL_DIR/target", es que se acaba de completar una exportación
		y el enlace "INSTALL_DIR/current" aún no apunta al sitio adecuado, y se usa la ruta almacenada
		en el fichero 'target'. En otro caso se usa la ruta a la que apunta el enlace current

	Para sistemas de desarrollo:
		La ruta coincide con la de instalación

	:param debug: (Boolean) Flag para indicar si se muestra mensajes de depuración
	:return: (str)  Ruta
	"""

	if is_production(debug=False):
		try:
			with open(get_install_dir() + "/target", 'r') as t:
				deployed_dir = t.readline()
			if debug:
				sys.stderr.write("DEPLOYMENT_DIR = {0} [despliegue en proceso]".format(deployed_dir))
		except IOError:
			deployed_dir = get_install_dir() + '/current'
			if debug:
				sys.stderr.write("DEPLOYMENT_DIR = {0} -> {1} [despliegue completo]".format(deployed_dir, os.path.realpath(deployed_dir)))
	else:
		deployed_dir = get_install_dir()
		if debug:
			sys.stderr.write("DEPLOYMENT_DIR = {0}".format(deployed_dir))

	return deployed_dir


def is_production(debug=False):
	"""
	Devuelve True si se detecta que es la instalación de producción o False en caso contrario.
	Puede utilizarse para usar una configuracion personalizada según el entorno detectado, por
	ejemplo, en settings.py:

		from intelligenia_util import deploy
		...
		...
		DEBUG = not deploy.is_production()

	:param debug: (Boolean) Flag para indicar si se muestra mensajes de depuración
	"""

	try:
		intelligenia_local = importlib.import_module("intelligenia_local")
	except ImportError:
		if debug:
			sys.stderr.write("No se ha podido cargar el modulo intelligenia_local")
		return

	test_dir = os.path.dirname(os.path.dirname(intelligenia_local.__file__))

	if os.path.isdir(os.path.join(test_dir, "versions")) and os.path.isfile(os.path.join(test_dir, "export.conf")):
		if debug:
			sys.stderr.write("Detectado entorno de producción")
		return True
	else:
		if debug:
			sys.stderr.write("Detectado entorno de desarrollo")
		return False


def is_development(debug=False):
	"""
	Devuelve True si se detecta que es un sistema de desarrollo o False en caso contrario
	Puede utilizarse para usar una configuracion personalizada según el entorno detectado, por
	ejemplo, en settings.py:

		from intelligenia_util import deploy
		...
		...
		DEBUG = deploy.is_development()

	:param debug: (Boolean) Flag para indicar si se muestra mensajes de depuración
	"""

	return not is_production(debug)


def get_domainname_from_path(debug=False):
	"""
	Devuelve el nombre de dominio, usando el basename de la ruta de instalación. Si la cadena obtenida no se parece a un
	nombre de dominio, devuelve None. El nombre de dominio debe ser un FQDN

	:param debug: (Boolean) Flag para indicar si se muestra mensajes de depuración
	:return: (str | None) cadena con el nombre de dominio o None
	"""

	if is_development():
		if debug:
			sys.stderr.write("No se autodectecta nombre de dominio en sistema de desarrollo")
		return None

	basename = os.path.basename(get_install_dir())
	allowed = re.compile("(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$)", re.IGNORECASE)

	if allowed.match(basename):
		if debug:
			sys.stderr.write("Nombre de dominio: '{0}'".format(basename))
		return basename
	else:
		basename = os.path.basename(os.path.dirname(get_install_dir()+".."))
		if allowed.match(basename):
			if debug:
				sys.stderr.write("Nombre de dominio: '{0}'".format(basename))
			return basename
		else:
			if debug:
				sys.stderr.write("No se ha detectado nombre de dominio")
			return None


def file_exists_in_install_dir(filename):
	"""
	Devuelve True o False dependiendo de si un determinado fichero se puede encontrar a partir de la ruta de instalación
	:param filename: (str) ruta al fichero a partir del directorio de instalación
	:return: (boolean) True si el fichero existe o False en caso contrario
	"""

	return os.path.exists(os.path.join(get_install_dir(), filename))


# ------------------------------------------------------------------------
# Inicialización de constantes
# ------------------------------------------------------------------------

# Estas variables almacenan el resultado de los diferentes métodos. Todos los métodos son estables para una determinada
# ejecución, por lo que los valores devueltos siempre serán los mismos y se pueden considerar constantes

SHOW_DEBUG_INFO = True

if SHOW_DEBUG_INFO:
	print("------- info instalacion (deploy.py) ----------------------------------")

# Flags
IS_DEVELOPMENT = is_development(debug=SHOW_DEBUG_INFO)
IS_PRODUCTION = is_production()

# Rutas
INSTALL_DIR = get_install_dir(debug=SHOW_DEBUG_INFO)
DEPLOYMENT_DIR = get_deployment_dir(debug=SHOW_DEBUG_INFO)
MEDIA_ROOT = get_media_root(debug=SHOW_DEBUG_INFO)

# Otras constantes
REVISION = get_revision(debug=SHOW_DEBUG_INFO)
DOMAIN_NAME = get_domainname_from_path(debug=SHOW_DEBUG_INFO)

if SHOW_DEBUG_INFO:
	print("-----------------------------------------------------------------------")