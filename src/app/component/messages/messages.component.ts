import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageServiceService } from '../../services/RT/message-service.service';
import { Observable } from 'rxjs';
import { IMessage } from '../../interfaces/imessage';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, OnDestroy {
    
    username: string = "";
    message: string = "";

    messages: IMessage[] = [];

    
    constructor(private messageService: MessageServiceService) {
    }

    ngOnInit(): void {
        this.messageService.GetMessages().subscribe(x => {
            this.messages.push(x);
            
            if(this.messages.length > 10) {
                // Display last 10 msg
                this.messages.shift();
            }
        });
    }
    ngOnDestroy(): void {
        this.messageService.CloseConnection();
    }

    sendMessage() {
        if(!this.username.length || !this.message.length) {
            alert('Fill fields before sending message.')
        } else {
            const message: IMessage = {
                name: this.username,
                message: this.message
            };

            this.messageService.SendMessage(message);
        }
    }
}
