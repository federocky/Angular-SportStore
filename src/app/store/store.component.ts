import { Component } from "@angular/core";

//la clase que describe el producto
import { Product } from "../model/product.model"; 
/**
 * la clase que describe como accedo a los productos que tiene get product etc
 * son los metodos que utilizo mas adelante.
 */
import { ProductRepository } from "../model/product.repository"; 


@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent {
    //agregamos filtro por categoria
    public selectedCategory = null;
    
    ///agregamos paginacion
    public productsPerPage = 4;
    public selectedPage = 1;
    
    constructor(private repository: ProductRepository) { }

    //almaceno en la variable products todos los productos
    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage
        return this.repository.getProducts(this.selectedCategory)
        .slice(pageIndex, pageIndex + this.productsPerPage);
    }
    
    ///almaceno en categorias todas las categorias.
    get categories(): string[] {
        return this.repository.getCategories();
    }
    
    //metodo que cambia la categoria.
    changeCategory(newCategory?: string) {
        this.selectedCategory = newCategory;
    }

    //metodo para cambiar la pagina
    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    //metodo que cambia la cantidad de productos por pagina
    changePageSize(newSize: number) {
        this.productsPerPage = Number(newSize);
        this.changePage(1);
    }

    //metodo q que devuelve la cantidad de paginas

/*     get pageNumbers(): number[] {
        return Array(Math.ceil(this.repository
        .getProducts(this.selectedCategory).length / this.productsPerPage))
        .fill(0).map((x, i) => i + 1);
    } 
    Camnbiamos este metodo por el siguiente que implementa el counter directive.ts O ESO CREO.
    */
    get pageCount(): number {
        return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage);
    }


}