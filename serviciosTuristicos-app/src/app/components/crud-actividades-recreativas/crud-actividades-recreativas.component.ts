import { OnInit,  AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Actividad } from '../../models/Actividad';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActividadesjsonService } from '../../services/ServiciosActividades/actividadesjson.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacion } from '../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { SnackBarExito } from "../shared/SnackBar-Exito/snackbar-exito.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crud-actividades-recreativas',
  standalone: true,
  imports: [MatFormField, MatLabel, MatButtonModule, MatInputModule, MatTableModule, MatPaginatorModule,
    MatSelectModule, MatCheckboxModule, MatOptionModule,MatFormFieldModule,
    MatNativeDateModule, ReactiveFormsModule, MatDividerModule
  ],
  templateUrl: './crud-actividades-recreativas.component.html',
  styleUrl: './crud-actividades-recreativas.component.css'
})
export class CrudActividadesRecreativasComponent {
  Title = 'CRUD de Actividades';
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
      name: ["",[Validators.required, Validators.minLength(10), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      description: ["",[Validators.required, Validators.minLength(20)]],
      category: ["",Validators.required],
      rating: [false],
      image: ["",[Validators.required, Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/)]],
      //image: [""],
      price: ["",[Validators.required, Validators.min(8), Validators.max(50)]]
    });
  
  }
  constructor(private activityService: ActividadesjsonService, private fb:FormBuilder, 
    private mydialog: MatDialog, private snackBar: MatSnackBar ){
    
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
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: "Eliminacion de actividad",
        contenido: "Estas seguro de eliminar la actividad " +actividad.name +"?"

      },
    }); //abrir ventana de dialogo
    
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="aceptar"){//que quiero que suceda si dio click en aceptar //si el usuario dio click en aceptar
        this.activityService.deleteActivity(actividad).subscribe(()=>{
          SnackBarExito.showSnackBar(this.snackBar, `Actividad "${actividad.name}" eliminada exitosamente.`);
          this.getActivities();//para que see actualice el datasource
        });
      }else if(result==="cancelar"){
        console.error("Cancelar"); //que quiero que suceda si dio click en cancelar
      }
    });
  }

  editar(actividad:Actividad){
    this.isEditMode=true;
    if(actividad && actividad.id){
      this.currentId = actividad.id;
    }else{
      console.log("Actividad o id de la actividad undefined")
    }

    //cargar datos de la pelicula
    this.form.setValue({
      name:actividad.name,
      description:actividad.description,
      category:actividad.category,
      rating:actividad.rating,
      image:actividad.image,
      price:actividad.price,
    });
  }

  onSubmit(){
    //guardar la actividad

    //revisar si el formulario es valido
    if(this.form.invalid){
      console.log("invalid");
      return;
    }

    //obtener los datos de los controles del formulario
    const newActividad:Actividad = this.form.value;

    if(this.isEditMode){//editar
      newActividad.id=this.currentId;
      this.activityService.updateActivity(newActividad).subscribe((updateActividad)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Actividad "${newActividad.name}" editada exitosamente.`);
          this.getActivities(); //acualizar data source de la tabla de act
      });
    }else{//agregar
      this.activityService.addActivity(newActividad).subscribe((updateActividad)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Actividad "${newActividad.name}" agregada exitosamente.`);
        this.getActivities(); //acualizar data source de la tabla de act
    });
    }
    this.clearForm();

  }
  clearForm():void{
    this.form.reset({
      name:'',
      description:'',
      category:'',
      rating:'',
      image:'',
      price:''
    });
    this.currentId=0;
    this.isEditMode=false;
  }


}
