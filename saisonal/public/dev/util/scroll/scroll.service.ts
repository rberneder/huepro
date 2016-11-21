import {Observable} from "rxjs/Observable";

export class ScrollService {
    public scrollStream;
    private animationFrameID;
    private debounce: number = 100;
    private wait: boolean = false;
    private lastEvent: Event;


    constructor() {
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
    }
    
    subscribe(cb) {
        this.scrollStream.subscribe(cb);
    }
    
    scrollTo($element) {
        const offsetTop = 200,
            targetPos = $element.offsetTop - offsetTop,
            scrollHeight = window.scrollY,
            scrollStep = Math.PI / (500 / 15),
            cosParameter = (scrollHeight - targetPos) / 2,
            scrollDown = targetPos > scrollHeight;

        var scrollCount = 0,
            scrollMargin,
            lastScrollMargin = 0;

        function step() {
            setTimeout(() => {
                scrollCount = scrollCount + 1;
                scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);

                if (Math.abs(scrollMargin) > Math.abs(lastScrollMargin)) {
                    lastScrollMargin = scrollMargin;
                    requestAnimationFrame(step);
                    window.scrollTo(0, (scrollHeight - scrollMargin));
                }
            }, 15);
        }

        if (this.animationFrameID) {
            cancelAnimationFrame(this.animationFrameID);
        }
        this.animationFrameID = requestAnimationFrame(step);
    }
}