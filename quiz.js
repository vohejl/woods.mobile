let currentStep = 1;
const totalSteps = 6; // Der er 6 spørgsmål – resultatsiden er step 7 i progressbar'en

// Start quiz
function startQuiz() {
  const nameInput = document.getElementById('username-input').value;
  if (nameInput.trim() === '') {
    alert('Skriv venligst dit navn');
    return;
  }

  document.getElementById('quiz-start').style.display = 'none';
  document.getElementById(`question-${currentStep}`).style.display = 'block';

  const placeholder = document.getElementById('username-placeholder');
  if (placeholder) {
    placeholder.textContent = nameInput;
  }

  updateProgress();
}

// Gå til næste spørgsmål
function nextQuestion() {
  document.getElementById(`question-${currentStep}`).style.display = 'none';
  currentStep++;

  if (currentStep > totalSteps) {
    showResults();
    return;
  }

  document.getElementById(`question-${currentStep}`).style.display = 'block';
  updateProgress();
}

// Gå til forrige spørgsmål
function prevQuestion() {
  if (currentStep === 1) return;

  document.getElementById(`question-${currentStep}`).style.display = 'none';
  currentStep--;
  document.getElementById(`question-${currentStep}`).style.display = 'block';

  updateProgress();
}

// Opdater progressbar
function updateProgress() {
  const steps = document.querySelectorAll(".quiz-step-indicator .step");
  steps.forEach((step, index) => {
    step.classList.toggle("active", index < currentStep);
  });
}

// Vis resultat og opdater sidste step i progressbar
function showResults() {
  document.querySelectorAll('.quiz-question').forEach(q => q.style.display = 'none');
  document.getElementById('quiz-result').style.display = 'block';

  // Marker step 7 som aktiv i progressbar'en
  const steps = document.querySelectorAll(".quiz-step-indicator .step");
  steps.forEach((step, index) => {
    step.classList.add("active");
  });
}
