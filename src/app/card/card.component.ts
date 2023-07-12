import { Component, Input, OnInit } from '@angular/core';
import { Player, State } from '../models/room.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() state!: State | null;
  @Input() players!: Player[];
  constructor() { }

  ngOnInit(): void {
  }

}
