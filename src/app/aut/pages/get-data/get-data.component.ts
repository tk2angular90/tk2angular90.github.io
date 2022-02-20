import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from '@aut/services/subscription.service';
import {ApiService} from '@aut/services/api.service';
import {finalize} from 'rxjs';
import {PlatformService} from '@aut/services/platform.service';
import {makeStateKey} from '@angular/platform-browser';
import {TransferStateService} from '@aut/services/transfer-state.service';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss'],
  providers: [
    SubscriptionService,
    TransferStateService,
  ]
})
export class GetDataComponent implements OnInit {
  // Loading state.
  loading = false;

  // The key for server responded state.
  private _serverRespondedKey = makeStateKey('serverResponded');

  constructor(
    private apiService: ApiService,
    private platformService: PlatformService,
    private subscriptionService: SubscriptionService,
    private transferStateService: TransferStateService,
  ) { }

  /**
   * Get the state of server responded for this page.
   * Will be set `true` when page created by angular universal.
   */
  get serverResponded(): boolean {
    return this.transferStateService.get<boolean>(this._serverRespondedKey, false);
  }

  ngOnInit(): void {
    this.transferStateService.init([this._serverRespondedKey]);

    if (!this.serverResponded) {
      // Get data with http client.
      const sub = this.apiService
        .getData()
        .pipe(finalize(() => {
          this.loading = false;

          if (this.platformService.isServer) {
            this.transferStateService.set<boolean>(this._serverRespondedKey, true);
          }
        }))
        .subscribe({
          error: err => console.error(err),
        });

      this.subscriptionService.store('ngOnInit', sub);
      this.loading = true;
    }
  }
}
