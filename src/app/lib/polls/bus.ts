import { EventEmitter } from "events";
import { MAX_SUBSCRIBERS } from "../config";

export const bus = new EventEmitter();

bus.setMaxListeners(MAX_SUBSCRIBERS);
