const ratingContainer = document.querySelector(".rating");
let currentValue = 0;
const limit = 7;

const html = Array.from(Array(limit)).map((_, i) => {
  return `<div class="item item-${i}" data-pos="${i}"></div>`;
});

ratingContainer.innerHTML = html.join("");

document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    const pos = item.getAttribute("data-pos");

    if (currentValue === parseInt(pos) + 1) {
      return;
    }

    document.querySelectorAll(".item").forEach((it) => {
      if (it.classList.contains("item-full")) {
        it.classList.remove("item-full");
      }
    });

    for (let index = 0; index <= pos; index++) {
      const square = document.querySelector(`.item-${index}`);
      if (!square.classList.contains("item-full")) {
        square.classList.add("item-full");
      }
    }
    currentValue = parseInt(pos) + 1;
  });

  item.addEventListener("click", (e) => {
    const pos = item.getAttribute("data-pos");
    currentValue = parseInt(pos) + 1;
    console.log(currentValue);
  });
});
