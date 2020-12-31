import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { StoreModule } from "./store/store.module";
import { StoreComponent } from "./store/store.component";
import { CheckoutComponent } from "./store/checkout.component";
import { CartDetailComponent } from "./store/cartDetail.component";
import { RouterModule } from "@angular/router";
import { StoreFirstGuard } from "./storeFirst.guard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, StoreModule,
    /*Aqui el routerModule.forRoot relaciona una url que es lo que esta entre comillas
    con un componente. La ultima ** es como un default, si no se encuentra ruta se va ahi.*/
    RouterModule.forRoot([
    { path: "store", component: StoreComponent, canActivate: [StoreFirstGuard] },
    { path: "cart", component: CartDetailComponent, canActivate: [StoreFirstGuard] },
    { path: "checkout", component: CheckoutComponent, canActivate: [StoreFirstGuard] },
    { path: "**", redirectTo: "/store" }
    ])],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
