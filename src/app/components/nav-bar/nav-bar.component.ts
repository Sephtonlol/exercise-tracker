import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  albums,
  albumsOutline,
  settings,
  settingsOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs, RouterLink],
})
export class NavBarComponent {
  constructor(private readonly router: Router) {
    addIcons({ albums, albumsOutline, settings, settingsOutline });
  }

  get activeTab(): string {
    return (
      this.router.url
        .split('?')[0]
        .split('#')[0]
        .replace(/^\//, '')
        .split('/')[0] || 'home'
    );
  }

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }
}
