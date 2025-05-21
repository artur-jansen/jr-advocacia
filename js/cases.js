window.addEventListener("scroll", () => {
  const timeline = document.querySelector(".timeline-line");
  const timelineFill = document.querySelector(".timeline-fill");

  const timelineTop = timeline.getBoundingClientRect().top + window.scrollY;
  const timelineHeight = timeline.offsetHeight;

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  let fillHeight = scrollY + windowHeight - timelineTop;
  if (fillHeight < 0) fillHeight = 0;
  if (fillHeight > timelineHeight) fillHeight = timelineHeight;

  const items = document.querySelectorAll(".timeline-item");
  const terceiroCircle = items[2].querySelector(".circle");
  const terceiroCircleTop = terceiroCircle.getBoundingClientRect().top + window.scrollY;
  const relativoTerceiro = terceiroCircleTop - timelineTop;

  // Velocidades ajustadas para ficar mais lenta e acelerar suavemente
  const velocidadeLenta = 0.4;
  const velocidadeRapida = 2.0;

  let alturaAtual;

  if (fillHeight < relativoTerceiro) {
    alturaAtual = fillHeight * velocidadeLenta;
  } else {
    const restante = timelineHeight - fillHeight;
    const progressoRapido = (scrollY + windowHeight - timelineTop - relativoTerceiro) * velocidadeRapida;
    alturaAtual = relativoTerceiro * velocidadeLenta + progressoRapido;

    if (alturaAtual > timelineHeight) alturaAtual = timelineHeight;
  }

  timelineFill.style.height = alturaAtual + "px";

  // Ativação dos círculos com pequeno atraso
  const atrasoAtivacao = 10;

  items.forEach(item => {
    const circle = item.querySelector(".circle");
    const circleTop = circle.getBoundingClientRect().top + window.scrollY;
    const relativoCircleTop = circleTop - timelineTop;

    if (alturaAtual >= relativoCircleTop + atrasoAtivacao) {
      circle.classList.add("ativa");
    } else {
      circle.classList.remove("ativa");
    }
  });
});
