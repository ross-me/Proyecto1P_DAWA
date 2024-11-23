import { Component } from '@angular/core';
import { Transporte } from '../../../models/transporte';
import { TransportejsonService } from '../../services/transportejson.service';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';

@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [UpperCasePipe, CurrencyPipe, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.css'
})
export class TransporteComponent {
  title= "Lista de Transportes";
  transport: Transporte[]=[];
  constructor(private miServicio:TransportejsonService, private mydialog:MatDialog){

  }

  ngOnInit():void{
    this.getTransporte();
  }

  getTransporte():void{
    this.miServicio.getTransport().subscribe((data: Transporte[])=>{
      this.transport = data;
      console.log(this.transport[0]);

    });
  }
  Reservar(transport:Transporte):void{
    const dialogRef= this.mydialog.open(MyDialogComponent,{
      data:{
        titulo: transport.brand,
        contenido:" ha sido reservado "
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result === "aceptar"){
        console.log("Aceptar");
      }else if(result === "cancelar"){
        console.error("Cancelar");
      }
    })
  }

}
