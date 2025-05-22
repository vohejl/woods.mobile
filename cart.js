// cart.js

document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".checkout-step");
    const progress = document.querySelector(".progress-bar-fill");
    const nextBtn = document.querySelector("#go-to-checkout");
    const backBtn = document.querySelector("#go-back");
  
    let currentStep = 0;
  
    function goToStep(index) {
      if (index < 0 || index >= steps.length) return;
  
      steps.forEach((step, i) => {
        step.classList.toggle("active", i <= index);
      });
  
      const stepWidth = 100 / (steps.length - 1);
      progress.style.width = `${index * stepWidth}%`;
      currentStep = index;
    }
  
    // Gå til næste trin (Checkout)
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToStep(1); // step 1 = "Checkout"
      });
    }
  
    // Gå tilbage til trin 0 (Kurv)
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        goToStep(0);
      });
    }
  
    // Initial visning
    goToStep(0);
  });
  
  const slider = document.querySelector('.best-sellers-slider');
const progressBar = document.querySelector('.slider-progress-bar');

slider.addEventListener('scroll', () => {
  const scrollLeft = slider.scrollLeft;
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  const scrollPercent = (scrollLeft / maxScroll) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});
