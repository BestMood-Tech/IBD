import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'nga-pages',
  templateUrl: 'pages.component.html',
})

export class PagesComponent implements OnInit {

  constructor(private _menuService: BaMenuService) {
  }

  public ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
