import { Component, OnDestroy, OnInit } from "@angular/core";
import { LibData } from "../services/lib-data";
import { Category } from "../models/category";
import { Applet } from "../models/applet";
import { Subject, switchMap, takeUntil } from "rxjs";

@Component({
  selector: "app-applet-list",
  imports: [],
  templateUrl: "./applet-list.html",
  styleUrl: "./applet-list.scss",
})
export class AppletList implements OnInit, OnDestroy {
  constructor(public libData: LibData) {}
  appletList: Applet[] = [];
  loading: boolean = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.libData
      .getSelectedCategory()
      .pipe(
        switchMap((selectedCategory: Category) =>
          this.libData.fetchAppletsByCategory(selectedCategory)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((applets: Applet[]) => {
        this.appletList = applets;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
