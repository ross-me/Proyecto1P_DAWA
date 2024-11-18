import { Routes } from '@angular/router';
import { ListaPeliculasComponent } from './components/lista-peliculas/lista-peliculas.component';
import { ListaActividadesComponent } from './components/lista-actividades/lista-actividades.component';


export const routes: Routes = [
    {path:"lista-peliculas", component: ListaPeliculasComponent},
    {path:"lista-actividades", component: ListaActividadesComponent},
    //{path:"crud-peliculas", component: CrudPeliculasComponent},
    //rutas por defecto
    {path:"", redirectTo: "lista-peliculas", pathMatch:'full'}, //no existe
    {path:"**", redirectTo: "lista-peliculas"} //equivocada el "**" representa cualquier otra ruta q 
    //esté dentro de las colocadas arriba

];
