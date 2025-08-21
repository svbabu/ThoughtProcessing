// ThoughtProcessing Scroll Logic
// Gently guides users to the right section—like turning to the right page in a book.

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault(); // Honor structure, not force behavior
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn("Target not found:", targetId);
      }
    });
  });
});
