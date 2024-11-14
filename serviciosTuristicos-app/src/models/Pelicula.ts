export interface Pelicula{

    //propiedades 
    id?:number; //el id es opcional porque al crear una peli no lo tenemos aun
    title: string;
    genre: string;
    releaseDate: string;
    isAvaliable: boolean;
    rating: string;
    poster: string;
    budget: number;
    
}
