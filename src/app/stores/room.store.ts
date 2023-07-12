import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs'
import { Room } from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomStore {
  _room = new BehaviorSubject<Room>({} as Room);

  get room$() {
    return this._room.asObservable();
  }

  get room() {
    return this._room.value;
  }

  set room(value: Room) {
    this._room.next(value);
  }
}
