import { Injectable } from "@angular/core";
import { Cart } from "./cart.model";

//tenemos injectable porque sera un servicio
@Injectable()
export class Order {

    public id: number;
    public name: string;
    public address: string;
    public city: string;
    public state: string;
    public zip: string;
    public country: string;
    public shipped: boolean = false;


    constructor(public cart: Cart) { }

    //pone la compra a 0
    clear() {
        this.id = null;
        this.name = this.address = this.city = null;
        this.state = this.zip = this.country = null;
        this.shipped = false;
        this.cart.clear();
    }
}