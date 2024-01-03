const jsonForm = document.querySelector("#jsonform");
const csvForm = document.querySelector("#csvform");
const bConvert = document.querySelector("#bConvert");

bConvert.addEventListener("click", (e) => {
  convertJSONtoCSV();
});

function convertJSONtoCSV() {
  let json;
  let keys = [];
  let values = [];

  try {
    // Paso 1: Parseamos el JSON
    json = JSON.parse(jsonForm.value);
  } catch (error) {
    alert("Formato incorrecto. Por favor, ingresa un JSON válido.");
    return; // Salimos de la función si el JSON no es válido
  }

  if (Array.isArray(json)) {
    // Paso 2: Comenzamos a trabajar con un arreglo de objetos
    console.log("Es un arreglo de objetos");

    json.forEach((item) => {
      const nkeys = Object.keys(item);

      if (keys.length === 0) {
        // Paso 3: Asignamos las claves en la primera iteración
        keys = [...nkeys];
        console.log("Claves asignadas:", keys);
      } else {
        if (nkeys.length !== keys.length) {
          throw new Error("El número de claves es diferente entre objetos.");
        } else {
          console.log("Número de claves es igual:", nkeys);
        }
      }

      // Paso 4: Construimos filas con valores
      const row = keys.map((k) => {
        return item[k];
      });
      values.push([...row]);

      console.log("Fila construida:", row);
    });

    // Paso 5: Agregamos las claves como primera fila
    values.unshift(keys);
    console.log("Claves añadidas como primera fila:", values);

    // Paso 6: Convertimos filas a texto CSV
    const text = values.map((v) => v.join(",")).join("\n");
    console.log("Texto CSV construido:", text);

    // Paso 7: Mostramos el CSV en el área de texto
    csvForm.value = text;
    console.log("CSV mostrado en el área de texto.");
  } else {
    console.log("No es un arreglo de objetos");
  }
}
