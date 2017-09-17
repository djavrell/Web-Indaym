/**
 * Created by nicolas on 19/10/16.
 */

import { ModuleWithProviders }    from '@angular/core';
import {
  Routes,
  RouterModule,
}                                 from '@angular/router';

import { HomeComponent }          from './components/home';
import {
  EditorComponent,
  PreviewComponent,
  DesignerComponent,
  BlueprintsComponent,
}                                 from './components/editor';
import { GamesListComponent }     from './components/gameslist';
import { ScenesListComponent }    from './components/sceneslist';
import { PlayComponent }          from './components/play';
import { StoreComponent }         from './components/store';
import { RateGameComponent }      from './components/rategame';
import { ForumComponent }         from './components/forum';
import { ContactComponent }       from './components/contact';
import { LegalMentionsComponent } from './components/legal-mentions';
import { DiscussionComponent }    from './components/forum/discussion';

export const routes: Routes = [
  { path: '',               redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',           component: HomeComponent },
  { path: 'gameslist',      component: GamesListComponent },
  { path: 'sceneslist',     component: ScenesListComponent },
  { path: 'editor',         component: EditorComponent,
    children: [
      { path: '',           redirectTo: 'designer' },
      { path: 'designer',   component: DesignerComponent },
      { path: 'blueprints', component: BlueprintsComponent },
      { path: 'preview',    component: PreviewComponent },
    ],
  },
  { path: 'play',           component: PlayComponent },
  { path: 'store',          component: StoreComponent },
  { path: 'rategame',       component: RateGameComponent },
  { path: 'forum',          component: ForumComponent,
    children: [
      { path: 'discussion', component: DiscussionComponent }
    ]},
  { path: 'contact',        component: ContactComponent },
  { path: 'legalMentions',  component: LegalMentionsComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
