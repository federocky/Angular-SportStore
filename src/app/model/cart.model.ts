import { Injectable } from "@angular/core";
import { Product } from "./product.model";


@Injectable()
export class Cart {

    public lines: CartLine[] = [];
    public itemCount: number = 0;
    public cartPrice: number = 0;

    /**
     * Agrega un producto al carro, si no se introduce cantidad insertara 1
     */
    addLine(product: Product, quantity: number = 1) {

        //guardamos e la variable line el producto ingresado si este existe en el carro
        let line = this.lines.find(line => line.product.id == product.id);
        
        //si existe sumamos la cantidad y si no lo agregamnos.
        if (line != undefined) {
            line.quantity += quantity;
        } else {
            this.lines.push(new CartLine(product, quantity));
        }

        this.recalculate();
    }

    /**
     * Actualiza la cantidad de un producto
     */
    updateQuantity(product: Product, quantity: number) {

        let line = this.lines.find(line => line.product.id == product.id);

        if (line != undefined) {
            line.quantity = Number(quantity);
        }

        this.recalculate();
    }

    /**
     * Quita un producto del carro
     */
    removeLine(id: number) {
        
        ///busca el indice del producto
        let index = this.lines.findIndex(line => line.product.id == id);
        
        //lo elimina del carro
        this.lines.splice(index, 1);
        this.recalculate();
    }

    /**
     * Borra todo del carro
     */
    clear() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }

    
    /**
     * Actualiza los totales. utilizadada cada vez que se ingresa un producto
     */
    private recalculate() {
        
        this.itemCount = 0;
        this.cartPrice = 0;

        this.lines.forEach(l => {
            this.itemCount += l.quantity;
            this.cartPrice += (l.quantity * l.product.price);
        })
    }

}


/**
 * no me queda del todo claro para que
 */
export class CartLine {
    constructor(public product: Product,
                public quantity: number) {}


    get lineTotal() {
        return this.quantity * this.product.price;
    }
}