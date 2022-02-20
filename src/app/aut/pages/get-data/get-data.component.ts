import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '@aut/services/subscription.service';
import {ApiService} from '@aut/services/api.service';
import {finalize} from 'rxjs';
import {PlatformService} from '@aut/services/platform.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class GetDataComponent implements OnInit {
  // Loading state.
  loading = false;

  // The state of server responded for this page.
  // Will be set `true` when page created by angular universal.
  serverResponded = false;

  // The key for server responded state.

  constructor(
    private apiService: ApiService,
    private platformService: PlatformService,
    private subscriptionService: SubscriptionService,
  ) { }

  /**
   * Get the state of server responded for this page.
   * Will be set `true` when page created by angular universal.
   */
  // get serverResponded(): boolean {
  //   return this.transferState.get<boolean>(this._serverRespondedKey, false);
  // }

  ngOnInit(): void {
    if (!this.serverResponded) {
      // Get data with http client.
      const sub = this.apiService
        .getData()
        .pipe(finalize(() => {
          this.loading = false;

          if (this.platformService.isServer) {
            this.serverResponded = true;
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
