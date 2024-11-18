import { Component } from '@angular/core';
import { Actividad } from '../../../models/Actividad';
import { ActividadesjsonService } from '../../services/actividadesjson.service';

@Component({
  selector: 'app-lista-actividades',
  standalone: true,
  imports: [],
  templateUrl: './lista-actividades.component.html',
  styleUrl: './lista-actividades.component.css'
})
export class ListaActividadesComponent {
  activities: Actividad[] = [];
  constructor(private miServicio:ActividadesjsonService){
  }

  ngOnInit():void{
    this.getActividades();
  }
  //cargar arreglo de actividades
  getActividades():void{
    this.miServicio.getActivities().subscribe((data: Actividad[])=>{
      this.activities = data;

    });
  }
}
