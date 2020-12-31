import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { StoreComponent } from "./store/store.component";

@Injectable()
export class StoreFirstGuard {

    private firstNavigation = true;

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        if (this.firstNavigation) {
            this.firstNavigation = false;
            if (route.component != StoreComponent) {
                this.router.navigateByUrl("/");
                    return false;
            }
        }

    return true;
    }
}

/**
 * Este fichero es para una movida de la navegacion. Creo que para
 * que no puedas meter la url directamente.
 * es decir solo puedes navegar utilizando la navegacion provista por la pagina.
 * 
 */