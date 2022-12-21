import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
    selector: 'app-hero-search',
    template: `
        <div id="search-component">
            <h4>Hero Search</h4>

            <input
                #searchBox
                id="search-box"
                (keyup)="search(searchBox.value)"
            />

            <ul class="search-result">
                <li *ngFor="let hero of heroes$ | async">
                    <a routerLink="/detail/{{ hero.id }}">
                        {{ hero.name }}
                    </a>
                </li>
            </ul>
        </div>
    `,
    styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
    heroes$!: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroService: HeroService) {}

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.heroService.searchHeroes(term))
        );
    }
}
