/**
 * I am going to define an Angular feature model that will allow the data model
 *  functionality to be easily used elsewhere in the application.
 */
import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasource";
import { Cart } from "./cart.model";

import { Order } from "./order.model";
import { OrderRepository } from "./order.repository";

import { RestDataSource } from "./rest.datasource";
import { HttpClientModule } from "@angular/common/http";

//esto para la autenticacion, capitulo 9
import { AuthService } from "./auth.service";


/**
 * el decorador ngmodule se utiliza para crear feature modules y sus propiedades
 * le dicen a angular como el modulon debe ser utilizado.
 * en este caso providers que le dice a angular cuales son las clases van a ser
 * utilizadas como servicios para la injeccion de dependencias
 * estas dos clases son las que creamos anteriormente.
 */
@NgModule({
    imports: [HttpClientModule],
    providers: [ProductRepository, Cart, Order, OrderRepository, 
        { provide: StaticDataSource, useClass: RestDataSource },
        RestDataSource, AuthService]
})
export class ModelModule { }