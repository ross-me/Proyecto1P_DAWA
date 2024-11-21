import { Component } from '@angular/core';
import { Actividad } from '../../../models/Actividad';
import { ActividadesjsonService } from '../../services/actividadesjson.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-actividades',
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatIconModule, MatButtonModule, CurrencyPipe,
    MyDialogComponent
  ],
  templateUrl: './lista-actividades.component.html',
  styleUrl: './lista-actividades.component.css'
})
export class ListaActividadesComponent {
  activities: Actividad[] = [];
  constructor(private miServicio:ActividadesjsonService, private mydialog:MatDialog){
  }

  ngOnInit():void{
    this.getActividades();
  }
  //cargar arreglo de actividades
  getActividades():void{
    this.miServicio.getActivities().subscribe((data: Actividad[])=>{
      this.activities = data;
      console.log(this.activities[2]);

    });
  }

  adquirir(activity:Actividad):void{
    alert("Adquiriste la actividad "+activity.name);    
  }
  
}
