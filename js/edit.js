import { supabase } from './supabase.js';

const editForm = document.querySelector('#editForm');
const titleInput = document.querySelector('#title');
const contentInput = document.querySelector('#content');

const params = new URLSearchParams(location.search);
const postId = params.get('id');

let currentUser = null;

async function getPost() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert('로그인이 필요합니다.');
    location.href = './login.html';
    return;
  }

  currentUser = user;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (error) {
    alert('게시글을 불러오지 못했습니다.');
    console.error(error);
    location.href = './index.html';
    return;
  }

  if (data.user_id !== currentUser.id) {
    alert('본인이 작성한 글만 수정할 수 있습니다.');
    location.href = './index.html';
    return;
  }

  titleInput.value = data.title;
  contentInput.value = data.content;
}

editForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert('제목과 내용을 모두 입력하세요.');
    return;
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title: title,
      content: content,
    })
    .eq('id', postId);

  if (error) {
    alert('게시글 수정 실패');
    console.error(error);
    return;
  }

  alert('게시글이 수정되었습니다.');
  location.href = './index.html';
});

getPost();
