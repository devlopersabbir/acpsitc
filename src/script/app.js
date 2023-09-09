/**
 * Navbar toggle
 */

const main = () => {
  const barBtn = document.getElementById("barBtn");
  const closeBtn = document.getElementById("closeBtn");
  const mobileNavbar = document.getElementById("mobileNavbar");

  barBtn.addEventListener("click", () => {
    mobileNavbar.style.transform = "translateY(0px)";
  });
  closeBtn.addEventListener("click", () => {
    mobileNavbar.style.transform = "translateY(-1000px)";
  });
};

window.addEventListener("DOMContentLoaded", main);
