import { OnInit, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TransportService implements OnInit {

    private toTransport: string = "";
    private toTransportO: Observable<string>;

    constructor() { }

    ngOnInit(): void {
        this.toTransportO = of(this.toTransport);
    }

    public getMessageObservable(): Observable<string> {
        return this.toTransportO;
    }

    public setMessage(newMess: string) {
        this.toTransport.concat(newMess);
    }

}