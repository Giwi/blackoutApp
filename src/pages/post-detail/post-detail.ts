import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'page-post-detail',
    templateUrl: 'post-detail.html',
})
export class PostDetail {
    post: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.post = navParams.get('post')
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PostDetailPage');
    }

}
