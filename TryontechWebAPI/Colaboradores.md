
# Instrucciones para la configuración del proyecto TryontechWebAPI
Creen un archivo llamado appsettings.Development.json en la carpeta raíz o sea (TryontechWebAPI) del proyecto y copien el siguiente contenido en el archivo. 
Asegúrense de cambiar el nombre del servidor por el nombre de su servidor SQL Server. 
```json
{
   "ConnectionStrings": {
    "DefaultConnection": "Server="{NombreDelServidor}";Database=DBTryOnTech;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```
Pasos para crear el archivo 

1. Hacer clic derecho en la carpeta raíz del proyecto (TryontechWebAPI).
2. Seleccionar "Agregar" y luego "Nuevo elemento...".
3. En la ventana que aparece, seleccionar "Archivo JSON" y nombrarlo como "appsettings.Development.json".
4. Copiar el contenido proporcionado anteriormente en el nuevo archivo.
5. Asegurarse de reemplazar `{NombreDelServidor}` con el nombre real de su servidor SQL Server.
6. Guardar el archivo.
