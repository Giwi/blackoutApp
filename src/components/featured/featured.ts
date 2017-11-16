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
                    p.medias = [];
                    let imageHeader;
                    if (p.featured_media) {
                        imageHeader = 'http://www.theblackout.fr/wordpress/wp-json/wp/v2/media/' + p.featured_media;
                    } else if (p['_links']['wp:attachment'] && p['_links']['wp:attachment'].length > 0 && p['_links']['wp:attachment'][0].href) {
                        imageHeader = p['_links']['wp:attachment'][0].href;
                    }
                    if (imageHeader) {
                        this.blackout.getImageURL(imageHeader).subscribe(image => {
                            if (Array.isArray(image)) {

                                p.medias = image.filter(m => {
                                    return m.media_type === 'file' && m.mime_type.match(/audio.*/)
                                });

                                image = image.filter(m => {
                                    return m.media_type === 'image';
                                });

                                image = image[0]
                            }
                            if (image) {
                                if (image.media_details.sizes) {
                                    p.img = image.media_details.sizes.medium.source_url;
                                } else if (image.source_url) {
                                    p.img = image.source_url;
                                }
                            } else {
                                p.img = 'http://www.theblackout.fr/wordpress/wp-content/gallery/wallpapers/blackout-big02.jpg'
                            }
                            p.content.rendered = p.content.rendered.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ");
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
        this.navCtrl.push(PostDetail, {post: post});
    }

    presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
    }

}