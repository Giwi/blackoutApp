import {ChangeDetectorRef, Component} from '@angular/core';
import {LoadingController} from 'ionic-angular';
import {Blackout} from "../../services/blackout";
import {ITrackConstraint} from "ionic-audio";

@Component({
    selector: 'blackout-player',
    templateUrl: 'player.html'
})
export class PlayerPage {
    loader: any;
    playlist: Array<any>;
    currentIndex: number = -1;
    currentTrack: ITrackConstraint;

    constructor(private blackout: Blackout, private loadingCtrl: LoadingController, private _cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.presentLoading();
        this.blackout.getPlayList().subscribe(playlist => {
            this.playlist = [];
            if (playlist) {
                this.playlist = playlist;
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

    play(track: ITrackConstraint, index: number) {
        this.currentTrack = track;
        this.currentIndex = index;
    }

    next() {
        // if there is a next track on the list play it
        if (this.playlist.length > 0 && this.currentIndex >= 0 && this.currentIndex < this.playlist.length - 1) {
            let i = this.currentIndex + 1;
            let track = this.playlist[i];
            this.play(track, i);
            this._cdRef.detectChanges();  // needed to ensure UI update
        } else if (this.currentIndex == -1 && this.playlist.length > 0) {
            // if no track is playing then start with the first track on the list
            this.play(this.playlist[0], 0);
        }
    }

    onTrackFinished(track: any) {
        this.next();
    }
}
