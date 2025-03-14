import { ChangeDetectionStrategy, Component, computed, effect, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SingleSelectSheetComponent } from '../regions-ui-single-select-sheet/regions-ui-single-select-sheet';
import { RegionsSingleSelectStore } from './store/regions-ui-single-select.store';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'regions-ui-single-select',
  templateUrl: './regions-ui-single-select.component.html',
  styleUrls: ['./regions-ui-single-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatChipsModule,
  ],
  standalone: true,
})
export class SingleSelectComponent {
  @Output() selectRegion = new EventEmitter<boolean>()

  readonly store = inject(RegionsSingleSelectStore);

  regionChecked = computed(() =>  this.store.selectedRegion());

  constructor() {
    effect((): void => {
      const hasRegion = this.regionChecked() !== null;
      this.selectRegion.emit(hasRegion);
    });
  }

  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(SingleSelectSheetComponent);
  }
}
