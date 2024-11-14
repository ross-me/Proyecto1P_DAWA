import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pelicula } from '../../models/Pelicula';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculasjsonService {

    //private jsonUrl="../json/datos.json";//ruta del archivo json que quiero usar
    private jsonUrl="http://localhost:3000/peliculas";//ruta del archivo json que quiero usar con lo del servidor
    constructor( private http:HttpClient) { //inyeccion de httpClient
    }

  getMovies():Observable<Pelicula[]>{//Obtener lista de peliculas desde el archivo como un servicio
    return this.http.get<Pelicula[]>(this.jsonUrl); //get para leer
  }
  //buscar
  getMoviesSearch(title?:string, genre?:string):Observable<Pelicula[]>{ //espero varias como resul
    return this.http.get<Pelicula[]>(this.jsonUrl).pipe(
      map((peliculas)=>
        peliculas.filter((pelicula)=>
        (title ? pelicula.title.toLowerCase().includes(title.toLowerCase()):true) &&
         (genre? pelicula.genre.toLowerCase().includes(genre.toLowerCase()):true) 
        )
      )
    );
  }
  //agregar
  addMovie(pelicula:Pelicula):Observable<Pelicula>{
    return this.http.post<Pelicula>(this.jsonUrl, pelicula); //post para agregar algo nuevo
  }

  //editar
  updateMovie(pelicula:Pelicula):Observable<Pelicula>{
    const urlDeLaPelicula = `${this.jsonUrl}/${pelicula.id}` //http://localhost:3000/peliculas/5
    return this.http.put<Pelicula>(urlDeLaPelicula, pelicula); //put para editar
  }

  //eliminar
  deleteMovie(pelicula:Pelicula):Observable<void>{ //delte para eliminar
    const urlDeLaPelicula = `${this.jsonUrl}/${pelicula.id}`
    return this.http.delete<void>(urlDeLaPelicula);
  }
}
