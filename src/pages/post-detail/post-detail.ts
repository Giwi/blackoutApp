import {ChangeDetectorRef, Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {AudioProvider, ITrackConstraint} from 'ionic-audio';

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
    currentIndex: number = -1;
    currentTrack: ITrackConstraint;

    constructor(public navParams: NavParams, private _audioProvider: AudioProvider, private _cdRef: ChangeDetectorRef) {
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

    play(track: ITrackConstraint, index: number) {
        this.currentTrack = track;
        this.currentIndex = index;
    }

    next() {
        // if there is a next track on the list play it
        if (this.mp3.length > 0 && this.currentIndex >= 0 && this.currentIndex < this.mp3.length - 1) {
            let i = this.currentIndex + 1;
            let track = this.mp3[i];
            this.play(track, i);
            this._cdRef.detectChanges();  // needed to ensure UI update
        } else if (this.currentIndex == -1 && this.mp3.length > 0) {
            // if no track is playing then start with the first track on the list
            this.play(this.mp3[0], 0);
        }
    }

    onTrackFinished(track: any) {
        this.next();
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
