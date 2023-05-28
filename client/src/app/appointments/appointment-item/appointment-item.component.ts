import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/models';

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.scss']
})
export class AppointmentItemComponent implements OnInit {

  @Input() appointment: Appointment;
  @Input() showNameOf: "doctor" | "patient" = "patient";
  @Input() showResponseOptions: boolean = true;
  @Input() showStatus: boolean = false;

  @Output() onDecline = new EventEmitter<null>();
  @Output() onAccept = new EventEmitter<null>();
    
  dateStr: string;
  timeStr: string;
  
  ngOnInit() {
    const date = new Date(this.appointment.date);
    this.dateStr = date.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    this.timeStr = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }


}
