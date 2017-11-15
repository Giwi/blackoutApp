import {Component, OnInit, ViewChild} from "@angular/core";
import {Blackout} from '../../services/blackout';
import {LoadingController, NavController} from "ionic-angular";
import {Slides} from 'ionic-angular';
import {PostDetail} from "../../pages/post-detail/post-detail";

@Component({
    selector: 'featured',
    templateUrl: './featured.html'
})
export class Featured implements OnInit {
    @ViewChild(Slides) slides: Slides;
    loader: any;
    newsFeed: Array<any>;

    constructor(private blackout: Blackout, private loadingCtrl: LoadingController, private navCtrl: NavController) {
    }

    /**
     *
     */
    ngOnInit() {
        this.presentLoading();
        this.blackout.getListOfFeatured().subscribe(newsFeed => {
            this.newsFeed = [];
            if (newsFeed) {
                newsFeed.forEach(p => {
                    if (p.featured_media) {
                        this.blackout.getImageURL(p.featured_media).subscribe(image => {
                            p.img = image.media_details.sizes.medium.source_url;
                            p.content.rendered = p.content.rendered.replace(/<script[^>]+(>|$)<\/script>/g, '');
                        });
                    }
                    this.newsFeed.push(p);
                }, this);
                this.slides.startAutoplay();
            }
            this.loader.dismiss();
        });
    }

    readMore(post) {
        this.navCtrl.push(PostDetail, {post:post});
    }

    presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
    }

}