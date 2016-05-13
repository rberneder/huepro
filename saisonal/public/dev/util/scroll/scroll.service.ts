import {ScrollListener} from "./scroll-listener";

export class ScrollService {
    private lastScrollEvent: any;
    private scrollSpeed: number;
    private scrollThresholdMs: number;
    private subscribers: ScrollListener[];
    private wait: boolean;

    constructor() {
        this.scrollSpeed = 500;
        this.scrollThresholdMs = 50;
        this.subscribers = new Array<ScrollListener>();
        this.wait = false;
    }

    triggerCallbacks(event) {
        for (let subscriber of this.subscribers) {
            subscriber.scroll(event);
        }
    }

    scrolled(event) {
        this.lastScrollEvent = event;
        if (!this.wait) {
            this.wait = true;
            var self = this;
            setTimeout(function() {
                self.triggerCallbacks(self.lastScrollEvent);
                self.wait = false;
            }, this.scrollThresholdMs);
        }
    }

    subscribe(subscriber: ScrollListener) {
        this.subscribers.push(subscriber);
    }

    scrollTo($element) {
        const scrollHeight = window.scrollY,
            scrollStep = Math.PI / ( this.scrollSpeed / 15 ),
            cosParameter = scrollHeight / 2;
        var scrollCount = 0,
            scrollMargin;
        requestAnimationFrame(step);
        function step () {
            setTimeout(function() {
                if ( window.scrollY != 0 ) {
                    requestAnimationFrame(step);
                    scrollCount = scrollCount + 1;
                    scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                    window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
                }
            }, 15 );
        }
    }
}