import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, filter, map } from 'rxjs';
import { lengthValidator } from 'src/app/validators/length-validator';
import { SEARCH_TOKEN } from 'src/app/tokens/search.token';

const ERROR_MESSAGE = 'Минимум 1 символ, максимум 20 символов';
const MIN_LENGTH = 1;
const MAX_LENGTH = 20;
const DEBOUNCE = 1000;

@Component({
  selector: 'regions-ui-search',
  templateUrl: 'regions-ui-search.component.html',
  styleUrls: ['./regions-ui-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule],
  standalone: true,
})
export class SearchComponent implements OnInit {
  private store = inject(SEARCH_TOKEN);
  readonly searchControl = new FormControl('');

  ngOnInit(): void {
    this.setValidators();
    this.searchControl.valueChanges.pipe(
        debounceTime(DEBOUNCE),
        map(value => value ?? ''),
        filter(value => value.length > 2),
    ).subscribe(value => this.searchProcessing(value));
  }

  setValidators(): void {
    this.searchControl.setValidators(lengthValidator(MIN_LENGTH, MAX_LENGTH, ERROR_MESSAGE))
  }

  searchProcessing(value: string): void {
    if (this.searchControl.invalid || !this.searchControl.dirty) {
      return;
    }

    this.store.setSearchPattern(value);
  }
}
