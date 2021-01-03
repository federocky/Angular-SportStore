import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";


@Component({
 templateUrl: "auth.component.html"
})
export class AuthComponent {

    public username: string;
    public password: string;
    public errorMessage: string;

    constructor(private router: Router,
                private auth: AuthService) { }


    authenticate(form: NgForm) {
        //si el foprmulario es valido
        if (form.valid) {
            ///lanzamos el metodo que creamos en AuthServicecomponent
            this.auth.authenticate(this.username, this.password).subscribe(response => {
                if (response) { //si va bien ve a admin
                    this.router.navigateByUrl("/admin/main");
                }
                //si da error muestra mensaje
                this.errorMessage = "Authentication Failed";
            })
        } else { //si no es valido el formulario informa
            this.errorMessage = "Form Data Invalid";
        }
    }
}