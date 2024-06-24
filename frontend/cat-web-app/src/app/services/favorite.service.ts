import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private favorites: string[] = [];
    private sessionStorageKey = 'favoriteCats';

    constructor() {
        this.loadSessionFavorites();
        this.clearFavorites();
    }

    addToFavorites(catName: string): void {
        if (!this.isFavorite(catName)) {
            this.favorites.push(catName);
            this.saveSessionFavorites();
        }
    }

    removeFromFavorites(catName: string): void {
        const index = this.favorites.indexOf(catName);
        if (index !== -1) {
            this.favorites.splice(index, 1);
            this.saveSessionFavorites();
        }
    }

    isFavorite(catName: string): boolean {
        return this.favorites.includes(catName);
    }

    getFavorites(): string[] {
        return this.favorites;
    }

    clearFavorites(): void {
        this.favorites = [];
        sessionStorage.removeItem(this.sessionStorageKey);
    }

    private saveSessionFavorites(): void {
        sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(this.favorites));
    }

    private loadSessionFavorites(): void {
        const storedFavorites = sessionStorage.getItem(this.sessionStorageKey);
        if (storedFavorites) {
            this.favorites = JSON.parse(storedFavorites);
        }
    }
}
