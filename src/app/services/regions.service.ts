import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../interfaces/region.interface';

@Injectable({ providedIn: 'root' })
export class RegionsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://run.mocky.io/v3/b363212b-650f-44f7-bd38-aa503c474e3d';

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl);
  }
}
