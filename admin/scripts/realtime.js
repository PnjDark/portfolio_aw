// Realtime Module - BroadcastChannel stub for local, ready for Supabase channels

import './supabase.js';

class AdminRealtime {
  constructor() {
    this.channels = new Map();
    this.subscriptions = new Map();
    this.init();
  }

  init() {
    // Global channel for changes
    const changesChannel = window.supabase.channel('db-changes');
    changesChannel
      .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
        this.handleUpdate(payload.table, payload.new);
      })
      .subscribe();
  }

  subscribe(table, callback) {
    this.channels.set(table, callback);
    
    // Per table subscription
    const channel = window.supabase.channel(`${table}-changes`);
    channel
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table 
      }, (payload) => callback(payload.new || payload.old))
      .subscribe((status) => {
        console.log(`Realtime sub ${table}: ${status}`);
      });
    
    this.subscriptions.set(table, channel);
  }

  broadcast(table, data) {
    // Client-side only - Supabase handles server broadcast
    const callback = this.channels.get(table);
    if (callback) callback(data);
  }

  handleUpdate(table, data) {
    const callback = this.channels.get(table);
    if (callback) callback(data);
  }
}

window.AdminRealtime = new AdminRealtime();
export default AdminRealtime;
