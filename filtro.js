// filtro.js
const malasPalabras = [
    "pollo",
    "malaPalabra2",
    "malaPalabra3"
    // Agrega aquí todas las malas palabras que quieras filtrar
];

function contieneMalasPalabras(texto) {
    const textoMinusculas = texto.toLowerCase();
    return malasPalabras.some(palabra => textoMinusculas.includes(palabra.toLowerCase()));
}

export { contieneMalasPalabras };
