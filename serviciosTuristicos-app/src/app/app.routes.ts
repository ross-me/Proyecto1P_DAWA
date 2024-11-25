import { Routes } from '@angular/router';
import { ListaActividadesComponent } from './components/lista-actividades/lista-actividades.component';
import { CrudActividadesRecreativasComponent } from './components/crud-actividades-recreativas/crud-actividades-recreativas.component';
import { ListaGuiasTuristicosComponent } from './components/lista-guias-turisticos/lista-guias-turisticos.component';
import { CrudGuiasTuristicosComponent } from './components/crud-guias-turisticos/crud-guias-turisticos.component';
import { CrudTransporteComponent } from './components/crud-transporte/crud-transporte.component';
import { TransporteComponent } from './components/lista-transporte/transporte.component';
import { CrudRestaurantesComponent } from './components/crud-restaurantes/crud-restaurantes.component';
import { ListaRestaurantesComponent } from './components/lista-restaurantes/lista-restaurantes.component';
import { ListaExcursionesComponent } from './components/lista-excursiones/lista-excursiones.component';
import { CrudExcursionesComponent } from './components/crud-excursiones/crud-excursiones.component';
import { CrudAlojamientosComponent } from './components/crud-alojamientos/crud-alojamientos.component';
import { IndexComponent } from './components/index/index.component';


export const routes: Routes = [
    {path:"lista-actividades", component: ListaActividadesComponent},
    {path:"transporte", component: TransporteComponent},
    {path:"lista-restaurantes", component: ListaRestaurantesComponent},
    {path:"lista-excursiones", component: ListaExcursionesComponent},
    {path:"Crud-transporte", component: CrudTransporteComponent},
    {path:"crud-actividadesRecreativas", component: CrudActividadesRecreativasComponent},
    {path:"lista-guias-turisticos", component: ListaGuiasTuristicosComponent},
    {path:"crud-guias-turisticos", component: CrudGuiasTuristicosComponent},
    {path:"crud-restaurantes", component: CrudRestaurantesComponent},
    {path:"crud-excursiones", component: CrudExcursionesComponent},
    {path:"crud-alojamientos", component: CrudAlojamientosComponent},
    {path:"index", component:IndexComponent},
    {path:"", redirectTo: "index", pathMatch:'full'},
    {path:"**", redirectTo: "index"}
    
    //rutas por defecto
    
    //{path:"", redirectTo: "index-servicios", pathMatch:'full'}, //no existe
    //{path:"**", redirectTo: "index-servicios"} //equivocada el "**" representa cualquier otra ruta q 
    //esté dentro de las colocadas arriba

];
