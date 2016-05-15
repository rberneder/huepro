import {ScrollListener} from "./scroll-listener";
import {Observable} from "rxjs/Observable";

export class ScrollService {
    public scrollStream;
    private subscribers: ScrollListener[];
    private debounce: number = 100;
    private wait: boolean = false;
    private lastEvent: Event;


    constructor() {
        this.subscribers = new Array<ScrollListener>();
        this.scrollStream = new Observable<Event>(observer =>
            window.addEventListener('scroll', (event) => {
                this.lastEvent = event;
                if (!this.wait) {
                    this.wait = true;
                    setTimeout(() => {
                        observer.next(this.lastEvent);
                        this.wait = false;
                    }, this.debounce);
                }
            })
        );
        this.scrollStream
            .subscribe(
                event => this.triggerCallbacks(event)
        );
    }

    triggerCallbacks(event) {
        for (let subscriber of this.subscribers) {
            subscriber.scroll(event);
        }
    }
    
    subscribe(subscriber: ScrollListener) {
        console.log('SUBSCRIBED')
        this.subscribers.push(subscriber);
    }
    
    unsubscribe(subscriber: ScrollListener) {
        console.log('UNSUBSCRIBED')
        this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
    }
    
    scrollTo($element) {
        const offsetTop = 200,
            targetPos = $element.offsetTop - offsetTop,
            scrollHeight = window.scrollY,
            scrollStep = Math.PI / (500 / 15),
            cosParameter = (scrollHeight - targetPos) / 2,
            scrollDown = targetPos > scrollHeight;
        var scrollCount = 0,
            scrollMargin;
        requestAnimationFrame(step);
        function step() {
            setTimeout(function() {
                if (scrollDown && window.scrollY <= targetPos - 5 ||
                    !scrollDown && window.scrollY >= targetPos + 5) {
                    requestAnimationFrame(step);
                    scrollCount = scrollCount + 1;
                    scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                    window.scrollTo(0, (scrollHeight - scrollMargin));
                }
            }, 15);
        }
    }
}