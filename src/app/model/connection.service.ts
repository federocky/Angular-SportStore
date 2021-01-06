import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

/**
 * Esta clase del capitulo 10 se encarga de comprobar el estado de la conexion
 * para que la aplicacion pueda funcionar cuando no haya conexion a internet 
 * pero de una manera diferente, por ejemplo sin opcion de checkout.
 * para esto deja a window a la escucha del evento online u offline
 */


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private connEvents: Subject<boolean>;

  constructor() { 

    this.connEvents = new Subject<boolean>();

    window.addEventListener("online",
    (e) => this.handleConnectionChange(e));

    window.addEventListener("offline",
    (e) => this.handleConnectionChange(e));
  }


  private handleConnectionChange(event) {
    this.connEvents.next(this.connected);
  }

  get connected() : boolean {
    return window.navigator.onLine;
  }


  get Changes(): Observable<boolean> {
    return this.connEvents;
  }

}
