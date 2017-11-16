import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Featured} from "../components/featured/featured";
import {Blackout} from "../services/blackout";
import {HttpClientModule} from "@angular/common/http";
import {PostDetail} from "../pages/post-detail/post-detail";
import {ParallaxHeader} from "../directives/parallax-header/parallax-header";
import {IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory} from 'ionic-audio';

export function myCustomAudioProviderFactory() {
    return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}

@NgModule({
    declarations: [
        MyApp,
        ParallaxHeader,
        HomePage,
        Featured,
        ListPage,
        PostDetail
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        IonicAudioModule.forRoot(defaultAudioProviderFactory),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        PostDetail
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Blackout,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
