import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OrderRepository } from "../model/order.repository";
import { Order } from "../model/order.model";

//elNgForm es algo de angular para validar formularios

@Component({
    templateUrl: "checkout.component.html",
    styleUrls: ["checkout.component.css"]
})
export class CheckoutComponent {
    orderSent: boolean = false;
    submitted: boolean = false;

    constructor(public repository: OrderRepository,
                public order: Order) {}


    /**
     * cuando el usuario envie un formulario.
     * si los datos son validos el objeto Order al repositorio
     * y el carro es vaciado.
     */
    submitOrder(form: NgForm) {
        this.submitted = true;

        if (form.valid) {
            this.repository.saveOrder(this.order).subscribe(order => {
                this.order.clear();
                this.orderSent = true;
                this.submitted = false;
            });
        }
    }
}