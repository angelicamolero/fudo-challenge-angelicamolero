## Fudo Challenge – Angelica Molero
Este proyecto es una red social que llame Postea acotada desarrollada en React, como parte de un challenge técnico para la posición de Frontend Semi Senior Developer.

### Features
- Listado de posts

- Pantalla de detalle de post con comentarios

- Crear, eliminar y editar posts y comentarios

- UI custom con SASS

- Test unitarios con Jest para las funciones getComments y createCommments, asi como un test al component del CommentForm 

### Estructura del proyecto
```
src/
├── components/        # Componentes (Post, Comment, Forms, etc)
├── hooks/             # Hooks personalizados
├── services/          # Config de axios
├── types/             # Tipados globales
├── pages/             # Home y detalle de post
├── utils/             # funciones re-utilizables
```

### Build de Producción con Docker + Nginx
npm run build

### Crear la imagen Docker
docker build -t fudo-challenge-angelicamolero .

### Ejecutar el contenedor
docker run -p 8080:80 fudo-challenge-angelicamolero 

La app estará disponible en: http://localhost:8080

### Deploy
El proyecto está publicado en GitHub Pages https://angelicamolero.github.io/fudo-challenge-angelicamolero/#/
