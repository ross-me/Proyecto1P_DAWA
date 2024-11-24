import { Component } from '@angular/core';
import { RestaurantesService } from '../../services/restaurantes-services.service';
import { Restaurante } from '../../../models/restaurante';
import { CurrencyPipe, UpperCasePipe, NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-restaurantes',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe, NgIf, NgFor, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './lista-restaurantes.component.html',
  styleUrls: ['./lista-restaurantes.component.css']
})
export class ListaRestaurantesComponent {
  Title = 'Lista de Restaurantes';
  restaurantes: Restaurante[] = [];

  constructor(private miServicio: RestaurantesService) {}

  ngOnInit(): void {
    this.getRestaurantes();
  }

  getRestaurantes(): void {
    this.miServicio.getRestaurantes().subscribe((data: Restaurante[]) => {
      this.restaurantes = data;
      console.log(this.restaurantes[0]);
    });
  }

  Reservar(restaurante: Restaurante): void {
    alert("Reservaste unas mesa en el restaurante: "+restaurante.Nombre)
  }
}