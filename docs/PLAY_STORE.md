# Publicación en Google Play

El proyecto Android está en `android/` y usa el identificador permanente `com.esteban.calculadoradiaslibres`. No cambies ese identificador después de publicar la primera versión.

## 1. Preparar el proyecto

1. Instala Android Studio y el Android SDK 36.
2. Ejecuta `npm install` y `npm run android:sync`.
3. Ejecuta `npm run android:open`.
4. Desde Android Studio, prueba la app en al menos un teléfono o emulador.

## 2. Personalizar la ficha

Antes de publicar, reemplaza los iconos generados en `android/app/src/main/res/mipmap-*` mediante **Image Asset** de Android Studio. Prepara también:

- Icono de la tienda PNG de 512 × 512 px.
- Imagen destacada de 1024 × 500 px.
- Al menos dos capturas de pantalla de teléfono.
- Descripción corta y descripción completa en español.
- Correo de soporte y URL de política de privacidad.

La app no solicita cámara, ubicación, micrófono, contactos ni almacenamiento. El estado y el historial se guardan únicamente en el dispositivo mediante almacenamiento local.

## 3. Crear el paquete firmado

En Android Studio abre **Build > Generate Signed Bundle / APK**, elige **Android App Bundle**, crea o selecciona una clave de firma y genera la variante `release`.

Guarda la clave y sus contraseñas en un lugar seguro fuera del repositorio. Sin esa clave no podrás publicar actualizaciones si no utilizas Play App Signing.

El archivo generado normalmente queda en:

`android/app/release/app-release.aab`

## 4. Subir a Play Console

1. Crea la aplicación en Google Play Console.
2. Completa la ficha de la tienda y la sección **Seguridad de los datos**.
3. Declara que los datos de historial permanecen en el dispositivo y no se comparten.
4. Configura Play App Signing.
5. Sube el AAB primero a **Prueba interna**.
6. Instala la versión desde Play Store, comprueba el cálculo, tema oscuro, historial y funcionamiento sin conexión.
7. Cuando la prueba sea correcta, promueve la versión a producción y envíala a revisión.

Para cada actualización aumenta `versionCode` y ajusta `versionName` en `android/app/build.gradle`, luego vuelve a ejecutar `npm run android:sync` antes de generar el nuevo AAB.
