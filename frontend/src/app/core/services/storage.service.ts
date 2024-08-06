import { Injectable } from '@angular/core';
import { BrowserStorage } from '../models/storage';
import { UserSession } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService implements BrowserStorage {
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private set(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  private get(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    } else {

      return null;
    }
  }

  private remove(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  getUserSession (): UserSession {
    return JSON.parse(this.get('user') as string)
  }
  setUserSession (value: UserSession): void {
    this.set('user',JSON.stringify(value))
  }
  clearSession (): void {
    this.remove('user')
  }
}
