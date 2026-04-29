## Cómo abordé el problema


Antes de escribir codigo, consulte e intente entender el problema y como podia solucinarlo. Luego defini los productos, el stock, los movimientos y las sucursales como principales entidades y las relaciones entre ellos. Y tambien el flujo critico que son los movimientos de inventario, las entradas, salidas y transferencias.

Para las herramientas usamos:
- Antigravity para rapidez al momento de programar
- ChatGPT para entender como relaciones y resolver el flujo de movimientos
- Next.js (App Router) para el front y back con sus api routes
- MongoDB + Mongoose para la base de datos
- Ant Design para los componentes de UI
- Nivo (gráficas) para las gráficas

Decidí priorizar:

- Modelo de datos correcto
- Lógica de negocio (movimientos + stock)
- Procesamiento async
- UI (dashboard y reportes)

## Diagrama 
![Diagrama](/public/imagen.png)

El objetivo en mi mente siempre fue asegurar consistencia antes de construir vistas.

Una decision tecnica critica fue cambiar el stack de React para el front y NodeJs para el back, pensando que como ya estaba familirizado con las herramientas podria hacer mas rapido ademas de que pense que tardaria mas en hacer todas las configuraciones para que los deploys estuvieran listos pero al analizar mas a fondo  (y con un buen descanso jaja) me di cuenta que lo mejor seria usar Nextjs para ambos. Con este cambio se pudo aprovechar mucho mejor las capacidades de Next.js como el App Router y las API routes. Adicionalmente esto facilitó mucho el despliegue en Vercel y la configuracion en mongo atlas fue algo muy sencillo