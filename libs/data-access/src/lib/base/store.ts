import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';

export abstract class Store<T> {
  private _state: BehaviorSubject<T>;

  protected get state() {
    return this._state.getValue();
  }

  constructor(initialState: T) {
    const state = Object.freeze(initialState);
    this._state = new BehaviorSubject(state);
  }

  protected select<K>(mapFn: (state: T) => K) {
    return this._state.asObservable().pipe(
      map((state) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  protected setState(newState: Partial<T>) {
    this._state.next({
      ...this.state,
      ...newState,
    });
  }
}
