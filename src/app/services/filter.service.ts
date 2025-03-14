import { Injectable } from "@angular/core";
import { Regions } from "../interfaces/regions.interface";

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterRegions(searchValue: string, regionsList: Regions[]): readonly Regions[] {
    if (searchValue === '') {
      return regionsList;
    }

    return regionsList.filter(region => {
      return (region.name.toLowerCase().includes(searchValue.toLowerCase()));
    });
  }
}
