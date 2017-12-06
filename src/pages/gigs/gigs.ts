import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {Blackout} from "../../services/blackout";
import {PostDetail} from "../post-detail/post-detail";

@Component({
    selector: 'gigs-list',
    templateUrl: 'gigs.html'
})
export class GigsPage {
    loader: any;
    newsFeed: Array<any>;

    constructor(private blackout: Blackout, private loadingCtrl: LoadingController, private navCtrl: NavController) {
    }

    ngOnInit() {
        this.presentLoading();
        this.blackout.getRSSFeed().subscribe(newsFeed => {
            this.newsFeed = [];
            console.log(newsFeed)
            if (newsFeed) {
                newsFeed.events.reverse().forEach(p => {
                    this.newsFeed.push({
                        title: p.title,
                        start_date: p.start_date,
                        website: p.website,
                        venue : p.venue
                    })
                });
            }
            this.loader.dismiss();
        });
    }

    readMore(post) {
        this.navCtrl.push(PostDetail, {post: post});
    }

    presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
    }
}
