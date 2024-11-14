import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ListaPeliculasComponent } from './components/lista-peliculas/lista-peliculas.component';
import { Pelicula } from '../models/Pelicula';
import { PeliculasjsonService } from './services/peliculasjson.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaPeliculasComponent, RouterLink,
    RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mi proyecto de serviciosTuristicos';
}
