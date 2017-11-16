import {Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AudioProvider} from 'ionic-audio';

@Component({
    selector: 'page-post-detail',
    templateUrl: 'post-detail.html',
})
export class PostDetail {
    @ViewChild('content') el: ElementRef;
    @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;
    post: any;
    slideshow: any[] = [];
    mp3: any[] = [];
    allTracks: any[];
    selectedTrack: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private _audioProvider: AudioProvider) {
        this.post = navParams.get('post');
        this.post.medias.forEach(m => {
            console.log(m.source_url)
            let url = m.source_url;
            this.mp3.push({
                src: url,
                preload: 'metadata',
                artist: 'inconnu',
                title: url.split('/')[url.split('/').length - 1].split('.')[0],
                art: 'http://www.theblackout.fr/wordpress/wp-content/gallery/wallpapers/blackout-big02.jpg'
            });
        }, this);
        console.log(this.post)
    }

    ngAfterContentInit() {
        // get all tracks managed by AudioProvider so we can control playback via the API
        this.allTracks = this._audioProvider.tracks;
    }

    playSelectedTrack() {
        // use AudioProvider to control selected track
        this._audioProvider.play(this.selectedTrack);
    }

    pauseSelectedTrack() {
        // use AudioProvider to control selected track
        this._audioProvider.pause(this.selectedTrack);
    }

    onTrackFinished(track: any) {
        console.log('Track finished', track)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PostDetailPage');
        if (this.el.nativeElement.querySelector('.ngg-slideshow-image-list')) {
            let imgs = this.el.nativeElement.querySelector('.ngg-slideshow-image-list').children;
            for (let i = 0; i < imgs.length; i++) {
                let img = imgs.item(i);
                this.slideshow.push(img.children[0].getAttribute('src'));
            }
            this.el.nativeElement.querySelector('.ngg-slideshow-image-list').remove();
            this.el.nativeElement.querySelector('.ngg-slideshow').remove();
            this.el.nativeElement.querySelector('.slideshowlink').remove();
        }
        if (this.el.nativeElement.querySelector('.wp-audio-playlist')) {
            let playlist = this.el.nativeElement.querySelector('.wp-audio-playlist').querySelector('ol').children;
            for (let i = 0; i < playlist.length; i++) {
                let audio = playlist.item(i);
                this.mp3.push({
                    src: audio.children[0].getAttribute('href'), artist: 'Blackout', title: audio.children[0].innerHTML,
                    preload: 'metadata',
                    art: 'http://www.theblackout.fr/wordpress/wp-content/gallery/wallpapers/blackout-big02.jpg'
                });
            }
            this.el.nativeElement.querySelector('.wp-audio-playlist').remove();
        }
    }
}
