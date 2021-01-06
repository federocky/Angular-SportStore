import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";

//importado en cap 10
import { ConnectionService } from "../model/connection.service";


@Component({
    templateUrl: "cartDetail.component.html"
})
export class CartDetailComponent {

    public connected: boolean = true;

    constructor(public cart: Cart,  private connection: ConnectionService) {

        /**
         * este metodo del cap 10 esta a la escucha mediante el subscribe de cambios
         * en el estado de la conexion utilizando la clase conectionservice
         * si hay algun cambio saltara. y se desabilitara la opcion desde el html
         */
        this.connected = this.connection.connected;
        connection.Changes.subscribe((state) => this.connected = state);
     }
}