import { Routes } from '@angular/router';
import { ListaPeliculasComponent } from './components/lista-peliculas/lista-peliculas.component';


export const routes: Routes = [
    {path:"lista-peliculas", component: ListaPeliculasComponent},
    //{path:"crud-peliculas", component: CrudPeliculasComponent},
    //rutas por defecto
    {path:"", redirectTo: "lista-peliculas", pathMatch:'full'}, //no existe
    {path:"**", redirectTo: "lista-peliculas"} //equivocada el "**" representa cualquier otra ruta q 
    //esté dentro de las colocadas arriba

];
