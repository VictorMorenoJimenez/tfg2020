import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable({
    providedIn: 'root',
})
export class AppStorageService {
    constructor(
        public localStorageService: LocalStorageService,
        public sessionStorageService: SessionStorageService
    ) {}

    public set(key: string, value: string): void {
        this.localStorageService.store(key, value);
    }

    public get(key: string): string{
        return this.localStorageService.retrieve(key);
    }

    public clear(): void {
        this.localStorageService.clear('decorators'); // removes only variables created by decorating functions
        this.localStorageService.clear('prefix'); // removes variables starting with set prefix (including decorators)
        this.sessionStorageService.clear('all'); // removes all session storage data
    }
}
