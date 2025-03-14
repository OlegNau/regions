import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regions } from '../interfaces/regions.interface';

@Injectable({ providedIn: 'root' })
export class RegionsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://run.mocky.io/v3/b363212b-650f-44f7-bd38-aa503c474e3d';

  getRegions(): Observable<Regions[]> {
    return this.http.get<Regions[]>(this.apiUrl);
  }
}
