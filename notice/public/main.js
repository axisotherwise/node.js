const $image = document.querySelector(".image");
const $imageUrl = document.querySelector(".image-url");
const $imagePreview = document.querySelector(".image-preview");
const $detail = document.querySelectorAll(".detailnotice");

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
