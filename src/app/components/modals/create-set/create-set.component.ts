import { Component, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.scss'],
  imports: [IonInput],
})
export class CreateSetComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
