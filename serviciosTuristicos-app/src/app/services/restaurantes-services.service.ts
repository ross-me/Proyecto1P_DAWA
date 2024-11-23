import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Restaurante } from '../../models/restaurante'

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {
  private jsonUrl="http://localhost:3000/restaurantes";
  constructor( private http:HttpClient) { 
  }

  getRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(this.jsonUrl);
  }

   getRestaurantesSearch(Nombre?:string, Tipo?:string):Observable<Restaurante[]>{
    return this.http.get<Restaurante[]>(this.jsonUrl).pipe(
      map((restaurantes)=>
        restaurantes.filter((restaurante)=>
        (Nombre? restaurante.Nombre.toLowerCase().includes(Nombre.toLowerCase()):true) &&
         (Tipo? restaurante.Tipo.toLowerCase().includes(Tipo.toLowerCase()):true) 
        )
      )
    );
  }

  addRestaurantes(restaurante:Restaurante):Observable<Restaurante>{
    return this.http.post<Restaurante>(this.jsonUrl, restaurante);
  }

  updateRestaurantes(restaurante:Restaurante):Observable<Restaurante>{
    const urlDelRestaurante = `${this.jsonUrl}/${restaurante.id}`
    return this.http.put<Restaurante>(urlDelRestaurante, restaurante);
  }
  
  deleteRestaurantes(restaurante:Restaurante):Observable<void>{
    const urlDelRestaurante = `${this.jsonUrl}/${restaurante.id}`
    return this.http.delete<void>(urlDelRestaurante);
  }
}
