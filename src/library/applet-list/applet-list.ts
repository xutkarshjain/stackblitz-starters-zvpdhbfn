import { Component, OnInit } from '@angular/core';
import { LibData } from '../services/lib-data';
import { Category } from '../models/category';
import { Applet } from '../models/applet';

@Component({
  selector: 'app-applet-list',
  imports: [],
  templateUrl: './applet-list.html',
  styleUrl: './applet-list.scss',
})
export class AppletList implements OnInit {
  constructor(public libData: LibData) {}
  appletList: Applet[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.libData
      .getSelectedCategory()
      .subscribe((selectedCategory: Category) => {
        this.libData
          .fetchAppletsByCategory(selectedCategory)
          .subscribe((applets: Applet[]) => {
            this.appletList = applets;
          });
      });
  }
}
