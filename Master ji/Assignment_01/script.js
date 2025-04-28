document.addEventListener("DOMContentLoaded", () => {
  // selectiong ALl elements
  const Quotes = document.querySelector(".content");
  const Author = document.querySelector(".Author");
  const btn1 = document.querySelector(".btn-1");
  const TwitterBtn = document.querySelector(".btn-2");
  const Root = document.querySelector(".Root");
  let Base_Url = `https://api.freeapi.app/api/v1/public/quotes/quote/random`;

  // setting Quotes
  async function GetQuotes(url) {
    const response = await fetch(url);
    let Data = await response.json();
    console.log(Data.data.author);
    Quotes.innerHTML = Data.data.content;
    Author.innerHTML = Data.data.author;
  }
  GetQuotes(Base_Url);

  // Change quotes
  btn1.addEventListener("click", () => {
    GetQuotes(Base_Url);
  });

  // share with twitter
  TwitterBtn.addEventListener("click", () => {
    window.open(
      "https://twitter.com/intent/tweet?text=" +
        Quotes.textContent +
        "---- By " +
        Author.innerHTML
    );
    console.log(Author.innerHTML);
    console.log(Quotes.innerHTML);
  });

  // BackGround changer
  const AccessKey = `GrnxukqQ8x4zdsBo22Ca1_yVsfFwU2NtKVjpa8DocYc`;
  const unsplash_Url = `https://api.unsplash.com/photos/random`;
  const urls = unsplash_Url + "?client_id=" + AccessKey;

  async function getImage(url) {
    const response = await fetch(url);
    let Datas = await response.json();
    console.log(Datas.urls.full);
    Root.style.backgroundImage = `url(${Datas.urls.full})`;
    Root.style.backgroundRepeat = "no-repeat";
    Root.style.backgroundSize = "cover";
    const DonloadImage = document.createElement("a");
    DonloadImage.textContent = "Download Image";
    DonloadImage.href = Datas.urls.full;
    DonloadImage.target = "_blank";
    DonloadImage.download = "image.jpg";
    console.log(DonloadImage);
    Root.appendChild(DonloadImage);
  }
  getImage(urls);
});
