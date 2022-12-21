import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <h1>{{ title }}</h1>
        <router-outlet></router-outlet>
        <nav>
            <a class="a" routerLink="/dashboard">Dashboard</a>
            <a class="b" routerLink="/heroes">Heroes</a>
        </nav>
        <app-messages></app-messages>
    `,
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Tour of Heroes';
    header = 'this is a Header!';
}
