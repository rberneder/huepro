import {ScrollListener} from "./scroll-listener";

export class ScrollService {
    private scrollPos: number;
    private lastScrollTime: number;
    private scrollThresholdMs: number;
    private subscribers: ScrollListener[];

    constructor() {
        this.scrollPos = 0;
        this.lastScrollTime = 0;
        this.scrollThresholdMs = 50;
        this.subscribers = new Array<ScrollListener>();
    }

    triggerCallbacks(event) {
        for (let subscriber of this.subscribers) {
            subscriber.scroll(event);
        }
    }

    scrolled(event) {
        let timeStamp = event.timeStamp;
        if (timeStamp > (this.lastScrollTime + this.scrollThresholdMs)) {
            this.lastScrollTime = timeStamp;
            this.triggerCallbacks(event);
        }
    }

    subscribe(subscriber: ScrollListener) {
        this.subscribers.push(subscriber);
    }
}