# Informe de augmentación de arquitectura

**Guardian Studios**  
**Fecha:** 29 de octubre de 2026  
**Estado:** propuesta para revisión. No hay cambios de código ni de diseño en esta entrega.  
**Repositorio:** [Guardian-Studios/guardian-studios](https://github.com/Guardian-Studios/guardian-studios)

Este informe es para revisión de quien lleva el sistema visual. Describe las mejoras de arquitectura que queremos sumar al sitio que ya está diseñado. La composición, la tipografía, el color, el motion, la marca y la voz en español se conservan.

Augmentación, en este documento, significa ampliar la arquitectura actual. El sitio sigue siendo una página estática en Vite, React y TypeScript. No proponemos otro framework, otro sistema de diseño ni un rediseño.

## Resumen

El homepage ya está compuesto, es accesible en lo esencial y se puede construir. Lo que falta es de plataforma:

- El folder de producción pesa **24,8 MB**. **20,0 MB** son imágenes que la página no usa, porque Vite publica todo `public/`.
- La imagen del portal, `portal4.png`, pesa **3,1 MB** y se muestra más ancha que su archivo (1672 px de origen, 2057 px en una pantalla de 1920 px).
- El copy vive en dos lugares: una parte en `src/config/site.ts` y el resto escrito dentro de los componentes. Todavía no es un paquete de contenido listo para un CMS headless.
- El HTML publicado es un shell de **1 KB**. El texto aparece cuando corre JavaScript. Para el lanzamiento queremos ese mismo diseño ya presente en el HTML.
- Hay una sola falla de comportamiento que conviene cerrar sin tocar el picker: el botón de MVP escribe un servicio que no existe en la lista de radios.

La dirección visual no entra en este informe. Luce bien y se mantiene.

## Alcance

Entra en la propuesta:

- Qué archivos se publican y cómo se cachean.
- Cómo se entregan las imágenes que ya están aprobadas.
- Una sola fuente de contenido, en JSON, con los textos actuales.
- HTML prerenderizado, metadatos y la bandera de `noindex` hasta el lanzamiento.
- Dos ajustes de comportamiento invisibles: el skip link y el estado del servicio.

Queda como está:

- `DESIGN.md`, `PRODUCT.md` y `docs/reference/typography-guide.md`.
- Paleta, tipografía, retícula, secciones, ilustraciones, emblema y wordmark.
- GSAP, ScrollTrigger, los dos interruptores de animación y la prioridad de `prefers-reduced-motion`.
- El formulario que prepara y descarga la consulta. No envía correo.
- La organización por secciones. No vamos a reordenar el código en atoms, molecules y organisms.
- El carácter estático del sitio. Sin backend, sin analytics y sin datos de contacto inventados.

## Arquitectura actual

Una ruta, un `index.html`, React montado en `#root`. `App.tsx` compone las secciones y guarda el servicio elegido. Cada sección tiene su carpeta y su SCSS. Los tokens están en `src/styles`. El motion está en `src/motion`.

El contenido estructurado (navegación, servicios, equipo, proyectos, pasos) está en `src/config/site.ts`. Los titulares, el hero, los valores del estudio, la sección MVP, el formulario y el pie están escritos en los componentes.

`public/` se copia entero a `dist/`. Ahí viajan los PNG de exploración (`fortin.png`, `waterfall.png`, `portal.png`, `portal2.png`, `portal3.png`, `arch.png`, `announcement.png`, `metalizedGuardian.png`), más `contact.jpg` y `portal.jpg`, aunque la página no los referencia. Los JS y CSS sí salen con hash. Las imágenes y las fuentes no.

Medición del build del 29 de octubre de 2026, y de la página en el navegador a 1920×1080:

| Pieza | Medida |
| --- | --- |
| `dist/` completo | 24,8 MB |
| Imágenes no referenciadas | 20,0 MB |
| `portal4.png` | 3,1 MB, 1672×940, pintada a 2057 px |
| Retrato de equipo | 129 px de origen, 342 px en pantalla |
| Tarjeta de trabajo | 312×198, ranura de unos 792 px |
| JavaScript | 357 KB, 121 KB gzip, casi todo GSAP |
| Hallazgos de `npm audit` | 0 |

`index.html` ya tiene `lang="es-CR"`, título, descripción y `noindex, nofollow`. No tiene canonical, Open Graph ni JSON-LD. El hosting no está elegido. CI corre en Node 24. Esta máquina está en Node 20.20.2: el sitio y el build funcionan; `npm test` en Windows no, porque Node 20 no ejecuta el test en TypeScript.

## Arquitectura objetivo

```text
contenido/site.json          única fuente de copy y de ids
        |
        v
src/content/site.ts          tipos, sin fetch y sin caché de datos
        |
        v
secciones actuales           mismas carpetas, mismo SCSS, leen props
        |
        v
build
        |-- HTML de la home ya con el texto (prerender)
        |-- JS y CSS con hash
        '-- imágenes derivadas, con hash, solo las que la página usa

host estático
        |-- HTML: caché corta
        '-- archivos con hash: caché larga e inmutable
```

Una capa de datos: el JSON. Los componentes no buscan contenido en otro lado.

Una capa de caché: la del host, sobre los archivos con hash. Sin service worker, para no crear una segunda caché que haya que invalidar a mano.

Las imágenes de exploración se mudan a `docs/reference/sources/`. Se conservan. Dejan de publicarse.

## Las augmentations

### 1. Publicar solo lo que la página usa

Sacar de `public/` los archivos que hoy no tienen ninguna referencia y dejarlos en `docs/reference/sources/`. El deploy baja de unos 25 MB a los assets reales: la foto del portal, el estudio, equipo, trabajo, logos y fuentes.

Esto no descarta arte. Lo saca de la carpeta que Vite copia al sitio.

### 2. Pipeline de imágenes, con el mismo encuadre

La dirección de arte se queda. Cambia el archivo que viaja al navegador.

Reglas:

- El recorte, el `object-position` y el uso (decorativa o con texto alternativo) se mantienen.
- Cada uso tiene un master al menos tan ancho como la pantalla donde se pinta, idealmente el doble para pantallas nítidas.
- El build genera AVIF y WebP, con JPEG de respaldo donde haga falta una foto.
- El HTML usa `srcset` y reserva ancho y alto para que el layout no salte.
- El nombre del archivo lleva hash, así un cambio de imagen no se queda pegado en la caché.
- `portal4.png` deja de ser, además, el fondo CSS de la sección MVP en un PNG de 3,1 MB. La sección puede seguir usando la misma imagen, servida en el formato liviano.

Presupuesto técnico de la primera vista, después del pipeline:

| Uso | Origen hoy | En pantalla a 1920 px | Master que necesitamos | Entrega |
| --- | --- | --- | --- | --- |
| Portal del hero | 1672×940 PNG, 3,1 MB | 2057 px | ≥ 2400 px de ancho | AVIF y WebP. Objetivo del candidato LCP: menos de 200 KB |
| Estudio | 1536×1024 JPEG, 486 KB | 953 px | el master actual alcanza | AVIF y WebP derivados |
| Retrato de equipo | 129×127 JPEG, ~6 KB | 342 px | ≥ 800 px | AVIF y WebP |
| Tarjeta de trabajo | 312×198 JPEG, 15–19 KB | ~792 px | ≥ 1600 px | AVIF y WebP |

Los masters nuevos los aprueba diseño. Arquitectura define anchos, formatos y peso. No recortamos ni reencuadramos.

Fuentes: se quedan Space Grotesk e Inter, self-hosted, como en la guía tipográfica. Solo el nombre de archivo pasa a tener hash. El preload sigue siendo únicamente Space Grotesk. La itálica de Inter se conserva para cuando el texto la use; hoy el navegador no la pide.

Objetivo de carpeta publicada, sin masters de exploración: por debajo de 2 MB. La primera vista deja de estar dominada por el PNG de 3,1 MB.

### 3. Un JSON de contenido, listo para un CMS

`content/site.json` pasa a ser la única fuente. `src/content/site.ts` lo importa y exporta el tipo. No hay `fetch` ni TanStack Query: todavía no existe una API. Cuando haya CMS headless, se reemplaza ese import por un adaptador. Las secciones no se enteran.

El texto se muda tal como está. Estas frases siguen iguales, entre otras:

- Hero: «No hace falta tenerlo todo claro para empezar.»
- Estudio: «Somos Guardian Studios, desde Costa Rica.»
- MVP: «¿Creaste tu MVP con IA y ahora necesitás publicarlo?»

Forma propuesta, resumida:

```json
{
  "meta": { "name": "Guardian Studios", "location": "Costa Rica", "locale": "es-CR" },
  "seo": {
    "title": "Guardian Studios — Diseño y desarrollo digital",
    "description": "Guardian Studios: diseño y desarrollo de sitios web y aplicaciones a la medida desde Costa Rica. Contanos qué querés construir.",
    "indexable": false
  },
  "services": [
    {
      "id": "sitio",
      "label": "Un sitio web",
      "prompt": {
        "question": "¿Qué debería poder hacer tu sitio?",
        "description": "Podemos empezar por las personas que lo van a visitar y lo que querés que encuentren."
      }
    }
  ],
  "hero": {
    "title": "No hace falta tenerlo todo claro para empezar.",
    "lede": "Contanos qué querés lograr. Buscamos una solución a tu medida, sin importar el tamaño de tu proyecto."
  }
}
```

Cada servicio lleva su `id`, su etiqueta y su pregunta en el mismo objeto. Hoy son dos listas paralelas y se pueden desfasar. El resto de las secciones (estudio, equipo, trabajo, proceso, MVP, contacto, pie, navegación) entra en el mismo archivo, con los textos actuales.

Los componentes siguen siendo los mismos. Dejan de tener párrafos fijos y reciben su bloque.

### 4. La intención del MVP, sin un quinto radio

Hoy el botón «Quiero lanzar mi MVP» guarda el texto `Publicar mi MVP`. Ese texto no está entre los cuatro servicios, así que los radios quedan sin ninguno marcado.

Propuesta, sin cambiar el picker:

- Los cuatro radios siguen igual.
- El botón de MVP guarda una intención aparte, `mvp`, y el resumen de contacto muestra «Publicar mi MVP».
- El radio que ya estaba elegido se mantiene.

Si más adelante el picker debe mostrar esa opción como quinta tarjeta, es una decisión de diseño. No la damos por hecha.

### 5. Skip link, con el header donde está

«Saltar al contenido» apunta a `<main>`, y el header vive dentro de `<main>`, así que el atajo no salta la navegación.

Propuesta: el enlace apunta a `#hero-title`. El header sigue dentro del hero, en el mismo lugar. Cero cambio de composición.

### 6. Prerender y SEO, con el mismo diseño

Una sola ruta. En el build, el HTML de esa ruta ya incluye los titulares y los párrafos. React sigue hidratando el picker, el equipo, el proceso, el formulario y el motion.

`seo.indexable` queda en `false` hasta confirmar dominio. En ese momento se agregan canonical, Open Graph, JSON-LD de organización y el sitemap, y se retira el `noindex`. Los textos salen del mismo JSON.

### 7. Caché y hosting, cuando exista el dominio

Cualquier host estático sirve. El requisito es de headers, no de marca:

- HTML: caché corta, para que un cambio de copy se vea pronto.
- JS, CSS, fuentes e imágenes con hash: caché larga, inmutable.
- Content-Security-Policy acotada al propio origen. Sin scripts de terceros, en línea con la decisión de no poner analytics.

El formulario sigue en el navegador hasta que exista un correo verificado en el contenido. El día que haya envío real, se agrega un adaptador al lado de la descarga. El formulario visual no se reescribe.

### 8. Higiene que no se ve

- Borrar `TeamMemberCard.tsx`, que nadie importa.
- Dejar el motion de proceso en los hooks que ya usa el resto, sin tocar la coreografía.
- Subir los parches de Vite 8.3.5, Sass 1.107.0 y oxlint 1.90.0. TypeScript se queda en 6. `@types/node` se queda en 24, que es la versión de `.nvmrc`.
- En CI, pasar de `actions/checkout@v4` y `actions/setup-node@v4` a las ramas v7 actuales. El workflow sigue en Node 24.
- Un test del contenido: cada `id` de servicio existe, y cada imagen citada en el JSON está en el pipeline.

## Decisiones para cerrar

| # | Propuesta | Si se aprueba, el diseño… | Respuesta |
| --- | --- | --- | --- |
| 1 | Mudar el copy actual a `content/site.json` sin reescribirlo | se lee igual | |
| 2 | Mover los PNG de exploración a `docs/reference/sources/` | no cambia; dejan de publicarse | |
| 3 | Pipeline AVIF/WebP con los anchos de la tabla, mismo encuadre | se ve igual de compuesto, más nítido donde hoy el archivo es chico | |
| 4 | Intención MVP sin agregar un quinto radio | el picker queda igual | |
| 5 | Skip link hacia `#hero-title` | el header queda en su lugar | |
| 6 | `noindex` hasta tener dominio | sin cambio visual | |
| 7 | Formulario local hasta tener un correo real | sin cambio visual | |
| 8 | Seguir con secciones, GSAP y sitio estático | es la arquitectura que ya está | |

La 3 necesita ojo de diseño en los masters y en los exports. El resto es plataforma.

## Fases

1. **Higiene.** Sacar del deploy lo que no se referencia, arreglar la intención del MVP, apuntar el skip link, borrar el componente muerto, alinear CI y parches. Sin diferencia visual.
2. **Imágenes.** Pipeline y masters. Diseño aprueba los exports contra la composición actual.
3. **Contenido.** JSON con el texto verbatim. Las secciones leen datos y conservan su SCSS.
4. **Publicación.** Prerender y metadatos. `noindex` sigue.
5. **Host.** Cuando haya dominio: caché, CSP, sitemap y quitar `noindex`.

Cada fase se puede revisar sola. La 2 y la 3 son las que conviene mirar con el archivo abierto al lado.

## Riesgos

- **Prerender y motion.** El texto tiene que verse completo antes de que GSAP corra. Esa regla ya está en el proyecto; el prerender la tiene que respetar para que no haya un salto al hidratar.
- **Nitidez.** Un export mal comprimido se ve distinto aunque el encuadre sea el mismo. Por eso los masters los aprueba diseño, con la composición actual como referencia.
- **Copy.** Al mudarlo al JSON se puede perder una frase. La mudanza es verbatim y se contrasta contra el texto actual, no contra una redacción nueva.
- **URLs de imágenes.** Van a cambiar cuando lleven hash. Conviene hacerlo mientras `noindex` siga activo.

## Lectura de la revisión

Con las ocho respuestas de la tabla se puede implementar en el orden de las fases. Hasta esa revisión, el sitio queda como está.
