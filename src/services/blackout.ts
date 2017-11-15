import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {API} from "./api";


import {ToastController} from 'ionic-angular';


@Injectable()
export class Blackout extends API {

    /**
     *
     * @param {Http} http
     * @param {ToastController} toastCtrl
     */
    constructor(private http: HttpClient, toastCtrl: ToastController) {
        super(toastCtrl);
    }



    getListOfFeatured(): Observable<Array<any>> {
        console.log('getListOfFeatured');
        return this.http.get<any>('http://www.theblackout.fr/wordpress/wp-json/wp/v2/posts?categories=81').pipe(
            catchError(this.handleError('getListOfFeatured'))
        );
    }

    getImageURL(id: String): Observable<any> {
        console.log('getImageURL', id);
        return this.http.get<any>('http://www.theblackout.fr/wordpress/wp-json/wp/v2/media/' + id).pipe(
            catchError(this.handleError('getImageURL'))
        );
    }

}
