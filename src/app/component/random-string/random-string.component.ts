import { Component, OnDestroy, OnInit } from '@angular/core';
import { RandomStringService } from '../../services/RT/random-string.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
    selector: 'app-random-string',
    standalone: true,
    imports: [],
    templateUrl: './random-string.component.html',
    styleUrl: './random-string.component.scss'
})
export class RandomStringComponent implements OnInit, OnDestroy {

    str: string = "";

    constructor(private rdmStrService: RandomStringService, private http: HttpClient) { }

    ngOnInit(): void {
        this.startListening();
        this.rdmStrService.getString().subscribe((x: string) => this.str = x);

    }
    ngOnDestroy(): void {
        this.rdmStrService.closeConnection();
    }

    private startListening() {
        this.http.get<string>(environment.backendUrl + environment.randomStringListeningUrl)
            .subscribe((x: string) => {
                console.log(x);
            });
    }
}