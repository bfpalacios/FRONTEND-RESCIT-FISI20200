import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  citas: Cita[];
  constructor(private http: HttpClient) { 

  }
  getCitas(dni:string){
    //mediante un llmado httpcliente
    //ahora tienes que filtrar la cita por id de paciente
    return this.http.get<Cita[]>('http://localhost:8080/clinica/cita');
    
  }
  crearCita(cita:Cita){
    //cambia la ruta
    return this.http.post('pon la ruta',cita);
  }
}
