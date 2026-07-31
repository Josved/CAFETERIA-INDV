# Práctica 21 - API móvil, Navigation Stack, Update y Delete

Aplicación móvil desarrollada con React Native, Expo SDK 54 y Expo Router. Se
conecta con una API FastAPI para completar el CRUD de usuarios almacenados en
PostgreSQL.

## Funciones implementadas

- Alta de usuarios mediante `POST`.
- Consulta de usuarios mediante `GET`.
- Opción **Ver detalle** en cada registro.
- Navegación Stack hacia las pantallas de detalle y actualización.
- Formulario de actualización con nombre y edad precargados.
- Actualización mediante `PUT` con autenticación básica.
- Modal de confirmación antes de eliminar.
- Eliminación mediante `DELETE` con autenticación básica.
- Actualización automática de la lista y el detalle al regresar.
- Estados de carga, lista vacía, validaciones y mensajes de error.

## Estructura

- `usuarioApi`: aplicación Expo.
- `miAPI`: API FastAPI y PostgreSQL mediante Docker Compose.
- `usuarioApi/services/usuariosApi.js`: cliente para consumir la API.
- `usuarioApi/screens`: pantallas de alta, consulta, detalle y actualización.

## 1. Configurar la dirección de la API

El teléfono y la computadora deben estar conectados a la misma red. Consulta la
IPv4 de la computadora con:

```powershell
ipconfig
```

Después crea o modifica `usuarioApi/.env.local`:

```text
EXPO_PUBLIC_API_URL=http://TU_IP:8001
```

No uses `localhost` al abrir la app desde un teléfono, porque en ese caso
`localhost` se refiere al propio dispositivo.

## 2. Ejecutar la API

Docker Desktop debe estar iniciado.

```powershell
cd miAPI
docker compose up -d --build
```

La documentación interactiva queda disponible en:

`http://localhost:8001/docs`

## 3. Ejecutar la aplicación

```powershell
cd usuarioApi
npm install
npm start
```

Escanea el código QR con Expo Go. También puedes presionar `w` para abrir la
versión web.

## Verificación

La aplicación compila con:

```powershell
cd usuarioApi
npx expo install --check
npx expo export --platform web
```

El flujo comprobado es:

1. Registrar un usuario.
2. Abrir la pestaña Consulta.
3. Presionar **Ver detalle**.
4. Entrar a **Actualizar**, modificar los datos y guardarlos.
5. Presionar **Eliminar**, cancelar una vez y después confirmar.
6. Comprobar que el registro desaparezca de la lista.

## Detener los contenedores

```powershell
cd miAPI
docker compose down
```
