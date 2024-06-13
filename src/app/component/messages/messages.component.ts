import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IMessage } from '../../interfaces/imessage';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { RealTimeState } from '../../states/real-time-state.state';
import { Observable } from 'rxjs';
import { SendMessageAction, StartMessageConnectionAction, StopMessageConnectionAction } from '../../actions/real-time-actions.action';

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [FormsModule, AsyncPipe],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, OnDestroy {

    private store: Store = inject(Store);

    username: string = "";
    message: string = "";

    messages$: Observable<IMessage[]> = this.store.select(RealTimeState.latestMessages);

    ngOnInit(): void {
        this.store.dispatch(new StartMessageConnectionAction());
    }
    ngOnDestroy(): void {
        this.store.dispatch(new StopMessageConnectionAction());
    }

    sendMessage() {
        if (!this.username.length || !this.message.length) {
            alert('Fill fields before sending message.')
        } else {
            const message: IMessage = {
                name: this.username,
                message: this.message
            };

            this.store.dispatch(new SendMessageAction(message));
        }
    }
}
