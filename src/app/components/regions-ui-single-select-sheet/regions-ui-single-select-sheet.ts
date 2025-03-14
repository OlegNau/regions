import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit, Signal } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { SearchComponent } from '../regions-ui-search/regions-ui-search.component';
import { MatIconModule } from '@angular/material/icon';
import { RegionsSingleSelectStore } from '../single-select/store/regions-ui-single-select.store';
import { SEARCH_TOKEN } from 'src/app/tokens/search.token';
import { Regions } from 'src/app/interfaces/regions.interface';

@Component({
  selector: 'regions-ui-single-select-sheet',
  templateUrl: 'regions-ui-single-select-sheet.html',
  styleUrls: ['./regions-ui-single-select-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, MatRadioModule, SearchComponent, MatIconModule],
  providers: [{ provide: SEARCH_TOKEN, useExisting: RegionsSingleSelectStore }],
  standalone: true,
})
export class SingleSelectSheetComponent {
  private store = inject(RegionsSingleSelectStore);

  selectedRegion: Regions | null = null;

  regionsList = computed(() => this.store.filtredRegions());

  private _bottomSheetRef = inject<MatBottomSheetRef<SingleSelectSheetComponent>>(MatBottomSheetRef);

  onRegionChange(region: Regions, event: Event): void {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;

    if (isChecked) {
      this.selectedRegion = region;
    }
  }

  addRegions(): void {
      this._bottomSheetRef.dismiss();
      this.store.setSelectedRegion(this.selectedRegion!)
  }

  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
