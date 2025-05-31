/*
RESPUESTAS PARTE 4.1:
1. ¿En qué archivo se define la interfaz Juego?
Respuesta: src/app/interface/juego.interface.ts
2. ¿Qué archivo maneja el estado global de los filtros? 
Respuesta: src/app/component/lista-juegos/lista-juegos.component.ts
3. ¿Dónde se configura el HttpClient para la aplicación? 
Respuesta:
*/
/*
RESPUESTAS PARTE 4.2:
1. ¿Por qué este proyecto NO tiene app.module.ts? 
Respuesta: Porque usamos standalone
2. ¿Qué ventaja tiene usar BehaviorSubject en el servicio de juegos? 
Respuesta:Porque siempre nos muestra el valor actual asi lo cambiemos
*/
import { Component, OnInit } from '@angular/core';
import { JuegosDataService } from '../../services/juegos-data.service';
import { Juego } from '../../interfaces/juego.interface';


@Component({
  selector: 'app-estadisticas',
  standalone: true,
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  totalJuegos: number = 0;
  juegosGratis: number = 0;
  juegosPago: number = 0;
  mejorJuego!: Juego;
  promedioPrecio: number = 0;

  constructor(private juegosDataService: JuegosDataService) {}

  ngOnInit(): void {
    this.juegosDataService.obtenerJuegos().subscribe((juegos: Juego[]) => {
      this.totalJuegos = juegos.length;
      this.juegosGratis = juegos.filter(j => j.precio === 0).length;
      this.juegosPago = juegos.filter(j => j.precio > 0).length;
      this.mejorJuego = juegos.reduce((a, b) => (a.rating > b.rating ? a : b));
      const juegosDePago = juegos.filter(j => j.precio > 0);
      const sumaPrecios = juegosDePago.reduce((acc, juego) => acc + juego.precio, 0);
      this.promedioPrecio = juegosDePago.length > 0 ? sumaPrecios / juegosDePago.length : 0;
    });
  }
  
}
