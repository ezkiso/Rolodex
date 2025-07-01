import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  contactos: any[] = [];
  // Este componente permite a los usuarios ingresar información de contacto.
  constructor(private fb: FormBuilder, private contactService: ContactService){
  this.contactForm = this.fb.group({
    nombre: ['', Validators.required],
    correo: [''],
    telefono: [''],
    redesSociales: ['']
  });

  this.contactos = this.contactService.getAll(); // Obtenemos todos los contactos al inicializar el componente
  } 

  guardar() {
  const formValue = this.contactForm.value;
  const nuevoContacto = {
    ...formValue,
    redesSociales: formValue.redesSociales
      ? formValue.redesSociales.split(',').map((s: string) => s.trim())
      : [],
    fechaIngreso: new Date().toISOString()
  };

  this.contactService.save(nuevoContacto);
  this.contactForm.reset();
  this.contactos = this.contactService.getAll(); // recargar lista actualizada
  alert('Contacto guardado');
  }






}
// Este componente ContactComponent permite a los usuarios ingresar información de contacto.