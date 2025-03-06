# Guía de Instalación y Configuración de Proyecto Laravel

Este documento proporciona los pasos necesarios para clonar e instalar un proyecto Laravel 11 en tu entorno local.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

- **PHP 8.1 o superior**: Requerido por Laravel 11.
- **Composer 2.5+**: Herramienta para la gestión de dependencias en PHP.
- **Node.js 18+ y NPM 9+**: Necesarios para la gestión de dependencias de JavaScript y la compilación de assets con Vite.
- **Base de Datos**: SQLite (configuración por defecto), MySQL, PostgreSQL o SQL Server.

## Pasos para la Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/usuario/nombre-del-proyecto.git
cd nombre-del-proyecto
```

### 2. Instala las dependencias de PHP utilizando Composer:

```bash
composer install
```

### 3. Instalar Dependencias de JavaScript

Instala las dependencias de JavaScript utilizando NPM:

```bash
npm install
npm run prepare
```

### 4. Configurar el Archivo .env

Copia el archivo de ejemplo .env.example y renómbralo a .env:

```bash
cp .env.example .env
```

Abre el archivo .env en un editor de texto y configura las variables de entorno, especialmente las relacionadas con la base de datos:

```ini
DB_CONNECTION=sqlite
DB_DATABASE=/var/www/nombre-del-proyecto/database/database.sqlite
```

Asegúrate de que la ruta en DB_DATABASE corresponda a la ubicación de tu archivo SQLite.

### 5. Generar la Clave de Aplicación

Ejecuta el siguiente comando para generar una clave única:

```bash
php artisan key:generate
```

### 6. Crear la Base de Datos SQLite

Si usas SQLite, crea el archivo de base de datos:

```bash
touch /var/www/nombre-del-proyecto/database/database.sqlite
```

Importante: Verifica los permisos del archivo para que Laravel pueda acceder a él.

### 7. Ejecutar Migraciones y Seeders

Aplica las migraciones para crear tablas:

```bash
php artisan migrate
```

Si el proyecto incluye datos iniciales, ejecuta:

```bash
php artisan db:seed
```

### 8. Compilar los Assets

Para desarrollo, compila los archivos con:

```bash
npm run dev
```

Para producción, usa:

```bash
npm run production
```

### 9. Crear Enlace Simbólico para Almacenamiento

Si el proyecto usa almacenamiento de archivos, ejecuta:

```bash
php artisan storage:link
```

### 10. Acceder al Proyecto

Inicia el servidor de desarrollo:

```bash
npm run dev
```

> **Listo!** 🚀 Ahora puedes acceder a la URL en tu navegador.
