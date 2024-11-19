import { OnInit,  AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Actividad } from '../../../models/Actividad';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActividadesjsonService } from '../../services/actividadesjson.service';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-crud-actividades-recreativas',
  standalone: true,
  imports: [MatFormField, MatLabel, MatButtonModule, MatInputModule, MatTableModule, MatPaginatorModule,
    DatePipe, MatRadioButton, MatSelectModule, MatCheckboxModule, MatOptionModule,MatFormFieldModule,
    MatNativeDateModule, ReactiveFormsModule
  ],
  templateUrl: './crud-actividades-recreativas.component.html',
  styleUrl: './crud-actividades-recreativas.component.css'
})
export class CrudActividadesRecreativasComponent {
  form!:FormGroup;
  isEditMode: boolean=false;
  currentId!:number;
  //datasource -> fuente de datos para mi tabla
  dataSource = new MatTableDataSource<Actividad>();
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator; //inicializar paginator
  }

  ngOnInit():void{
    this.getActivities();
    //inicializar variables asociadas a los componentes delformulario
    this.form = this.fb.group({
      name: [""],
      description: [""],
      category: [""],
      raiting: [""],
      image: [""],
      price: [""]
    });
  
  }
  constructor(private activityService: ActividadesjsonService, private fb:FormBuilder, 
    private mydialog: MatDialog ){
    
  }

  getActivities():void{
    this.activityService.getActivities().subscribe((datos:Actividad[])=>{
      this.dataSource.data = datos;
      }); 
  }

  search(searchInput: HTMLInputElement){
    if(searchInput.value){ //searchInput.value es lo que el usuario esribio en la caja de texto
      //buscar
      this.activityService.getActivitiesSearch(searchInput.value).subscribe((datos:Actividad[])=>{
        this.dataSource.data = datos;
      });

    }else{ //listar todas las actividades
      this.getActivities();
    }
  }

  eliminar(actividad:Actividad){
    const dialogRef= this.mydialog.open(MyDialogComponent,{
      data:{
        titulo: "Eliminacion de actividad",
        contenido: "Estas seguro de eliminar la actividad " +actividad.name +"?"

      },
    }); //abrir ventana de dialogo
    
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="aceptar"){//que quiero que suceda si dio click en aceptar //si el usuario dio click en aceptar
        this.activityService.deleteActivity(actividad).subscribe(()=>{
          alert("Eliminado exitosamente");
          this.getActivities();//para que see actualice el datasource
        });
      }else if(result==="cancelar"){
        console.error("Cancelar"); //que quiero que suceda si dio click en cancelar
      }
    });
  }

  editar(actividad:Actividad){}

  onSubmit(){

  }


}
