import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = [
  provideRouter(routes),
];
// Este archivo configura las rutas de la aplicación Angular.
// Importa las rutas definidas en app.routes.ts y las proporciona al enrutador de Angular.
