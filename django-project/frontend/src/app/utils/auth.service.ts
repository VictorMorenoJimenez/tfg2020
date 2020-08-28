import {Injectable} from '@angular/core';
import {AppStorageService} from './app-storage.service';

@Injectable()
export class AuthService {

    constructor(private appStorageService: AppStorageService) {
    }

    public setToken(token: string): void {
        this.appStorageService.set('token', token);
    }

    public getToken(): string {
        return this.appStorageService.get('token');
    }

    public setTokenImpersonate(token: string): void {
        this.appStorageService.set('tokenImpersonate', token);
    }

    public getTokenImpersonate(): string {
        return this.appStorageService.get('tokenImpersonate');
    }

}
