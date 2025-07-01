import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private key = 'contactos';

  constructor() {}

  // Obtener todos los contactos
  getAll(): any[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  // Guardar un nuevo contacto
  save(contacto: any): void {
    const contactos = this.getAll();
    contacto.id = Date.now(); // asignamos un ID único
    contactos.push(contacto);
    localStorage.setItem(this.key, JSON.stringify(contactos));
  }
}
