import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMessage } from '../../interfaces/imessage';
import * as signalR from "@microsoft/signalr";
import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class MessageServiceService {

    private hubConnection: signalR.HubConnection;
    private messages = new Subject<IMessage>();

    constructor() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.backendUrl + environment.messageHub)
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connected to SignalR hub'))
            .catch(err => console.error('Error connecting to SignalR hub:', err));

        this.hubConnection.on("messageReceived", (message: IMessage) => {
            console.log(message);
            this.OnMessageReceived(message)
        });
    }

    CloseConnection(): void {
        this.hubConnection.stop();
    }

    private OnMessageReceived(message: IMessage): void {
        this.messages.next(message);
    }

    SendMessage(message: IMessage): void {
        this.hubConnection.invoke("newMessage", message);
    }

    GetMessages(): Subject<IMessage> {
        return this.messages;
    }

}
