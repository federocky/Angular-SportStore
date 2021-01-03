//componente encargado de manejar los pedidos
import { Component } from "@angular/core";
import { Order } from "../model/order.model";
import { OrderRepository } from "../model/order.repository";

@Component({
    templateUrl: "orderTable.component.html"
})
export class OrderTableComponent { 

    includeShipped = false;

    constructor(private repository: OrderRepository) {}

    /**
     * recibe todos los pedidos 
     */
    getOrders(): Order[] {
        return this.repository.getOrders()
        .filter(o => this.includeShipped || !o.shipped);
    }

    /**
     * marcar como enviado
     */
    markShipped(order: Order) {
        order.shipped = true;
        this.repository.updateOrder(order);
    }

    /**
     * eliminar order
     */
    delete(id: number) {
        this.repository.deleteOrder(id);
    }
}