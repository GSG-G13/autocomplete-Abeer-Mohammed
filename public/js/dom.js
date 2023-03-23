const wordInput = document.querySelector('input');

const createElement = (tagName, className, parent) => {
  const element = document.createElement(tagName)
  element.className = className
  parent.appendChild(element)
  return element
}

const renderWords = (words) => {
  const listData = document.querySelector('ul')
  listData.textContent = ''
  words?.forEach((word) => {
    const list = createElement('li', 'list-word', listData)
    list.textContent = word;
    list.addEventListener("click", () => {
      listData.textContent = "";
      wordInput.value = list.textContent;
    })

  })
}

wordInput.addEventListener('keyup', (e) => {
  const value = e.target.value
  get(`/api/word/filtered?q=${value}`, (data) => {
    renderWords(data)
  })
})

const btnSearch = document.querySelector('#btn-search')
btnSearch.addEventListener('click', (e) => {
  e.preventDefault();
  get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}`,
    (data) => {
      getData(data[0]);
    },
  )
})

function getData(data) {
  const outerPopup = document.querySelector(".outer-popup");
  outerPopup.style.display = "flex";
  const closePopup = outerPopup.querySelector(".close-popup i");
  closePopup.addEventListener("click",() => {
  outerPopup.style.display = "none";
  wordInput.value = "";
  document.querySelector("ul").textContent = "";
  });
   const innerPopup = document.querySelector(".inner-popup");
  const innerPopupMeaning = innerPopup.querySelector(".inner-popup h4");
  innerPopupMeaning.textContent = data.meanings[0].definitions[0].definition;
  const audio = createElement('audio','',innerPopup);
  audio.setAttribute("src",`https://api.dictionaryapi.dev/media/pronunciations/en/${wordInput.value}-us.mp3`);
  audio.play()
}