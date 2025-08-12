import { Component, OnInit } from '@angular/core';
import { LibData } from '../services/lib-data';
import { Category } from '../models/category';

@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList implements OnInit {
  constructor(private libData: LibData) {}

  categoryList: Category[] = [];
  selectedCategory: Category = {};

  ngOnInit(): void {
    this.libData.reRenderComponent().subscribe((_) => {
      this.fetchCategoryData();
    });
  }

  fetchCategoryData() {
    this.libData.fetchCategoriesAndAppletCount().subscribe((data: any) => {
      this.categoryList = data;
      if (this.categoryList.length) {
        this.selectedCategory = this.categoryList[0];
      } else {
        this.selectedCategory = {};
      }
      this.libData.setSelectedCategory(this.selectedCategory);
    });
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.libData.setSelectedCategory(this.selectedCategory);
  }
}
