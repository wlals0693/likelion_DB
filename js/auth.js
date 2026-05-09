import { supabase } from './supabase.js';

// 회원가입
const signupForm = document.querySelector('#signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.querySelector('#signupEmail').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert('회원가입 실패');
      console.error(error);
      return;
    }

    alert('회원가입이 완료되었습니다.');
    location.href = './index.html';
  });
}

// 로그인
const loginForm = document.querySelector('#loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('로그인 실패');
      console.error(error);
      return;
    }

    alert('로그인되었습니다.');
    location.href = './index.html';
  });
}
