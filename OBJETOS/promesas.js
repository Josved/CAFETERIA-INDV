let promesa = new Promise((resolve, reject) => {
    const saleBien = true;
    if (saleBien) {
        resolve("La tarea se completó correctamente");
    } else {
        reject("Ocurrió un error");
    }
});

promesa.then((resultado) => {
    console.log(resultado);
});


promesa.catch((error) => {
    console.log(error);
});

promesa.finally(() => {
    console.log("Proceso terminado");
});



function prepararCafe(hayCafe, hayAgua, hayAzucar) {
    return new Promise((resolve, reject) => {
        console.log("Iniciando preparación del café...");

        setTimeout(() => {
            if (!hayCafe) {
                reject("Error: falta café.");
            } else if (!hayAgua) {
                reject("Error: falta agua.");
            } else if (!hayAzucar) {
                reject("Advertencia: falta azúcar, pero el café puede prepararse sin azúcar.");
            } else {
                resolve("Café preparado correctamente.");
            }
        }, 2000);
    });
}

prepararCafe(true, true, true)
    .then((resultado) => {
        console.log(resultado);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Proceso de cocina finalizado.");
    });
