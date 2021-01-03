/**Este fichero es para evitar la navegacion directa sin pasar por 
 * el login y asi evitar errores.
 */
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot,
 Router } from "@angular/router";
import { AuthService } from "../model/auth.service";


@Injectable()
export class AuthGuard {

    constructor(private router: Router,
                private auth: AuthService) { }

    //basicamente comprueba si vengo de auth o no
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        if (!this.auth.authenticated) {
            this.router.navigateByUrl("/admin/auth");
            return false;
        }
        return true;
    }
}