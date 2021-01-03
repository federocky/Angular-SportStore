//componente encargado de crear o editar un articulo
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
    templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent { 

    editing: boolean = false;
    product: Product = new Product();

    constructor(private repository: ProductRepository,
                private router: Router,
                activeRoute: ActivatedRoute) {
        
        //sabe si llego mediante editar
        this.editing = activeRoute.snapshot.params["mode"] == "edit";

        if (this.editing) {
            Object.assign(this.product,
            repository.getProduct(activeRoute.snapshot.params["id"]));
        }
    }
    
    //guarda la edicion realizada y lleva a main
    save(form: NgForm) {
        this.repository.saveProduct(this.product);
        this.router.navigateByUrl("/admin/main/products");
    }
}