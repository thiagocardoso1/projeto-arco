document.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-arrow-down-circle")) {
      const section = event.target.closest(".forms");
  
      const form = section.querySelector("form");
      const div = section.querySelector("div")

      if (form) {
        form.style.display = form.style.display === "none" ? "grid" : "none";
      } else if (div) {
        div.style.display = div.style.display === "none" ? "flex" : "none";
      }
    }
  });