import { Injectable } from '@angular/core';

@Injectable()
 export class StorageService {

  isSupported() {
         return sessionStorage;
    }
    setItem(key: string, value: any): void {
         sessionStorage.setItem(key, value);
    }

    getItem(key: string): any{
        let value: any = sessionStorage.getItem(key);
        return value;
    }

    setObject(key: string, object: any): void {
        if (object) {
            let value = JSON.stringify(object);
            sessionStorage.setItem(key, value);
        }
    }

    getObject(key: string, isObject = false): any {
        let value = sessionStorage.getItem(key);
        if (!value || value === '' || value == null) {
            return null;
        }
        value = JSON.parse(value);
        if (isObject) {
            value = JSON.parse(value);
        }

        return value;
    }

    removeItem(key: string): void {
         sessionStorage.removeItem(key);
    }

    clearAll(): void {
         sessionStorage.clear();
    }
 }
