/**
 * Navbar toggle
 */

const main = () => {
  const navbarBtn = document.getElementById("navbarBtn");
  const navbarNav = document.getElementById("navbarNav");

  navbarBtn.addEventListener("click", () =>
    navbarNav.classList.toggle("collapse")
  );
};

window.addEventListener("DOMContentLoaded", main);
