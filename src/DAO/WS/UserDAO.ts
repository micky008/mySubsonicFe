import { AbstractDAO } from "./abstract/AbstractDAO";
import { User } from "../../entity/User";
import { HttpClient } from "@angular/common/http";

export class UserDAO extends AbstractDAO<User> {

    constructor(http: HttpClient) {
        super(http, "users");
    }

    //@Path("insert")
    //@Path("login")

    public insertUser(user : User) : Promise<boolean> {
        let route = this.getFullRoute('insert');
        return this.http.post<boolean>(route,user).toPromise();
    }
    public loginUser(user : User) : Promise<boolean> {
        let route = this.getFullRoute('login');
        return this.http.post<boolean>(route,user).toPromise();
    }

}