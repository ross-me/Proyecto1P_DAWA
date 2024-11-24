import { Component } from '@angular/core';
import { Guia } from '../../../models/Guia';
import { GuiasjsonService } from '../../services/guiasjson.service';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';

@Component({
  selector: 'app-lista-guias-turisticos',
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatIconModule, MatButtonModule, CurrencyPipe,
    MyDialogComponent
  ],
  templateUrl: './lista-guias-turisticos.component.html',
  styleUrl: './lista-guias-turisticos.component.css'
})
export class ListaGuiasTuristicosComponent {
  guides: Guia[] = [];
  constructor(private miServicio:GuiasjsonService, private mydialog:MatDialog){
  }

  ngOnInit():void{
    this.getGuias();
  }
  //cargar arreglo de actividades
  getGuias():void{
    this.miServicio.getGuides().subscribe((data: Guia[])=>{
      this.guides = data;

    });
  }

  contratar(guide:Guia):void{
    alert("Contrataste a "+guide.name);    
  }
}
