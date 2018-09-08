var mongoose = require("mongoose");
var Campground = require("./models/campgroud");
var Comment = require("./models/commets");

var data = [
    {
        name: "La cabaña bonita",
        imagenes: "http://noticias.universia.cr/net/images/tiempo-libre/c/ca/cam/campamento.jpg",
        description: "Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc."
    },
    {
        name: "El bote de los venados",
        imagenes: "https://www.xochitla.org.mx/galerias/parque/campamentos/campamento-en-xochitla.jpg",
        description: "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, 'consecteur', en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de 'de Finnibus Bonorum et Malorum' (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, viene de una linea en la sección 1.10.32 El trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de 'de Finibus Bonorum et Malorum' por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham."
    }, 
    {
        name: "El camp de la tía Chona",
        imagenes: "https://faros.hsjdbcn.org/sites/default/files/styles/ficha-contenido/public/campamento-de-verano.jpg?itok=V3X0hM9l",
        description: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo 'Contenido aquí, contenido aquí'. Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de 'Lorem Ipsum' va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo)."
    }
]

function seedDB(){
    //REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Se elimino TODO!!!")
        } 
    });
    // for(let i in data){
    //   Campground.create(data[i], function(err, campground){
    //     if(err){
    //         console.log(err)
    //     } else {
    //         console.log("Acabas de añadir un campamento!")   
    //         Comment.create(
    //             {
    //                 text: "Es un hermoso lugar, pero seria mejor si tuviera Wi-Fi",
    //                 author: "Homer"
    //             }, function(err, comment){
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log("Created new comment"); 
    //                 }
    //             }
    //         );
    //     }
    //   }); 
    //}
}

module.exports = seedDB;