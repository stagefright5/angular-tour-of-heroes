import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
    selector: 'app-hero-detail',
    template: `
        <div *ngIf="hero">
            <h2>{{ hero.name | uppercase }} Details</h2>
            <div>id: {{ hero.id }}</div>
            <div>
                <label
                    >name:
                    <input [(ngModel)]="hero.name" placeholder="name" />
                </label>
            </div>
        </div>
        <button (click)="goBack()">go back</button>
        <button (click)="save()">save</button>
    `,
    styles: [
        `
            button {
                font-family: Arial;
                background-color: #eee;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                cursor: hand;
            }

            button:hover {
                background-color: rgb(80, 80, 80);
                color: white;
            }
        `,
    ],
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero = {} as Hero;
    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getHero();
    }

    getHero(): void {
        const id = +this.route.snapshot.paramMap.get('id')!;
        this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
    }
    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
}
