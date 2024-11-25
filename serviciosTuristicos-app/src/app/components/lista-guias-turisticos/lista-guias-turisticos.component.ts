import { Component } from '@angular/core';
import { Guia } from '../../models/Guia';
import { GuiasjsonService } from '../../services/ServiciosGuias/guiasjson.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogoConfirmacion } from '../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { DialogoExito } from "../shared/Dialogo-Exito/dialogo-exito.component";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-lista-guias-turisticos',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './lista-guias-turisticos.component.html',
  styleUrl: './lista-guias-turisticos.component.css'
})
export class ListaGuiasTuristicosComponent {
  Title = 'Lista de Guías Turísticos';
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
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: guide.name,
        contenido:" ha sido contratado "
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result === "aceptar"){
        const dialogRef= this.mydialog.open(DialogoExito,{
          data:{
            titulo: "Contrato realizado",
            contenido:" Contrataste a: \"" +guide.name+"\"."
          }
        });
        dialogRef.afterClosed().subscribe(result=>{
          if(result === "aceptar"){
            console.log("Aceptar");
        }});
      }else if(result === "cancelar"){
        console.error("Cancelar");
      }
    })  
  }
}
