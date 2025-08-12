import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibData } from '../services/lib-data';
@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  searchText = '';

  constructor(private libData: LibData) {}

  onSearch() {
    this.libData.filterAppletData(this.searchText.toLowerCase().trim());
  }
}

// lib = {
//   categories: ['Performance', 'Investments'],
//   applets: [
//     {
//       name: 'Performance Snapshot',
//       categories: ['Performance'],
//     },
//     {
//       name: 'CMS',
//       categories: ['Investments', 'Performance'],
//     },
//   ],
// };
