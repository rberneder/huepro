export class ModusService {

    private modus: string;
    private modi: any;
    
    constructor() {
        this.modus = '';
        this.modi = {
            search: 'search/'
        }
    }

    setModus(modus: string = '') {
        if (this.modi[modus]) {
            this.modus = this.modi[modus];
        }
    }

    getModus(): string {
        return this.modus;
    }

    resetModus() {
        this.modus = '';
    }
    
    
}