import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '@aut/services/subscription.service';
import {ApiService} from '@aut/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {delay, finalize} from 'rxjs';

@Component({
  selector: 'app-use-parameter',
  templateUrl: './use-parameter.component.html',
  styleUrls: ['./use-parameter.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class UseParameterComponent implements OnInit {
  loading = false;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    const sub = this.activatedRoute
      .paramMap
      .subscribe(res => {
        const id = res.get('id');

        if (id) {
          this._getData();
        }
      });

    this.subscriptionService.store('ngOnInit', sub);
  }

  private _getData(): void {
    const sub = this.apiService
      .getData()
      .pipe(delay(5000))
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        error: err => console.log(err),
      });

    this.subscriptionService.store('_getData', sub);
    this.loading = true;
  }
}
