const malasPalabras = [
    "coño",
    "pinga",
    "sing",
    "carajo",
    "cago",
    "resing",
    "resingo",
    "joder",
    "cabrón",
    "singar",
    "mierda",
    "comemierda",
    "maricón",
    "bollo",
    "malaPalabra2",
    "malaPalabra3",
    "bicho",
    "bolsa",
    "cagalitroso",
    "chupa pinga",
    "come pinga",
    "descarao",
    "follar",
    "gilipollas",
    "hijoeputa",
    "hostia",
    "jilipollas",
    "malparido",
    "mariconazo",
    "mierdero",
    "mosquita muerta",
    "pendejo",
    "perra",
    "perra de mierda",
    "puta",
    "puto",
    "soplapollas",
    "tortillera",
    "tontolaba",
    "vagina",
    "verga",
    "zorra",
    "zorro",
    "cara de pinga",
    "pinga corta",
    "pinga larga",
    "tragasable",
    "traidor",
    "zángano",
    "estúpido",
    "imbécil",
    "idiota",
    "tarado",
    "gilipollas",
    "pendejo",
    "pelotudo",
    "gil",
    "mamaguevo",
    "huevón",
    "cabronazo",
    "mierdoso",
    "careverga",
    "culero",
    "culiado",
    "conchudo",
    "chinga tu madre",
    "chingado",
    "chingar",
    "chingón",
    "chingada",
    "chingadera",
    "putazo",
    "pendejada",
    "pinche",
    "cabrón",
    "hijueputa",
    "sapo",
    "patán",
    "macabro",
    "baboso",
    "cojudo",
    "boludo",
    "pelotudeces",
    "pelotudez",
    "carajo",
    "cojones",
    "cojonudo",
    "mierdero",
    "cabroncete",
    "jodido",
    "jodienda",
    "jodedor",
    "jodienda",
    "putear",
    "puteado",
    "putero",
    "puticlub",
    "perico",
    "periquito",
    "monstruo",
    "lagarto",
    "patan",
    "cabestro",
    "bellaco",
    "lagartona",
    "cachonda",
    "zorrita",
    "chupapollas",
    "cacho",
    "cachopo",
    "hostiazo",
    "hijoeputa",
    "cabronazo",
    "capullo",
    "chocho",
    "culerada",
    "coño",
    "hostias",
    "chupa",
    "mierdero",
    "mierdero"
];


function contieneMalasPalabras(texto) {
    const textoMinusculas = texto.toLowerCase();
    return malasPalabras.some(palabra => textoMinusculas.includes(palabra.toLowerCase()));
}

export { contieneMalasPalabras };
