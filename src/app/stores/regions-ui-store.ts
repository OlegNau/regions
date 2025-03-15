import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { RegionsService } from '../services/regions.service';
import { Region } from '../interfaces/region.interface';

type RegionsState = {
  regions: Region[];
  isLoading: boolean;
  loadingError: boolean;
  singleRegionChecked: boolean;
  multiRegionChecked: boolean;
};

const initialState: RegionsState = {
  regions: [],
  isLoading: false,
  loadingError: false,
  singleRegionChecked: false,
  multiRegionChecked: false,
};

export const RegionsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, regionsService = inject(RegionsService)) => ({
    loadRegions: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { isLoading: true, loadingError: false });

          return regionsService.getRegions().pipe(
            tap((regions) => patchState(store, { regions, isLoading: false })),
            catchError(() => {
              patchState(store, { loadingError: true, isLoading: false });
              return of([]);
            })
          );
        })
      )
    ),
    selectedRegion(selected: boolean) {
      patchState(store, {singleRegionChecked: selected})
    },
    selectedRegions(selected: boolean) {
      patchState(store, {multiRegionChecked: selected})
    },
  }))
);
