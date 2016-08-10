/*
 * These are globally available pipes in any template
 */

// Angular 2 core
import { PLATFORM_PIPES } from '@angular/core';

import { TranslatePipe } from 'ng2-translate/ng2-translate';

// application_pipes: pipes that are global through out the application
export const APPLICATION_PIPES = [
  TranslatePipe
];

export const PIPES = [
  {provide: PLATFORM_PIPES, multi: true, useValue: APPLICATION_PIPES }
];
