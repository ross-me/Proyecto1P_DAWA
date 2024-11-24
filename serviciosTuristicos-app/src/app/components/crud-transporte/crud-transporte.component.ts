import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Transporte } from '../../../models/transporte';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {TransportejsonService} from '../../services/transportejson.service'
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';

@Component({
  selector: 'app-crud-transporte',
  standalone: true,
  imports: [MatFormField, MatLabel, MatButtonModule, MatInputModule, MatTableModule, MatPaginatorModule,
    MatRadioButton, MatSelectModule, MatCheckboxModule, MatOptionModule, MatFormFieldModule,
    MatNativeDateModule, ReactiveFormsModule
  ],
  templateUrl: './crud-transporte.component.html',
  styleUrl: './crud-transporte.component.css'
})
export class CrudTransporteComponent implements OnInit, AfterViewInit{
  title="CRUD de Transportes";
  form!:FormGroup;
  isEditMode: boolean=false;
  currentId!:number;

  dataSource = new MatTableDataSource<Transporte>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.gettransport();
    this.form = this.fb.group({
      "type": ["", [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      "brand": ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/)]],
      "description": ["", [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,"°]+$/)]],
      "capacity": ["", [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      "comfort": ["", [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,"°]+$/)]],
      "image": ["", [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w.-]+)+[\w-]+(\.[\w-]+)+([\/?].*)?$/)]],
      "price": ["", [Validators.required, Validators.min(5), Validators.max(1000), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    })
  }

  constructor(private transportService:TransportejsonService, private fb: FormBuilder, private mydialog: MatDialog){

  }

  gettransport():void{
    this.transportService.getTransport().subscribe((datos:Transporte[])=>{
      this.dataSource.data = datos;
    });
  }

  search(searchImput:HTMLInputElement){
    if(searchImput.value){
      this.transportService.getTransportSearch(searchImput.value).subscribe((datos:Transporte[])=>{
        this.dataSource.data = datos;
      });
    }else{
      this.gettransport();
    }

  }
  eliminar(transporte:Transporte){
    const dialogRef= this.mydialog.open(MyDialogComponent,{
      data:{
        titulo: "Eliminacion del Transporte",
        contenido: "Estas seguro de eliminar " +transporte.brand +"?"

      },
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="aceptar"){
        this.transportService.deletetransport(transporte).subscribe(()=>{
          alert("Eliminacion exitosa");
          this.gettransport();
        });
      }else if(result==="cancelar"){
        console.error("Cancelar");
      }
    });
  }

  editar(transporte:Transporte){
    this.isEditMode = true;
    if( transporte && transporte.id){
      this.currentId = transporte.id;
    }else{
      console.log("Transporte o el ID del transporte estan undefined");
    }
    

    this.form.setValue({
      "type": transporte.type,
      "brand": transporte.brand,
      "description": transporte.description,
      "capacity": transporte.capacity,
      "comfort": transporte.comfort,
      "image": transporte.image? transporte.image:'',
      "price": transporte.price
    });
  }


  onSubmit(){
    if(this.form.invalid){
      console.log("invalid");
      return;
    }

    const newTransporte:Transporte = this.form.value;

    if(this.isEditMode){
      newTransporte.id=this.currentId;
      this.transportService.updatetransport(newTransporte).subscribe((updateTransport)=>{
          alert("Transporte editado exitosamente");
          this.gettransport();
      });
    }else{
      this.transportService.addtransport(newTransporte).subscribe((addTransport)=>{
        alert("Transporte agregado exitosamente");
        this.gettransport();
    });
    }
    this.clearForm();

  }

  clearForm():void{

    this.form.reset({
      type: '',
      brand: '',
      description: '',
      capacity: '',
      comfort: '',
      image: '',
      price: ''
    });
    this.currentId = 0;

    this.isEditMode = false;


  }
}
