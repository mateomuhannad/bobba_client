import Room from "../Room";
import { Direction } from "../../imagers/avatars/AvatarInfo";
import RoomItem from "./RoomItem";

export default class RoomItemManager {
    room: Room;
    items: RoomItemDictionary;

    constructor(room: Room) {
        this.room = room;
        this.items = {};
    }

    getItem(id: number): RoomItem | null {
        return (id in this.items) ? this.items[id] : null;
    }

    addItemToRoom(id: number, x: number, y: number, z: number, rot: Direction, baseId: number) {
        const item = this.getItem(id);
        if (item == null) {
            const newItem = new RoomItem(id, x, y, z, rot, baseId, this.room);
            this.room.engine.addRoomItemSprite(newItem.sprite);
            this.items[id] = newItem;
        } else {
            //user.updateParams(x, y...);
        }
    }

    removeItemFromRoom(id: number) {
        this.room.engine.removeUserSprite(id);
        if (this.getItem(id) != null) {
            delete(this.items[id]);
        }
    }

    tick(delta: number) {
        for (let key in this.items) {
            if (this.items[key] != null) {
                this.items[key].tick(delta);
            }
        }
    }
}

interface RoomItemDictionary {
    [id: number]: RoomItem;
}