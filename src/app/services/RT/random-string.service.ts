import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from '../../../environments/environment.development';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RandomStringService {

    private hubConnection: signalR.HubConnection;
    private str = new Subject<string>();

    constructor(private http: HttpClient) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.backendUrl + environment.randomStringHub)
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connected to SignalR hub'))
            .catch(err => console.error('Error connecting to SignalR hub:', err));

        this.hubConnection.on("newStringReceived", (str: string) => {
            console.log(str);
            this.onStringReceived(str)
        });
    }

    stopConnection(): void {
        this.hubConnection.stop();
    }

    onStringReceived(str: string) {
        this.str.next(str);
    }

    getString(): Subject<string> {
        return this.str;
    }

    startListening(): void {
        this.http.get<string>(environment.backendUrl + environment.randomStringListeningUrl)
            .subscribe((x: string) => {
                console.log(x);
            });
    }
}
