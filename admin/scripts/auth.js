// Admin Auth - LocalStorage stub, ready for Supabase Auth

import './supabase.js';

class AdminAuth {
  static async checkAuth() {
    const { data: { session } } = await window.supabase.auth.getSession();
    if (!session) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  }

  static async login(email, password) {
    const { data, error } = await window.supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw new Error(error.message);
    return data;
  }

  static logout() {
    window.supabase.auth.signOut();
    window.location.href = 'index.html';
  }
}

if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      await AdminAuth.login(email, password);
      window.location.href = 'dashboard.html';
    } catch (error) {
      alert(error.message);
    }
  });
}

document.addEventListener('DOMContentLoaded', AdminAuth.checkAuth);
document.getElementById('logout')?.addEventListener('click', AdminAuth.logout);

export default AdminAuth;
