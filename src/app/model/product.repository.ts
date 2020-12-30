import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

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
  constructor(private dataSource: StaticDataSource) {

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
}