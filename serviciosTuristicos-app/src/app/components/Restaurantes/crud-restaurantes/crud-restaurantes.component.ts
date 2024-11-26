import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Restaurante } from '../../../models/restaurante'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RestaurantesService } from '../../../services/ServiciosRestaurantes/restaurantes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacion } from '../../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { SnackBarExito } from "../../shared/SnackBar-Exito/snackbar-exito.component";
import { TablaCrudComponent } from "../../shared/TablaCRUD/tabla-crud.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Footer } from '../../shared/FooterComponente/footer.component';

@Component({
  selector: 'app-crud-restaurantes',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatTableModule, MatPaginatorModule,
    MatRadioModule, MatSelectModule, MatCheckboxModule, MatOptionModule, MatFormFieldModule,
    MatNativeDateModule, ReactiveFormsModule, MatDividerModule, TablaCrudComponent, Footer],
  templateUrl: './crud-restaurantes.component.html',
  styleUrl: './crud-restaurantes.component.css'
})
export class CrudRestaurantesComponent {
  Title = 'CRUD de Restaurantes';
  form!:FormGroup;
  isEditMode: boolean=false;
  currentId!:number;
  dataSource = new MatTableDataSource<Restaurante>();
  columns = [
    { key: 'Nombre', label: 'Nombre' },
    { key: 'Tipo', label: 'Tipo' },
    { key: 'Especialidad', label: 'Especialidad' },
    { key: 'Direccion', label: 'Dirección' }
  ];
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit():void{
    this.getRestaurantes();
    this.form = this.fb.group({
      Nombre: ["",[Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      Tipo: ["", Validators.required],
      Especialidad: ["",[Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]+$/)]],
      Calificacion: ["",[Validators.required, Validators.min(0.5), Validators.max(5)]],
      Direccion: ["", [Validators.required, Validators.minLength(10), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,.]+$/)]],
      Foto: ["", [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/)]]
    });
  
  }
  constructor(private RestaurantesService: RestaurantesService, private fb:FormBuilder, 
    private mydialog: MatDialog, private snackBar: MatSnackBar ){
    
  }

  getRestaurantes():void{
    this.RestaurantesService.getRestaurantes().subscribe((datos:Restaurante[])=>{
      this.dataSource.data = datos;
      }); 
  }

  search(searchInput: HTMLInputElement){
    if(searchInput.value){
      this.RestaurantesService.getRestaurantesSearch(searchInput.value).subscribe((datos:Restaurante[])=>{
        this.dataSource.data = datos;
      });

    }else{
      this.getRestaurantes();
    }
  }

  eliminar(Restaurante:Restaurante){
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: "Eliminacion de Restaurante",
        contenido: "Estas seguro de eliminar el Restaurante " +Restaurante.Nombre +"?"

      },
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="aceptar"){
        this.RestaurantesService.deleteRestaurantes(Restaurante).subscribe(()=>{
          SnackBarExito.showSnackBar(this.snackBar, `Restaurante "${Restaurante.Nombre}" eliminado exitosamente.`);
          this.getRestaurantes();
        });
      }else if(result==="cancelar"){
        console.error("Cancelar");
      }
    });
  }

  editar(restaurante:Restaurante){
    this.isEditMode=true;
    if(restaurante && restaurante.id){
      this.currentId = restaurante.id;
    }else{
      console.log("Restaurante o id del Restaurante undefined")
    }

    this.form.setValue({
      Nombre:restaurante.Nombre,
      Tipo:restaurante.Tipo,
      Especialidad:restaurante.Especialidad,
      Calificacion:restaurante.Calificacion,
      Direccion:restaurante.Direccion,
      Foto:restaurante.Foto,
    });
  }

  onSubmit(){
    if(this.form.invalid){
      console.log("invalid");
      return;
    }

    const newRestaurante:Restaurante = this.form.value;

    if(this.isEditMode){
      newRestaurante.id=this.currentId;
      this.RestaurantesService.updateRestaurantes(newRestaurante).subscribe((updateRestaurantes)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Restaurante "${newRestaurante.Nombre}" editado exitosamente.`);
        this.getRestaurantes();
      });
    }else{
      this.RestaurantesService.addRestaurantes(newRestaurante).subscribe((addRestaurantes)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Restaurante "${newRestaurante.Nombre}" agregado exitosamente.`);
        this.getRestaurantes();
    });
    }
    this.clearForm();

  }
  clearForm():void{
    this.form.reset({
      Nombre:'',
      Tipo:'',
      Especialidad:'',
      Calificacion:'',
      Direccion:'',
      Foto:''
    });
    this.currentId=0;
    this.isEditMode=false;
  }
}
