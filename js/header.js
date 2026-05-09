import { supabase } from './supabase.js';

const loginLink = document.querySelector('#loginLink');
const signupLink = document.querySelector('#signupLink');
const userEmail = document.querySelector('#userEmail');
const logoutBtn = document.querySelector('#logoutBtn');

async function checkLogin() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    loginLink.style.display = 'none';
    signupLink.style.display = 'none';

    userEmail.textContent = user.email;
    logoutBtn.style.display = 'inline-block';
  } else {
    loginLink.style.display = 'inline';
    signupLink.style.display = 'inline';

    userEmail.textContent = '';
    logoutBtn.style.display = 'none';
  }
}

logoutBtn.addEventListener('click', async function () {
  await supabase.auth.signOut();

  alert('로그아웃되었습니다.');
  location.href = './index.html';
});

checkLogin();
