import { Component } from '@angular/core';
import { Excursion } from '../../../models/Excursion';
import { ExcursionesjsonService } from '../../services/excursionesjson.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-lista-excursiones',
  standalone: true,
  imports: [MatCardModule,MatIconModule, MatButtonModule, CurrencyPipe, MatDividerModule],
  templateUrl: './lista-excursiones.component.html',
  styleUrl: './lista-excursiones.component.css'
})
export class ListaExcursionesComponent {
  title="Excursiones";
  excursions: Excursion[]=[];
  constructor(private miServicio:ExcursionesjsonService){
  }

  ngOnInit():void{
    this.getExcursiones();
  }

  getExcursiones():void{
    this.miServicio.getExcursions().subscribe((data:Excursion[])=>{
      this.excursions= data;
    });
  }

  reservar(excursion:Excursion):void{
    alert("Reservaste la " +excursion.name);
  }
}
