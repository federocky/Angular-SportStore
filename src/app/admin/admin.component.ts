import { Component } from "@angular/core";

//para implementar logout method
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";

@Component({
 templateUrl: "admin.component.html"
})
export class AdminComponent {

    constructor(private auth: AuthService,
                private router: Router
    ) { }

    /**
     * metodo logout y redirecciona a home
     */
    logout() {
        this.auth.clear();
        this.router.navigateByUrl("/");
    }            
}