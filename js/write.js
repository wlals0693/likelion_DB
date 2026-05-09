import { supabase } from './supabase.js';

const writeForm = document.querySelector('#writeForm');
const titleInput = document.querySelector('#title');
const contentInput = document.querySelector('#content');

writeForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert('제목과 내용을 모두 입력하세요.');
    return;
  }

  const { error } = await supabase.from('posts').insert({
    title: title,
    content: content,
  });

  if (error) {
    alert('게시글 작성 실패');
    console.error(error);
    return;
  }

  alert('게시글이 작성되었습니다.');
  location.href = './index.html';
});
