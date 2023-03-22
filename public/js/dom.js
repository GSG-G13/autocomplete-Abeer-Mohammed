const createElement = (tagName,className,parent) => {
    const element = document.createElement(tagName);
    element.className = className;
    parent.appendChild(element);
    return element;
}


const renderWords = (words) => {
  const listData = document.querySelector("ul");
  listData.textContent = "";
    words?.forEach(word => {
        const list = createElement("li","list-word",listData);
        list.textContent =word;
    });

}

const wordInput = document.querySelector("input");
wordInput.addEventListener("keyup", (e) => {

    const value = e.target.value;
   get(`/api/word/filtered?q=${value}`,(data) => {
    
    // document.querySelectorAll('li').forEach((item) => {
    //   item.remove();
    // });
    renderWords(data);
  });
})