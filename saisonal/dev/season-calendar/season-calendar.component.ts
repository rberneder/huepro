import {Component} from "angular2/core";
import {OnInit} from "angular2/core";

@Component({
    selector: "season-calendar",
    templateUrl: '/templates/season-calendar/season-calendar.template.html',
})
export class SeasonCalendarComponent implements OnInit {

    ngOnInit():any {
        console.log('Season-Calendar loaded');
    }
}