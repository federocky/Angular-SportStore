import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class AuthService {

    constructor(private datasource: RestDataSource) {}

    //realiza la autenticacion desde el metodo de la otra clase
    authenticate(username: string, password: string): Observable<boolean> {
        return this.datasource.authenticate(username, password);
    }

    //devuelve el resultado
    get authenticated(): boolean {
        return this.datasource.auth_token != null;
    }

    //limpia el token
    clear() {
        this.datasource.auth_token = null;
    }
}