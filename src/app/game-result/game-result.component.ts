import { Component, OnInit, Input } from '@angular/core';
import { Result } from '../models/room.model';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements OnInit {

  constructor() { }
  @Input() result!: Result
  ngOnInit(): void {
  }

}
