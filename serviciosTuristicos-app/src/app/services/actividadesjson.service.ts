import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../../models/Actividad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesjsonService {
  private jsonUrl="http://localhost:3000/peliculas";//ruta del archivo json que quiero usar con lo del servidor

  constructor(private http:HttpClient) { }

  getActivities():Observable<Actividad[]>{
    return this.http.get<Actividad[]>(this.jsonUrl); //get para leer
    }


}
