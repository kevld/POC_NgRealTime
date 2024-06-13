import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMessage } from '../../interfaces/imessage';
import * as signalR from "@microsoft/signalr";
import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

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
            this.onMessageReceived(message)
        });
    }

    stopConnection(): void {
        this.hubConnection.stop();
    }

    private onMessageReceived(message: IMessage): void {
        this.messages.next(message);
    }

    sendMessage(message: IMessage): void {
        this.hubConnection.invoke("newMessage", message);
    }

    getMessages(): Subject<IMessage> {
        return this.messages;
    }

}
