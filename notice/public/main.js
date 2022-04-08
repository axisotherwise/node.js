const $image = document.querySelector(".image");
const $imageUrl = document.querySelector(".image-url");
const $imagePreview = document.querySelector(".image-preview");
const $detail = document.querySelectorAll(".detailnotice");
const $following = document.querySelectorAll(".followingbutton");
const $unfollowing = document.querySelectorAll(".unfollowingbutton");
const $form = document.querySelector(".form");
const $select = document.querySelector(".select");
const $search = document.querySelector(".search");
const $searchButton = document.querySelector(".searchbutton");
const $first = document.querySelector(".first");

$first.addEventListener("click", () => {
  const test = "윤승근";
  axios.get("/notice/1")
    .then(() => {
      location.href = "/notice/1";
    })
    .catch((err) => {
      console.error(err);
    })
});
let kind = "제목";
let value;
$select.addEventListener("change", (e) => {
  kind = $select.options[$select.selectedIndex].value;
});
$searchButton.addEventListener("click", () => {
  value = $search.value;
  axios.get(`/notice/search/${encodeURIComponent(kind)}/${encodeURIComponent(value)}`)
    .then((res) => {
      location.href = `/notice/search/${kind}/${value}`;
    })
    .catch((err) => {
      console.error(err);
    });
});
$unfollowing.forEach((el) => {
  el.addEventListener("click", async function() {
    const myId = document.querySelector(".my-id").value;
    const userId = el.parentNode.querySelector(".user-id").value;
    if (myId !== userId) {
      const result = await axios.delete(`/user/unfollowing/${userId}`);
      location.reload();
    }
  });
});
$following.forEach((el) => {
  el.addEventListener("click", () => {
    const myId = document.querySelector(".my-id").value;
    const userId = el.parentNode.querySelector(".user-id").value;
    if (myId !== userId) {
      if (confirm("팔로잉하시겠습니까.")) {
        axios.post(`/user/following/${userId}`)
          .then(() => {
            location.reload();
          })
          .catch((err) => {
            console.error(err);
          })
      } 
    }
  });
});
$detail.forEach((el) => {
  el.addEventListener("click", () => {
    const noticeId = el.value;
    axios.get(`/notice/detail/${noticeId}`)
      .then(() => {
        location.href = `/notice/detail/${noticeId}`;
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
function noticeImage(e) {
  const formData = new FormData();
  formData.append("image", this.files[0]);
  axios.post("/notice/image", formData)
    .then((res) => {
      console.log(res.data.url);
      $imageUrl.value = res.data.url;
      $imagePreview.src = res.data.url;
      $imagePreview.style.display = "inline";
    })
    .catch((err) => {
      console.error(err);
    });
}
$image.addEventListener("change", noticeImage);
