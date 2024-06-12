import { Component, OnDestroy, OnInit } from '@angular/core';
import { RandomStringServiceService } from '../../services/RT/random-string-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-random-string',
    standalone: true,
    imports: [],
    templateUrl: './random-string.component.html',
    styleUrl: './random-string.component.scss'
})
export class RandomStringComponent implements OnInit, OnDestroy {

    str: string = "";

    constructor(private rdmStrService: RandomStringServiceService, private http: HttpClient) { }

    ngOnInit(): void {
        this.startListening();
        this.rdmStrService.GetString().subscribe((x: string) => this.str = x);

    }
    ngOnDestroy(): void {
        this.rdmStrService.CloseConnection();
    }

    private startListening() {
        this.http.get<string>('http://localhost:5230/api/Test')
            .subscribe((x: string) => {
                console.log(x);
            });
    }
}