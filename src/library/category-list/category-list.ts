import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { LibData } from "../services/lib-data";
import { Category } from "../models/category";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.html",
  styleUrls: ["./category-list.scss"],
})
export class CategoryList implements OnInit, OnDestroy {
  categoryList: Category[] = [];
  selectedCategory: Category = {};

  private destroy$ = new Subject<void>();

  constructor(private libData: LibData) {}

  ngOnInit(): void {
    this.libData
      .reRenderComponent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.fetchCategoryData();
      });
  }

  fetchCategoryData() {
    this.libData
      .fetchCategoriesAndAppletCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
