import { Injectable, inject } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SendMessageAction, StartMessageConnectionAction, StartRandomStringConnectionAction, StopMessageConnectionAction, StopRandomStringConnectionAction } from "../actions/real-time-actions.action";
import { IMessage } from "../interfaces/imessage";
import { RandomStringService } from "../services/RT/random-string.service";
import { MessageService } from "../services/RT/message.service";

export class RealTimeStateModel {
    latestString!: string;
    latestMessages!: IMessage[];
}

@State<RealTimeStateModel>({
    name: 'rtState',
    defaults: {
        latestString: "",
        latestMessages: []
    }
})
@Injectable()
export class RealTimeState {

    private messageService: MessageService = inject(MessageService);
    private rdmStringService: RandomStringService = inject(RandomStringService);

    @Selector()
    static latestString(state: RealTimeStateModel): string {
        return state.latestString;
    }

    @Selector()
    static latestMessages(state: RealTimeStateModel): IMessage[] {
        return state.latestMessages;
    }

    @Action(StartMessageConnectionAction)
    startMessageConnection({ getState, patchState }: StateContext<RealTimeStateModel>): void {
        this.messageService.getMessages().subscribe(x => {
            const latestMessages = getState().latestMessages;

            latestMessages.push(x);
            if (latestMessages.length > 10)
                latestMessages.shift();

            patchState({
                latestMessages: latestMessages
            });
        })
    }

    @Action(StopMessageConnectionAction)
    stopMessageConnection(): void {
        this.messageService.stopConnection();
        this.messageService.getMessages().unsubscribe();
    }

    @Action(SendMessageAction)
    sendMessage(ctx: StateContext<RealTimeStateModel>, { payload }: SendMessageAction): void {
        this.messageService.sendMessage(payload);
    }

    @Action(StartRandomStringConnectionAction)
    startRandomStringConnection({ patchState }: StateContext<RealTimeStateModel>): void {
        this.rdmStringService.startListening();
        this.rdmStringService.getString().subscribe((x: string) => {
            patchState({
                latestString: x
            });
        });
    }

    @Action(StopRandomStringConnectionAction)
    stopRandomStringConnection(): void {
        this.rdmStringService.stopConnection();
        this.rdmStringService.getString().unsubscribe();
    }

}