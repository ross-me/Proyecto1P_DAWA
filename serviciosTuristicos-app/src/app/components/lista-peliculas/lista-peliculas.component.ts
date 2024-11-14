import { Component } from '@angular/core';
import { Pelicula } from '../../../models/Pelicula';
import { PeliculasjsonService } from '../../services/peliculasjson.service';
import { CurrencyPipe, DatePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-lista-peliculas',
  standalone: true,
  imports: [UpperCasePipe, CurrencyPipe, DatePipe, NgIf, NgFor,
    MatCardModule, MatIconModule, MatButtonModule
  ],
  templateUrl: './lista-peliculas.component.html',
  styleUrl: './lista-peliculas.component.css'
})
export class ListaPeliculasComponent {
  title="Lista de peliculas";
  movies: Pelicula[]=[];
  constructor(private miServicio:PeliculasjsonService){    
  }

  ngOnInit():void{//funcion propia de angular que se ejecuta automaticamente cuando se crea
    //el componente
    this.getPeliculas();

  }

  //cargar el arreglo de peliculas movies con los datos que me devuelve el servicio
  getPeliculas():void{
    this.miServicio.getMovies().subscribe((data: Pelicula[])=>{
      this.movies = data;
      console.log(this.movies[0]);
    });
  }

  comprar(movie:Pelicula):void{
  //alert("Pelicula "+movie.title+" comprada !!!");
    /*const dialogRef= this.mydialog.open(MyDialogComponent,{
      data:{
        titulo: movie.title,
        contenido: "La pelicula " +movie.title+ " ha sido comprada :) "

      }
    }); //abrir ventana del dialogo
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="aceptar"){//que quiero que suceda si dio click en aceptar //si el usuario dio click en aceptar
          console.log("Aceptar");
      }else if(result==="cancelar"){
        console.error("Cancelar"); //que quiero que suceda si dio click en cancelar
      }
    });*/
  }
  activar(imgMovie:HTMLImageElement){
    imgMovie.classList.add("activa");
  }
  desactivar(imgMovie:HTMLImageElement){
    imgMovie.classList.remove("activa");
  }
}
