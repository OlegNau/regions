import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { RegionsService } from '../services/regions.service';
import { Regions } from '../interfaces/regions.interface';

type RegionsState = {
  regions: Regions[];
  isLoading: boolean;
  loadingError: boolean;
};

const initialState: RegionsState = {
  regions: [],
  isLoading: false,
  loadingError: false,
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
  }))
);
