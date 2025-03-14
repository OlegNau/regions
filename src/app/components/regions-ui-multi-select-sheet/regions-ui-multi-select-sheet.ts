import { ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { SearchComponent } from '../regions-ui-search/regions-ui-search.component';
import { MatIconModule } from '@angular/material/icon';
import { SEARCH_TOKEN } from 'src/app/tokens/search.token';
import { Regions } from 'src/app/interfaces/regions.interface';
import { RegionsMultiSelectStore } from '../multi-select/store/regions-ui-multi-select.store';

@Component({
  selector: 'regions-ui-multi-select-sheet',
  templateUrl: 'regions-ui-multi-select-sheet.html',
  styleUrls: ['./regions-ui-multi-select-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, MatRadioModule, SearchComponent, MatIconModule],
  providers: [{ provide: SEARCH_TOKEN, useExisting: RegionsMultiSelectStore }],
  standalone: true,
})
export class MultiSelectSheetComponent {
  private store = inject(RegionsMultiSelectStore);

  selectedRegions: Regions[] = [];

  regionsList = computed(() => this.store.filtredRegions());

  private _bottomSheetRef = inject<MatBottomSheetRef<MultiSelectSheetComponent>>(MatBottomSheetRef);

  onRegionChange(region: Regions, event: Event): void {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;

    if (isChecked) {
      this.selectedRegions.push(region);
    } else {
      this.selectedRegions = this.selectedRegions.filter(select => select !== region);
    }
  }

  addRegions(): void {
      this._bottomSheetRef.dismiss();
      this.store.setSelectedRegions(this.selectedRegions)
  }

  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
