let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherFun();
    form.reset();
});
const contactF = document.querySelectorAll(".results");
let delay = (Array) => {
  Array.forEach((z, index) => {
    setTimeout(() => {
      contactF[index].innerHTML = z;
    }, (index + 1) * 500);
  });
};

let weatherFun = async () => {
  contactF.forEach((z) => (z.innerHTML = ""));
  try {
    const address = document.getElementById("address").value;
    const res = await fetch("http://localhost:3000/weather?address=" + address);
    const data = await res.json();
    console.log(data);
    if (data.error) {
      delay([data.error]);
    } else {
      delay([data.location, data.forecast, data.latitude, data.longitude]);
    }
  } catch (e) {
    console.log(e);
  }
};

////////////////////////////////////////////////////////////////
const images = document.querySelectorAll(".img");
// const YBound = innerHeight - 300;
const XBound = innerWidth - 300;

const move = (img, sign) => {
  let positionX = +img.style.left.substring(0, img.style.left.length - 2);
  setInterval(() => {
    if (sign) {
      positionX += 4;
      img.style.left = positionX;
    } else {
      positionX -= 4;
      img.style.left = positionX;
    }
    if (positionX >= XBound || positionX < 0) {
      sign = !sign;
    }
  }, 200);
};

images.forEach((img, i) => {
  var y = Math.floor(Math.random() * innerHeight - 300);
  var x = Math.floor(Math.random() * innerWidth - 300);
  img.style.top = y <= 0 ? 0 : y;
  img.style.left = x <= 0 ? 0 : x;
  move(img, i % 2);
});
