/// <reference path="../typings/browser.d.ts" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';

// enableProdMode();

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);