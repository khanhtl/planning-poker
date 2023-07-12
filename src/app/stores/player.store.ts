import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs'
import { Player } from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerStore {
  private _player=new BehaviorSubject<Player>({} as Player);

  get player$() {
    return this._player.asObservable();
  }

  set player(value: Player) {
    this._player.next(value);
  }
  get player() {
    return this._player.value;
  }
}
