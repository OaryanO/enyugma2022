var imgUpd = document.querySelector("#img-upd");
var imgShow = document.querySelector("#img-show");
var register = document.querySelector(".Register");
var overlays = document.querySelector(".overlays");

// const url = "https://enyugma.herokuapp.com";
var url = "http://localhost:2100";

imgUpd.addEventListener("change", (e) => {
  imgShow.src = URL.createObjectURL(e.target.files[0]);
});

imgShow.addEventListener("load", () => {
  URL.revokeObjectURL(imgShow.src);
});

register.addEventListener("click", () => {
  overlays.style.display = "flex";
  window.location.href = "#";
  document.body.style.overflow = "hidden";
});

document.forms["upd-img"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}/profileImg`, {
    method: "POST",
    body: new FormData(e.target),
    headers: {
      "content-type": "application/json",
      auth_token: `${localStorage.getItem("userToken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        stats.style.backgroundColor = "#46d381bb";
        stats.style.border = "2px solid #2ecc71";
        stats.style.display = "flex";
        stats.innerHTML = "Image Uploaded Successfully";
        overlays.style.display = "none";
      } else {
        stats.style.backgroundColor = "#ff0000bb";
        stats.style.border = "2px solid #de1111";
        stats.style.display = "flex";
        stats.innerHTML = "Something Went Wrong!!";
      }
    })
    .catch((err) => {
      stats.style.backgroundColor = "#ff0000bb";
      stats.style.border = "2px solid #de1111";
      stats.style.display = "flex";
      stats.innerHTML = err;
    });
});

var userName = document.querySelectorAll("#user-name");
var userAppno = document.querySelector("#user-appno");
var userEmail = document.querySelector("#user-email");
var userAddress = document.querySelector("#user-address");
var userEvents = document.querySelector("#user-events");
var stats = document.querySelector(".status");

const displayDetails = (data) => {
  for (let i = 0; i < userName.length; i++) {
    userName[i].innerHTML = data.name;
  }
  userAppno.innerHTML = data.appno;
  userEmail.innerHTML = data.email;
  userAddress.innerHTML = data.address;

  // let html = "";
  // for (let i = 0; i < data.events.length; i++) {
  //   html += `${data.events[i]}, `;
  // }
  // userEvents.innerHTML = html;

  console.log(data.profile)

  if (data.profile == 1) {
    overlays.style.display = "none";
  }
};

setTimeout(() => {
  stats.style.display = "none";
  // window.location.reload();
}, 3000);

fetch(`${url}/userDetails`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    auth_token: `${localStorage.getItem("userToken")}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.status == 0) {
      displayDetails(data.data);
      document.title = `${data.data.name} | Enyugma Portal`;
    } else {
      stats.style.backgroundColor = "#ff0000bb";
      stats.style.border = "2px solid #de1111";
      stats.style.display = "flex";
      stats.innerHTML = "Something Went Wrong!!";
    }
  })
  .catch((err) => {
    stats.style.backgroundColor = "#ff0000bb";
    stats.style.border = "2px solid #de1111";
    stats.style.display = "flex";
    stats.innerHTML = err;
  });

document.forms["data-upd"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}/userUpdDetails`, {
    method: "POST",
    headers: {
      auth_token: `${localStorage.getItem("userToken")}`,
    },
    body: new URLSearchParams(new FormData(e.target)),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        stats.style.backgroundColor = "#46d381bb";
        stats.style.border = "2px solid #2ecc71";
        stats.style.display = "flex";
        stats.innerHTML = "Profile Updated Successfully";
        overlays.style.display = "none";
      } else {
        stats.style.backgroundColor = "#ff0000bb";
        stats.style.border = "2px solid #de1111";
        stats.style.display = "flex";
        stats.innerHTML = "Something Went Wrong!!";
      }
    })
    .catch((err) => {
      stats.style.backgroundColor = "#ff0000bb";
      stats.style.border = "2px solid #de1111";
      stats.style.display = "flex";
      stats.innerHTML = err;
    });
});
