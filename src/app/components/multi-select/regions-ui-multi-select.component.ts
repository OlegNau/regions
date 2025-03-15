import { ChangeDetectionStrategy, Component, computed, effect, EventEmitter, Inject, inject, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatChipsModule } from '@angular/material/chips';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { RegionsMultiSelectStore } from './store/regions-ui-multi-select.store';
import { MultiSelectSheetComponent } from '../regions-ui-multi-select-sheet/regions-ui-multi-select-sheet';

@Component({
  selector: 'regions-ui-multi-select',
  templateUrl: './regions-ui-multi-select.component.html',
  styleUrls: ['./regions-ui-multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatChipsModule,
    CdkDropList,
  ],
  standalone: true,
})
export class MultiSelectComponent {
  @Output() selectRegions = new EventEmitter<boolean>()

  readonly store = inject(RegionsMultiSelectStore);

  regionsChecked = computed(() => this.store.selectedRegions());

  constructor() {
      effect(() => {
        this.selectRegions.emit(this.regionsChecked().length !== 0);
      });
    }

  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(MultiSelectSheetComponent);
  }
}
