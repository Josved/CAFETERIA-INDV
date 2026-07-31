const API_URL = (
  process.env.EXPO_PUBLIC_API_URL || 'http://10.51.72.17:8001'
).replace(/\/+$/, '');

const AUTHORIZATION =
  process.env.EXPO_PUBLIC_API_AUTH || 'Basic YWRtaW46MTIzNA==';

async function solicitar(ruta, opciones = {}) {
  let respuesta;

  try {
    respuesta = await fetch(`${API_URL}${ruta}`, opciones);
  } catch {
    throw new Error(
      'No se pudo conectar con la API. Verifica que Docker esté activo y que la URL corresponda a la IP de tu computadora.'
    );
  }

  const texto = await respuesta.text();
  let datos = {};

  if (texto) {
    try {
      datos = JSON.parse(texto);
    } catch {
      datos = { detail: texto };
    }
  }

  if (!respuesta.ok) {
    const detalle =
      typeof datos.detail === 'string'
        ? datos.detail
        : datos.message || 'La API no pudo completar la operación.';
    throw new Error(detalle);
  }

  return datos;
}

const encabezadosJson = {
  'Content-Type': 'application/json',
};

export async function obtenerUsuarios() {
  const datos = await solicitar('/v1/usuarios/');
  return Array.isArray(datos.usuarios) ? datos.usuarios : [];
}

export async function obtenerUsuario(id) {
  const datos = await solicitar(`/v1/usuarios/${id}`);
  return datos.usuario;
}

export async function crearUsuario(usuario) {
  return solicitar('/v1/usuarios/', {
    method: 'POST',
    headers: encabezadosJson,
    body: JSON.stringify(usuario),
  });
}

export async function actualizarUsuario(id, usuario) {
  return solicitar(`/v1/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      ...encabezadosJson,
      Authorization: AUTHORIZATION,
    },
    body: JSON.stringify(usuario),
  });
}

export async function eliminarUsuario(id) {
  return solicitar(`/v1/usuarios/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: AUTHORIZATION,
    },
  });
}

export { API_URL };
