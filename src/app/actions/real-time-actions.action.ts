import { IMessage } from "../interfaces/imessage";

export class StartMessageConnectionAction {
    static readonly type = '[RealTime] StartMessageConnectionAction';
}

export class StopMessageConnectionAction {
    static readonly type = '[RealTime] StopMessageConnectionAction';
}

export class SendMessageAction {
    static readonly type = '[RealTime] SendMessageAction';
    constructor(public payload: IMessage) { }
}

export class StartRandomStringConnectionAction {
    static readonly type = '[RealTime] StartRandomStringConnectionAction';
}

export class StopRandomStringConnectionAction {
    static readonly type = '[RealTime] StopRandomStringConnectionAction';
}
