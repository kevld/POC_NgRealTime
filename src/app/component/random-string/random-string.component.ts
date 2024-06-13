import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { StartRandomStringConnectionAction, StopRandomStringConnectionAction } from '../../actions/real-time-actions.action';
import { RealTimeState } from '../../states/real-time-state.state';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-random-string',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './random-string.component.html',
    styleUrl: './random-string.component.scss'
})
export class RandomStringComponent implements OnInit, OnDestroy {

    private store: Store = inject(Store);

    
    str$: Observable<string> = this.store.select(RealTimeState.latestString);

    ngOnInit(): void {
        this.store.dispatch(new StartRandomStringConnectionAction());

    }
    ngOnDestroy(): void {
        this.store.dispatch(new StopRandomStringConnectionAction());
    }

    
}