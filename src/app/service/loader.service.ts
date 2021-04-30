import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    isLoading = new Subject<boolean>();
    constructor() { }
    show() {
        this.isLoading.next(true);
    }
    hide() {
        this.isLoading.next(false);
    }
}
