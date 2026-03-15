import { EventEmitter } from 'events';

// This singleton lives as long as the server is running
export const eventHub = new EventEmitter();

