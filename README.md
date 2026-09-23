# Actividad 3 – 4to Bimestre – Mini App de Productos

**Curso:** Tecnologías de la Información y la Comunicación (TICS)
**Carrera:** Perito en Informática
**Tecnologías utilizadas:** HTML5, CSS3, JavaScript (ES6+), Git, Husky, ESLint

---

## 1. Descripción del proyecto

Esta actividad consiste en crear una mini aplicación web que consume una **API pública** mediante `fetch()`, muestra los datos obtenidos de forma dinámica en el navegador y permite al usuario interactuar con ellos (búsqueda y/o filtro). Además, el repositorio se configura con **Git**, **Husky** y **ESLint** para evitar que se suban commits con errores de estilo en el código.

La API pública utilizada es [FakeStore API](https://fakestoreapi.com/products), la cual devuelve una lista de productos en formato JSON (nombre, precio, imagen, categoría, etc.) sin necesidad de autenticación.

---

## 2. Estructura del proyecto

```
ACT3_Tics_4Bim/
├── index.html          → Estructura base de la página
├── style.css            → Estilos visuales de la app
├── script.js             → Lógica: obtención de datos y su interacción
├── package.json          → Dependencias del proyecto (Husky y ESLint)
├── eslint.config.js       → Reglas que ESLint debe validar
├── .husky/
│   └── pre-commit         → Script que se ejecuta antes de cada commit
├── .gitignore
└── README.md
```

---

## 3. ¿Qué hace cada archivo?

| Archivo | Función |
|---|---|
| `index.html` | Contiene el `<h1>`, el contenedor donde se pintan los productos y los controles de búsqueda/filtro. |
| `style.css` | Da estilo a las tarjetas de producto, colores, tipografía y disposición en cuadrícula (grid). |
| `script.js` | Hace la petición `fetch()` a la API, recorre los datos con `forEach()` y construye el HTML de cada producto dinámicamente con `innerHTML`. También contiene la función de búsqueda/filtro. |

---

## 4. Explicación del proceso: Git + Husky + ESLint

Uno de los objetivos de esta actividad es aprender **control de calidad automático**: que el propio sistema de control de versiones impida subir código con errores, antes de que ese error llegue al repositorio remoto.

### Paso 1 — Inicializar el repositorio Git

```bash
git init
```
Esto crea la carpeta oculta `.git/`, donde Git guardará el historial de cambios del proyecto.

### Paso 2 — Instalar y configurar Husky

**Husky** es una herramienta que permite ejecutar scripts automáticamente en ciertos momentos de Git (por ejemplo, justo antes de hacer un commit). A esos momentos se les llama *hooks*.

```bash
npm install husky --save-dev
npx husky init
```

- `npm install husky --save-dev` descarga Husky y lo agrega como **dependencia de desarrollo** (`devDependencies`) en `package.json`. Es "de desarrollo" porque solo se necesita mientras se programa, no cuando el proyecto ya está terminado.
- `npx husky init` crea la carpeta `.husky/` con un archivo `pre-commit` de ejemplo, y agrega el script `"prepare": "husky"` en `package.json`, para que Husky se active automáticamente cada vez que alguien más clone el proyecto y corra `npm install`.

### Paso 3 — Instalar y configurar ESLint

**ESLint** es un *linter*: un programa que revisa el código JavaScript en busca de errores de sintaxis y de estilo (por ejemplo, variables sin usar, falta de punto y coma, uso de `==` en vez de `===`, etc.).

```bash
npm install eslint --save-dev
npx eslint --init
```

Al ejecutar `npx eslint --init`, ESLint hace unas preguntas (tipo de proyecto, entorno, formato) y genera el archivo `eslint.config.js` con las reglas elegidas.

### Paso 4 — Conectar ESLint con el pre-commit hook de Husky

Se edita el archivo `.husky/pre-commit` para que, en lugar del contenido de ejemplo, ejecute ESLint sobre todo el proyecto:

```bash
npx eslint .
```

De esta forma, **cada vez que se intenta hacer un `git commit`, Git ejecuta primero este script**. Si ESLint encuentra errores, el proceso termina con un código de error y el commit **no se realiza**. Si no hay errores, el commit continúa con normalidad.

### Paso 5 — Verificar que funciona

Para comprobar que el hook realmente bloquea errores:

1. Se modificó intencionalmente `script.js` quitando un punto y coma (`;`) y dejando una variable declarada pero sin usar.
2. Se ejecutó:
   ```bash
   git add .
   git commit -m "prueba de error de estilo"
   ```
3. Husky ejecutó automáticamente `npx eslint .`, ESLint mostró en la terminal los errores encontrados (archivo, línea y regla incumplida) y **el commit fue rechazado**.
4. Se corrigieron los errores señalados por ESLint y se volvió a intentar el commit; esta vez no hubo errores y el commit se completó correctamente.

Esto demuestra que el flujo de calidad de código está funcionando: **no es posible subir código con errores de estilo al historial del proyecto.**

---

## 5. Cómo ejecutar el proyecto

1. Clonar o descomprimir el proyecto.
2. Instalar las dependencias (esto también activa el hook de Husky):
   ```bash
   npm install
   ```
3. Abrir `index.html` en el navegador (recomendado usar la extensión **Live Server** de VS Code para evitar problemas de carga).

---

## 6. Conclusión

Con esta actividad se practicó el consumo de una API pública con `fetch()`, la manipulación dinámica del DOM para mostrar información en pantalla, y la configuración de un flujo básico de control de calidad de código usando Git, Husky y ESLint — una práctica común en proyectos de desarrollo de software reales para mantener un estándar de calidad en equipo.
