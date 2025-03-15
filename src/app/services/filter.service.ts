import { Injectable } from "@angular/core";
import { Region } from "../interfaces/region.interface";

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterRegions(searchValue: string, regionsList: Region[]): readonly Region[] {
    if (searchValue === '') {
      return regionsList;
    }

    return regionsList.filter(region => {
      return (region.name.toLowerCase().includes(searchValue.toLowerCase()));
    });
  }
}
