import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingController, NavParams} from 'ionic-angular';
import {Blackout} from "../../services/blackout";

declare var google;

@Component({
    selector: 'gig-detail',
    templateUrl: 'gig-detail.html',
})
export class GigDetail {
    loader: any;
    gig: any;
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    service = new google.maps.places.AutocompleteService();

    constructor(private blackout: Blackout, private loadingCtrl: LoadingController, public navParams: NavParams) {
    }

    loadMap(prediction: any) {
        let me = this;
        this.map = new google.maps.Map(this.mapElement.nativeElement);
        new google.maps.places.PlacesService(this.map).getDetails({
            placeId: prediction.place_id
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                me.map.setCenter(place.geometry.location);
                me.map.setZoom(14);
                me.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

                new google.maps.Marker({
                    map: me.map,
                    position: place.geometry.location
                });
            }
        });
    }

    ngOnInit() {
        this.presentLoading();
        let id = this.navParams.get('id');
        this.blackout.getGig(id).subscribe(gig => {
            if (gig) {
                this.gig = gig;
                if (this.gig.venue) {
                    let me = this;
                    this.service.getPlacePredictions({
                        input: this.gig.venue.address + ' ' + this.gig.venue.zip + ' ' + this.gig.venue.city,
                        componentRestrictions: {country: this.gig.venue.country}
                    }, function (predictions, status) {
                        if (predictions.length > 0) {
                            me.loadMap(predictions[0]);
                        }
                    });
                }
            }
            this.loader.dismiss();
        });
    }

    presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
    }

    getGoogleLink() {
        let startDateIso = this.gig.start_date_details.year + this.gig.start_date_details.month
            + this.gig.start_date_details.day + 'T' + this.gig.start_date_details.hour
            + this.gig.start_date_details.minutes + this.gig.start_date_details.seconds;

        return 'https://www.google.com/calendar/event?action=TEMPLATE&text='
            + encodeURI(this.gig.title) + '&dates=' + startDateIso + '/' + startDateIso + '&details&location='
            + encodeURI(this.gig.venue.address + ',' + this.gig.venue.city + ',' + this.gig.venue.zip + ', ' + this.gig.venue.country)
            + '&trp=false&sprop=website:http://www.theblackout.fr/wordpress&ctz=Europe%2FParis'
    }

    getICalLink() {
        return this.gig.url + '?ical=1&tribe_display=';
    }
}
