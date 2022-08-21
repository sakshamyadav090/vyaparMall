import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class GlobalEventsManager implements OnDestroy {

    protected _isLoaderShown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    protected _errorType: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public loaderEmitter: Observable<boolean> = this._isLoaderShown.asObservable();
    public errorStateHandler: Observable<string> = this._errorType.asObservable();

    // Bind Events through names and subscribe to the changes
    private _data = new Subject<Object>();
    private _dataStream$ = this._data.asObservable();
    private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    constructor() {
        this._dataStream$.subscribe((data) => this._onEvent(data));
    }

    public toggleLoader(show: boolean) {
        this._isLoaderShown.next(show);
    }
    public error(statusCode: string) {
        this._errorType.next(statusCode);
    }


    public notifyEvent(event, value) {
        const current = this._data[event];
        if (current !== value) {
            this._data[event] = value;
            this._data.next({
                event: event,
                data: this._data[event]
            });
        }
    }

    public subscribeEvent(event: string, callback: Function) {
        const subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);
        this._subscriptions.set(event, subscribers);
    }

    private _onEvent(data: any) {
        const subscribers = this._subscriptions.get(data['event']) || [];
        subscribers.forEach((callback) => {
            callback.call(null, data['data']);
        });
    }
    public ngOnDestroy(): void {
    }

}
