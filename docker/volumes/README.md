## Volumen Tips

```
# Se puede usar alguno de estos 2 comandos para crear el volumen con etiqueta
docker run --rm -v PROYECTO:/data busybox true
# O
docker volume create PROYECTO

# Hacemos una conexion con samba hacia el volumen
docker run --rm --name samba -d -it --net=host -e USERID=0 -e GROUPID=0 \
  -v PROYECTO:/data \
  -v OTHER:/data2 \
  dperson/samba \
  -s "PROYECTO;/data;yes;no" \
  -s "OTHER;/data2;yes;no"

# Ahora creamos un contenedor para el proyecto y alli todo lo q se necesite para desarrollar
docker run --rm -ti -v PROYECTO:/data alpine sh

# Y para acceder desde windows en el explorador de archivos buscamos la ruta
\\192.168.99.100
```
