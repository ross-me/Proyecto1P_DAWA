import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface DialogData{
  titulo: string;
  contenido: string;
}

@Component({
  selector: 'app-my-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './my-dialog.component.html',
  styleUrl: './my-dialog.component.css'
})
export class MyDialogComponent {
  constructor(public dialogRef:MatDialogRef<MatDialogModule>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData){
    }
  
  onAceptar():void{
    //qui faltab true
    this.dialogRef.close("aceptar");//cierra la ventana de dilogo
  }
  onCancelar():void{
    //aqui faltaba false para indicaar que fue cancelar
    this.dialogRef.close("cancelar");//cierra la ventana de dilogo
  }
}
