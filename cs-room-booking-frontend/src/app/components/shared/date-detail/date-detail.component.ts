import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-date-detail',
  templateUrl: './date-detail.component.html',
  styleUrls: ['./date-detail.component.css']
})
export class DateDetailComponent implements OnChanges {
  backgroundColor: string = "#A86464"
  currentStatus: string = ""
  @Input() date: string = '';
  @Input() freeHour: number = 0;
  @Input() childValue: string = '';
  color: any = {
    danger: "#A86464",
    warn: "#C38154",
    success: "#5C8984"
  }
  status: any = {
    danger: "FULLY BOOKED",
    warn: "ALMOST FULL",
    success: "AVAILABLE"
  }


  ngOnInit() {
    this.checkStatus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['freeHour']) {
      this.checkStatus()
    }
  }

  checkStatus() {
    if (this.freeHour == 0) {
      this.backgroundColor = this.color["danger"]
      this.currentStatus = this.status.danger
    } else if (this.freeHour > 0 && this.freeHour < 5) {
      this.backgroundColor = this.color["warn"]
      this.currentStatus = this.status.warn
    } else {
      this.backgroundColor = this.color["success"]
      this.currentStatus = this.status.success
    }
  }
}
