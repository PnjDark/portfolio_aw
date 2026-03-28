// DB Module - LocalStorage CRUD, ready for Supabase

import './supabase.js';

class AdminDB {
  static async get(table) {
    const { data, error } = await window.supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async create(table, item) {
    const { data, error } = await window.supabase
      .from(table)
      .insert([item])
      .select()
      .single();
    if (error) throw error;
    AdminRealtime.broadcast(table, data);
    return data;
  }

  static async update(table, id, updates) {
    const { data, error } = await window.supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    AdminRealtime.broadcast(table, data);
    return data;
  }

  static async delete(table, id) {
    const { error } = await window.supabase
      .from(table)
      .delete()
      .eq('id', id);
    if (error) throw error;
    AdminRealtime.broadcast(table, id);
  }

  static async uploadFile(file, bucket = 'assets') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await window.supabase.storage
      .from(bucket)
      .upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return publicUrl;
  }
}

window.AdminDB = AdminDB;
export default AdminDB;
