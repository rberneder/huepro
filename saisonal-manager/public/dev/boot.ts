/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS} from 'angular2/http';
import {ProductManagerService} from "./products/product-manager.service";


bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, ProductManagerService]);