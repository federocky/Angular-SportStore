import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";

//esto es para la autenticacion capitulo 9
import { map } from "rxjs/operators";

//tambien para la autenticacion
import { HttpHeaders } from '@angular/common/http';


const PROTOCOL = "http";
const PORT = 3500;

/**el protocolo httpClient es usado para hacer peticiones http */

@Injectable()
export class RestDataSource {

    baseUrl: string;
    auth_token: string;

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

    authenticate(user: string, pass: string): Observable<boolean> {
        
        /**aqui mas o menos lo que entiendo es que devuelve el resultado del envio por post
         * de los parametros que recibe la funcion. el resultado es o token o null. 
         */
        return this.http.post<any>(this.baseUrl + "login", {
            name: user, password: pass
            }).pipe(map(response => {
            this.auth_token = response.success ? response.token : null;
            return response.success;
        }));
    }

    //LO SIGUIENTE ES DEL CAPITULO 9, PARA LA ADMINISTRACION

    /**
     * crea un nuevo producto y lo guarda via post
     */
    saveProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl + "products",
        product, this.getOptions());
    }

    /**
     * actualiza un produto por id.
     */
    updateProduct(product): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}products/${product.id}`,
        product, this.getOptions());
    }

    /**
     * Elimina un producto por id
     */
    deleteProduct(id: number): Observable<Product> {
        return this.http.delete<Product>(`${this.baseUrl}products/${id}`,
        this.getOptions());
    }


    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + "orders", this.getOptions());
    }


    deleteOrder(id: number): Observable<Order> {
        return this.http.delete<Order>(`${this.baseUrl}orders/${id}`,
        this.getOptions());
    }


    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`,
        order, this.getOptions());
    }


    private getOptions() {
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer<${this.auth_token}>`
            })
        }
    }
}