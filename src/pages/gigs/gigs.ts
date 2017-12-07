import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {Blackout} from "../../services/blackout";
import {GigDetail} from "../gig-detail/gig-detail";

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
        this.blackout.getAllGigs().subscribe(newsFeed => {
            this.newsFeed = [];
            if (newsFeed) {
                newsFeed.events.reverse().forEach(p => {
                    console.log(p)
                    this.newsFeed.push({
                        title: p.title,
                        id: p.id,
                        start_date: p.start_date,
                        website: p.website,
                        venue : p.venue
                    })
                });
            }
            this.loader.dismiss();
        });
    }

    readMore(id) {
        console.log(id)
        this.navCtrl.push(GigDetail, {id: id});
    }

    presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
    }
}
