import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RegionsStore } from './stores/regions-ui-store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  private store = inject(RegionsStore);

  singleRegionChecked = signal(false);
  multiRegionChecked = signal(false);

  isLoading = computed(() => this.store.isLoading());
  loadingError = computed(() => this.store.loadingError());

  ngOnInit():void {
    this.store.loadRegions();
  }

  send(): void {
    console.log("Отчеты отправлены")
  }

  onRegionSelected(selected: boolean) {
    this.singleRegionChecked.set(selected);
  }

  onRegionsSelected(selected: boolean): void {
    this.multiRegionChecked.set(selected);
  }
}
