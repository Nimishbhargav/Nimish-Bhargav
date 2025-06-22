// Typewriter effect for intro and about
function typeWriterLoop(elementId, texts, delay = 100, pause = 2000) {
  let i = 0, j = 0, currentText = '', isDeleting = false;

  function type() {
    currentText = texts[i];
    const el = document.getElementById(elementId);
    el.textContent = currentText.substring(0, j) + (isDeleting ? '' : '|');

    if (!isDeleting) {
      j++;
      if (j > currentText.length) {
        isDeleting = true;
        setTimeout(type, pause);
        return;
      }
    } else {
      j--;
      if (j === 0) {
        isDeleting = false;
        i = (i + 1) % texts.length;
      }
    }
    setTimeout(type, isDeleting ? delay / 2 : delay);
  }
  type();
}

document.addEventListener("DOMContentLoaded", () => {
  typeWriterLoop("typewriterIntro", [
    "Hi, I'm Nimish Bhargav",
    "Web Developer 💻",
    "AI Enthusiast 🤖",
    "Tech Explorer 🌌"
  ]);

  typeWriterLoop("typewriterAbout", [
    "I'm a college student who builds web apps, AI tools, and unique UI/UX.",
    "I love creating futuristic experiences using code and creativity!"
  ]);

  typeWriterLoop("cardText1", ["AI desktop with voice assistant and gesture control"]);
  typeWriterLoop("cardText2", ["Generates resumes & GitHub READMEs using OpenAI"]);
  typeWriterLoop("cardText3", ["A memory vault to store voice and text inputs"]);
});
