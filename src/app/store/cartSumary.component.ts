import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";

@Component({
    selector: "cart-summary",
    templateUrl: "cartSumary.component.html"
})
export class CartSummaryComponent {

    constructor(public cart: Cart) { }

}