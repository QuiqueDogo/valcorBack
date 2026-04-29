
## 🚀 Demo

👉 Frontend (Vercel):  
https://valcor-back.vercel.app/login

👉 Repositorio:  
https://github.com/QuiqueDogo/valcorBack

---

Para probar localmente solo hay que clonar el repo e instalar las dependencias

```bash
npm install
```
Para la `.env`
```bash

MONGO_URI=mongodb+srv://enriquelgv93_db_user:N4dyE4P230NsR5Ux@cluster0.wm4pile.mongodb.net/?appName=Cluster0
FRONT_URL=http://localhost:5173
JWT_SECRET=supersecret123

```

y ejecutar el siguiente comando:

```bash
npm run dev
```

## Deploy on Vercel

[Inventario](https://valcor-back.vercel.app)

## Credenciales

```bash
user: admin@test.com
password: 123456
```

--- 

### Consideraciones
Al principio se tenia pensado separar ambos proyectos en dos repositorios distintos pensando que podria hacerlo mas rapido pero empece a pensar en que podria tener problemas con el despliegue tanto en back y front. Entonces  finalmente decidi que por cuestion de tiempos y rapidez se opto por usar un solo repositorio aprovechando la integración de Nextjs. Se intentó hacer una arquitectura modular usando api routes. Tenemos separado todo en carpetas con sus controladores, rutas y modelos en el backend y componentes y vistas en el front . Se agrego tambien responsivo.

### Si tuviera una semana..
Si tuviera una semana mas de tiempo, me hubiera gustado implementar autenticacion y autorizacion para diferentes roles de usuarios. Como por ejemplo que solo algunos usuarios puedan crear productos o editar existencias. Tambien me hubiera gustado implementar las funcionales de editar y borrar y aunque se realizaron en el back  no las integre al front porque me enfoque en que funcionara lo basico de manera correcta. Tambien usar mas validaciones para back como tipos de datos, maximos pero decidi mejor validar desde front por rapidez. Por ultimo me hubiera gustado agregarle animaciones, hacer reales test sobre las apis y un mejor manejo de errores. Quizas tambien agregar un intento automatico del worker usuario y no hacerlo manual. Mejorar el sistema de reportes, teniendo un dashboard con  alertas para bajo stock por prodcuto  o por cuantas transacciones pasan por semana o dia. Tambien  mejorar toda la parte visual.
Se intento que la UI fuera lo mas limpia y usable posible. Me hubiera gustado usar componentes reusables para evitar repetir codigo. 
Y quizas un tema oscuro.


