import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Excursion } from '../../models/Excursion';
import { MatPaginator } from '@angular/material/paginator';
import { ExcursionesjsonService } from '../../services/ServiciosExcursiones/excursionesjson.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, DialogoConfirmacion } from '../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-crud-excursiones',
  standalone: true,
  imports: [MatFormField, MatLabel, MatButtonModule, MatInputModule, MatTableModule,MatPaginator,
    MatSelectModule, MatOptionModule, MatFormFieldModule, ReactiveFormsModule, MatDivider],
  templateUrl: './crud-excursiones.component.html',
  styleUrl: './crud-excursiones.component.css'
})
export class CrudExcursionesComponent {
  title="Crud de Excursiones";
  form!:FormGroup;
  isEditMode:boolean=false;
  currentId!:number;

  //dataSource (fuente de datos) para mi tabla
  dataSource= new MatTableDataSource<Excursion>();
  @ViewChild(MatPaginator)paginator!:MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
  }

  ngOnInit(): void {
    this.getExcursions();
    //inicializar los variables asociadas a los componentes del formulario
    this.form=this.fb.group({
      name:["",[Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description:["",[Validators.required, Validators.minLength(10)]], 
      duration:["", [Validators.required, Validators.min(1), Validators.max(24)]],
      guideLanguage:["", Validators.required],
      price:["", [Validators.required, Validators.min(1), Validators.max(20000)]],
      image:["",[Validators.required, Validators.pattern('^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]+(\\/[\\w-]*)*(\\?.*)?(#.*)?$')]],
    });
  }

  constructor(private excursionService:ExcursionesjsonService, private fb:FormBuilder, private myDialog:MatDialog){
  }
  
  getExcursions():void{
    this.excursionService.getExcursions().subscribe((datos:Excursion[])=>{
      this.dataSource.data=datos;
    });
  }

  search(searchInput: HTMLInputElement){
    if(searchInput.value){ //si existe el valor en la caja de texto 
      //buscar
      this.excursionService.getExcursionsSearch(searchInput.value).subscribe((datos:Excursion[])=>{
        this.dataSource.data=datos;
      });
    }else{
      this.getExcursions();
    }
  }

  eliminar(excursion:Excursion){
    const dialogRef = this.myDialog.open(DialogoConfirmacion,{
      data:{
        titulo: excursion.name,
        contenido: "Estas seguro de eliminar la" + excursion.name
      }as DialogData
    }); 
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="aceptar"){ 
        this.excursionService.deleteExcursion(excursion).subscribe(()=>{
          alert("Eliminado exitosamente");
          this.getExcursions();
        });
      }else if(result==="cancelar"){
        console.log("Cancelar");
      }
    });
    
  }

  editar(excursion:Excursion){
    this.isEditMode=true;
    if(excursion && excursion.id){
      this.currentId=excursion.id;
    }else{
      console.log("Excursion o id de la excursión están undefined");
    }

    //cargar datos en el formulario
    this.form.setValue({
      name:excursion.name,
      description:excursion.description, 
      duration:excursion.duration,
      guideLanguage:excursion.guideLanguage,
      price:excursion.price,
      image:excursion.image, 
    });
  }

  
  onSubmit(){
    if(this.form.invalid){
      console.log("invalid");
      return;
    }

    const newExcursion:Excursion=this.form.value;

    if(this.isEditMode){
      newExcursion.id=this.currentId;
      this.excursionService.updateExcursion(newExcursion).subscribe((updateExcursion)=>{
        alert("Excursión actualizada con éxito");
        this.getExcursions();
      });

    }else{
      this.excursionService.addExcursion(newExcursion).subscribe((addExcursion)=>{
        alert("Excursión agregada con éxito");
        this.getExcursions();
      });
    }
    this.clearForm();
  }

  clearForm():void{
    this.form.reset({
      name:'',
      description:'', 
      duration:'',
      guideLanguage:'',
      price:'',
      image:'',
    });
    this.currentId=0;
    this.isEditMode=false;
  }
}
