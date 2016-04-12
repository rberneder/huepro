import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";

@Component({
    selector: "season-calendar",
    templateUrl: '/templates/season-calendar/season-calendar.template.html',
})
export class SeasonCalendarComponent implements OnInit {
    private month;

    constructor(private _router: Router, private _routeParams: RouteParams) {
        this.setMonth(_routeParams.get("month"));
    };
    
    ngOnInit():any {
        console.log('Season-Calendar loaded for month: ' + this.month);
    }
    
    setMonth(month) {
        let monthNr = parseInt(month);
        if (monthNr >= 0 && monthNr <= 11) {
            this.month = monthNr;
        } else {
            let actMonth = new Date().getMonth();
            console.warn('Invalid month param. Rerouting to month: ' + actMonth);
            this._router.navigate(['SeasonCalendar', {month: actMonth}]);
        }
    }
}