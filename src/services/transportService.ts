import { OnInit, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TransportService {

    private toTransport: MyText;
    private toTransportO: Observable<MyText>;

    constructor() {
        this.toTransport = new MyText();
        this.toTransportO = of(this.toTransport);
    }

    public getMessageObservable(): Observable<MyText> {
        return this.toTransportO;
    }

    public setMessage(newMess: string) {
        this.toTransport.text = newMess;
    }

}

export class MyText {
    public text: string;

    public bin2Html(): string {
        return this.text.replace('\n', '<br/>');
    }
}