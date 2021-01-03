import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order.model";
//en el capitulo 9 comentamos esto ya que ahora usamos el siguiente
//import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from "./rest.datasource";


@Injectable()
export class OrderRepository {

    private orders: Order[] = [];
    private loaded: boolean = false;

    constructor(private dataSource: RestDataSource) {}

    /**
     * hecho en el capitulo 9 recibe las orders del repository para
     * asegurarse que no se puedan mandar hasta que no se haya
     * autenticado.
     */
    loadOrders() {
        this.loaded = true;
        this.dataSource.getOrders()
        .subscribe(orders => this.orders = orders);
    }

    getOrders(): Order[] {

        if (!this.loaded) {
            this.loadOrders();
        }
        return this.orders;
    }
    
    saveOrder(order: Order): Observable<Order> {
        return this.dataSource.saveOrder(order);
    }

    //IMPLEMENTA NUEVOS METODOS DE ADMINISTRACION EN EL CAPITULO 9 PAG 197

    /**
     * Actualiza un pedido
     */
    updateOrder(order: Order) {

        this.dataSource.updateOrder(order).subscribe(order => {
            this.orders.splice(this.orders.
            findIndex(o => o.id == order.id), 1, order);
        });
    }

    /**
     * Elimina un pedido
     */
    deleteOrder(id: number) {

        this.dataSource.deleteOrder(id).subscribe(order => {
            this.orders.splice(this.orders.findIndex(o => id == o.id), 1);
        });
    }
}