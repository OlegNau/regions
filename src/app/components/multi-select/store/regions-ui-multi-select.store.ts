import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Regions } from 'src/app/interfaces/regions.interface';
import { FilterService } from 'src/app/services/filter.service';
import { RegionsStore } from 'src/app/stores/regions-ui-store';

type RegionsMultiSelectState = {
  readonly filter: string;
  readonly filtredRegions: readonly Regions[];
  readonly selectedRegions: Regions[];
};

const initialState: RegionsMultiSelectState = {
  filter: '',
  filtredRegions: [],
  selectedRegions: [],
};

export const RegionsMultiSelectStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const regionsStore = inject(RegionsStore);
    const filterService = inject(FilterService);

    const regionsList = regionsStore.regions();
    patchState(store, { filtredRegions: regionsList });

    return {
      setSearchPattern(pattern: string) {
        patchState(store, { filter: pattern });
        this.filterRegions();
      },

      filterRegions(): void {
        const searchPattern = store.filter();
        const regionsList = regionsStore.regions();

        if (!searchPattern) {
          patchState(store, {filtredRegions: regionsList});
          return;
        }

        const regions = filterService.filterRegions(searchPattern, regionsList);

        patchState(store, {
          filtredRegions: regions,
        });
      },
      setSelectedRegions(selected: Regions[]): void {
        patchState(store, {selectedRegions: selected})
        regionsStore.selectedRegions(true);
      }
    };
  })
);
