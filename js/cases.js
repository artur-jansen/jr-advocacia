window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const docHeight = document.body.scrollHeight - viewportHeight;

  const percent = (scrollTop / docHeight) * 100;
  const timelineFill = document.querySelector(".timeline-fill");
  timelineFill.style.height = percent + "%";

  // Obter altura total da linha preenchida no documento
  const linhaTopo = document.querySelector(".timeline-line").getBoundingClientRect().top + window.scrollY;
  const alturaPreenchida = linhaTopo + (timelineFill.offsetHeight);

  // Checar a posição de cada círculo
  const items = document.querySelectorAll(".timeline-item");

  items.forEach(item => {
    const circle = item.querySelector(".circle");
    const circleRect = circle.getBoundingClientRect();
    const circleY = circleRect.top + window.scrollY + (circle.offsetHeight / 2);

    if (alturaPreenchida >= circleY) {
      circle.classList.add("ativa");
    } else {
      circle.classList.remove("ativa");
    }
  });
});