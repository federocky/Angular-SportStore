import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";

const PROTOCOL = "http";
const PORT = 3500;

/**el protocolo httpClient es usado para hacer peticiones http */

@Injectable()
export class RestDataSource {

    baseUrl: string;

    constructor(private http: HttpClient) {
        //aqui utilizamos el protoclo que es HTTP y el puerto 3500 en este caso
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    //utilizamos los mismos metodos que antes para al http
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products");
    }


    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "orders", order);
    }
}