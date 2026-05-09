import { supabase } from './supabase.js';

const postList = document.querySelector('#postList');

const postModal = document.querySelector('#postModal');

const modalTitle = document.querySelector('#modalTitle');
const modalContent = document.querySelector('#modalContent');
const modalDate = document.querySelector('#modalDate');

const closeModal = document.querySelector('#closeModal');

const editBtn = document.querySelector('#editBtn');
const deleteBtn = document.querySelector('#deleteBtn');

async function getPosts() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    postList.innerHTML = '<p>게시글을 불러오지 못했습니다.</p>';
    console.error(error);
    return;
  }

  if (data.length === 0) {
    postList.innerHTML = '<p>아직 작성된 게시글이 없습니다.</p>';
    return;
  }

  postList.innerHTML = '';

  data.forEach(function (post) {
    const article = document.createElement('article');

    article.classList.add('post-card');

    article.innerHTML = `
      <h3>${post.title}</h3>

      <div class="post-info">
        <span>
          ${new Date(post.created_at).toLocaleString()}
        </span>
      </div>
    `;

    article.addEventListener('click', function () {
      modalTitle.textContent = post.title;
      modalContent.textContent = post.content;
      modalDate.textContent = new Date(post.created_at).toLocaleString();

      if (user && user.id === post.user_id) {
        editBtn.style.display = 'inline-block';
        deleteBtn.style.display = 'inline-block';

        editBtn.href = `./edit.html?id=${post.id}`;
        deleteBtn.dataset.id = post.id;
      } else {
        editBtn.style.display = 'none';
        deleteBtn.style.display = 'none';
      }

      postModal.classList.add('active');
    });

    postList.appendChild(article);
  });
}

closeModal.addEventListener('click', function () {
  postModal.classList.remove('active');
});

deleteBtn.addEventListener('click', async function () {
  const postId = deleteBtn.dataset.id;

  const isDelete = confirm('게시글을 삭제하시겠습니까?');

  if (!isDelete) {
    return;
  }

  const { error } = await supabase.from('posts').delete().eq('id', postId);

  if (error) {
    alert('게시글 삭제 실패');
    console.error(error);
    return;
  }

  alert('게시글이 삭제되었습니다.');

  postModal.classList.remove('active');

  getPosts();
});

getPosts();
