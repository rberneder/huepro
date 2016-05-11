export class ScrollService {
    private scrollPos: number;
    private lastScrollTime: number;
    private scrollThresholdMs: number;
    private callbacks: string[];
    private objects: any[];
    private callbackCount: number;

    constructor() {
        this.scrollPos = 0;
        this.lastScrollTime = 0;
        this.scrollThresholdMs = 50;
        this.callbacks = new Array();
        this.objects = new Array();
        this.callbackCount = 0;
    }

    triggerCallbacks(event) {
        for (let i = 0; i < this.callbacks.length; i++) {
            this.objects[i][this.callbacks[i]](event)
        }
    }

    scrolled(event) {
        let timeStamp = event.timeStamp;
        if (timeStamp > (this.lastScrollTime + this.scrollThresholdMs)) {
            this.lastScrollTime = timeStamp;
            this.triggerCallbacks(event);
        }
    }

    addScrollListener(func, obj) {
        this.callbacks.push(func);
        this.objects.push(obj);
    }
}