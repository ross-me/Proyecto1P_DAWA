import { Routes } from '@angular/router';
import { ListaPeliculasComponent } from './components/lista-peliculas/lista-peliculas.component';
import { ListaActividadesComponent } from './components/lista-actividades/lista-actividades.component';
import { CrudActividadesRecreativasComponent } from './components/crud-actividades-recreativas/crud-actividades-recreativas.component';
import { ListaGuiasTuristicosComponent } from './components/lista-guias-turisticos/lista-guias-turisticos.component';
import { CrudGuiasTuristicosComponent } from './components/crud-guias-turisticos/crud-guias-turisticos.component';
import { CrudTransporteComponent } from './components/crud-transporte/crud-transporte.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { CrudRestaurantesComponent } from './components/crud-restaurantes/crud-restaurantes.component';
import { ListaRestaurantesComponent } from './components/lista-restaurantes/lista-restaurantes.component';


export const routes: Routes = [
    {path:"lista-peliculas", component: ListaPeliculasComponent},
    {path:"lista-actividades", component: ListaActividadesComponent},
    {path:"transporte", component: TransporteComponent},
    {path:"lista-restaurantes", component: ListaRestaurantesComponent},
    {path:"Crud-transporte", component: CrudTransporteComponent},
    {path:"crud-actividadesRecreativas", component: CrudActividadesRecreativasComponent},
    {path:"lista-guias-turisticos", component: ListaGuiasTuristicosComponent},
    {path:"crud-guias-turisticos", component: CrudGuiasTuristicosComponent},
    {path:"crud-restaurantes", component: CrudRestaurantesComponent},
    //{path:"crud-peliculas", component: CrudPeliculasComponent},
    //rutas por defecto
    {path:"", redirectTo: "lista-peliculas", pathMatch:'full'}, //no existe
    {path:"**", redirectTo: "lista-peliculas"} //equivocada el "**" representa cualquier otra ruta q 
    //esté dentro de las colocadas arriba

];
