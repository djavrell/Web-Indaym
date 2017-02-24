/**
 * Created by nicolas on 19/10/16.
 */


import { ModuleWithProviders }    from '@angular/core';
import {
    Routes,
    RouterModule
}                                 from '@angular/router';

import { HomeComponent }          from './components/home';
import { GamesListComponent }     from './components/gameslist';
import { EditorComponent }        from './components/editor';
import { PlayComponent }          from './components/play';
import { StoreComponent }         from './components/store';
import { ForumComponent }         from './components/forum';
import { ContactComponent }       from './components/contact';
import { LegalMentionsComponent } from './components/legal-mentions';
import { DesignerComponent }      from './components/editor/designer';
import { BlueprintsComponent }    from './components/editor/blueprints';
import { DiscussionComponent }    from './components/forum/discussion';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },


    { path: 'home', component: HomeComponent },
    {
        path: 'editor',
        children: [
            { path: '', component: EditorComponent },
            { path: 'designer', component: DesignerComponent },
            { path: 'blueprints', component: BlueprintsComponent }
        ]
    },
    { path: 'play', component: PlayComponent },
    { path: 'store', component: StoreComponent },
    {
        path: 'forum',
        children: [
            { path: '', component: ForumComponent },
            { path: 'discussion', component: DiscussionComponent }
        ]
    },
    { path: 'contact', component: ContactComponent },
    { path: 'legalMentions', component: LegalMentionsComponent },

  { path: 'gameslist',      component: GamesListComponent },

  { path: 'play',            component: PlayComponent },
  { path: 'store',           component: StoreComponent },

  { path: 'contact',         component: ContactComponent },
  { path: 'legalMentions',   component: LegalMentionsComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
