import { Component } from '@angular/core';
import { Alojamiento } from '../../models/Alojamiento';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crud-alojamientos',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './crud-alojamientos.component.html',
  styleUrl: './crud-alojamientos.component.css'
})
export class CrudAlojamientosComponent {
  // Lista de alojamientos, inicializada con algunos datos de ejemplo
  alojamientos: Alojamiento[] = [
    { id: 1, nombre: 'Alojamiento 1', precio: 100, ubicacion: 'Guayaquil' },
    { id: 2, nombre: 'Alojamiento 2', precio: 150, ubicacion: 'Quito' },
    { id: 3, nombre: 'Alojamiento 3', precio: 200, ubicacion: 'Cuenca' }
  ];
  // Alojamiento seleccionado para editar
  alojamientoSeleccionado: Alojamiento | null = null;
  nuevoNombre: string='';
  nuevoPrecio: number=0;
  nuevoUbicacion: string='';

  // Función para crear un nuevo alojamiento
  crearAlojamiento(nombre: string, precio: number, ubicacion: string): void {
  const nuevoAlojamiento: Alojamiento = {
    id: this.alojamientos.length + 1,  // Genera un ID único
    nombre: nombre,
    precio: precio,
    ubicacion: ubicacion
  };
  this.alojamientos.push(nuevoAlojamiento);
  }

  // Función para leer todos los alojamientos
  obtenerAlojamientos(): Alojamiento[] {
  return this.alojamientos;
  }

  // Función para actualizar un alojamiento
  actualizarAlojamiento(alojamiento: Alojamiento): void {
  const index = this.alojamientos.findIndex(a => a.id === alojamiento.id);
  if (index !== -1) {
    this.alojamientos[index] = alojamiento;
  }
  }

  // Función para eliminar un alojamiento
  eliminarAlojamiento(id: number): void {
  this.alojamientos = this.alojamientos.filter(alojamiento => alojamiento.id !== id);
  }

  // Función para seleccionar un alojamiento para editar
  seleccionarAlojamiento(alojamiento: Alojamiento): void {
  this.alojamientoSeleccionado = { ...alojamiento };
  }

  // Función para cancelar la edición
  cancelarEdicion(): void {
  this.alojamientoSeleccionado = null;
  }
}
