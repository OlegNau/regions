import { Component, computed, inject, OnInit} from '@angular/core';
import { RegionsStore } from './stores/regions-ui-store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  private store = inject(RegionsStore);

  singleRegionChecked = computed(() => this.store.singleRegionChecked());
  multiRegionChecked = computed(() => this.store.multiRegionChecked());

  isLoading = computed(() => this.store.isLoading());
  loadingError = computed(() => this.store.loadingError());

  ngOnInit():void {
    this.store.loadRegions();
  }

  send(): void {
    console.log("Отчеты отправлены")
  }
}
