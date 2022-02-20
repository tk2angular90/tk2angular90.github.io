import {Injectable} from '@angular/core';
import {StateKey, TransferState} from '@angular/platform-browser';
import {PlatformService} from '@aut/services/platform.service';

/**
 * TransferState managing service.
 * If the platform is browser, it will remove the data in keys
 * when destroying service from the scoped component, directive, or module.
 */
@Injectable()
export class TransferStateService {
  private _keys: StateKey<any>[] = [];

  constructor(
    private transferState: TransferState,
    private platformService: PlatformService,
  ) {
  }

  ngOnDestroy(): void {
    // Remove the initialized keys on destroy.
    if (this.platformService.isBrowser) {
      this._keys.forEach(key => this.remove(key));
    }
  }

  /**
   * Initialize the keys which will be used from the scoping target.
   * @param keys The keys.
   */
  init(keys: StateKey<any>[]): void {
    this._keys = keys;
  }

  /**
   * Set the data to state.
   * @param key The key.
   * @param value The value.
   */
  set<T>(key: StateKey<T>, value: T): void {
    this.transferState.set(key, value);
  }

  /**
   * Get the data from state.
   * @param key The key.
   * @param defaultValue Default value when no data set.
   */
  get<T>(key: StateKey<T>, defaultValue?: any): T {
    return this.transferState.get(key, defaultValue);
  }

  /**
   * Remove the key from state.
   * @param key The key.
   */
  remove<T>(key: StateKey<T>): void {
    this.transferState.remove(key);
  }
}

