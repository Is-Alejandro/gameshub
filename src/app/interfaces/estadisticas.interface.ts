export interface Estadisticas {
    totalJuegos: number;
    juegosGratis: number;
    juegosPago: number;
    mejorRating: {
      nombre: string;
      rating: number;
    };
    promedioPrecio: number;
  }