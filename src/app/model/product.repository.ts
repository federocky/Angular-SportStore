import { Injectable } from "@angular/core";
import { Product } from "./product.model";

//en el capitul * comentamos el static data source ya que no lo estam os usando
//import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from "./rest.datasource";
/**
 * El decorador injectable se aplica para decirle a angular
 * que esta clase va a ser utilizada como un servicio. Por tanto se permitira
 * a otras clases acceder a sus funcionalidades a traves de la dependency injection
 */
@Injectable()
export class ProductRepository {

  private products: Product[] = [];
  private categories: string[] = [];

  /**
   * cuando angular necesita crear una nueva instancia de un repositorio
   * inspeccionara la clase para ver si necesita StaticDataSource object para invokar
   * el ProductRepository constructor y crear un nuevo objeto. ¿? algo relacionado
   * con el observable.
   */
  constructor(private dataSource: RestDataSource) {

    dataSource.getProducts().subscribe((data) => {

      this.products = data;
      this.categories = data
        .map((p) => p.category)
        .filter((c, index, array) => array.indexOf(c) == index)
        .sort();
    });
  }


  getProducts(category: string = null): Product[] {

    return this.products.filter(
      (p) => category == null || category == p.category
    );
  }


  getProduct(id: number): Product {

    return this.products.find((p) => p.id == id);
  }


  getCategories(): string[] {
    return this.categories;
  }

  //metoodo del capitulo 9 de administracion
  //que permite guardar un producto
  saveProduct(product: Product) {

    //si paso la validacion guardo el producto en products
    if (product.id == null || product.id == 0) {
      this.dataSource.saveProduct(product)
      .subscribe(p => this.products.push(p));

    } else {
      

      this.dataSource.updateProduct(product)
      .subscribe(p => {
        this.products.splice(this.products.
        findIndex(p => p.id == product.id), 1, product);
      });
    }
  }

  /**
   * Elimina un producto por id
   */
  deleteProduct(id: number) {
    
    this.dataSource.deleteProduct(id).subscribe(p => {
    this.products.splice(this.products.
    findIndex(p => p.id == id), 1);
    })
  }
}