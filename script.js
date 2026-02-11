// -----------------------------
// Helpers
// -----------------------------
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// -----------------------------
// Footer year
// -----------------------------
const yearNow = $("#yearNow");
if (yearNow) {
  yearNow.textContent = new Date().getFullYear();
}

// -----------------------------
// About Modal
// -----------------------------
const btnAbout = $("#btnAbout");
const aboutModal = $("#aboutModal");
const closeModalOverlay = $("#closeModal");
const closeModalBtn = $("#closeModalBtn");
const xClose = $("#xClose");

function openModal() {
  if (!aboutModal) return;
  aboutModal.classList.add("show");
  aboutModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!aboutModal) return;
  aboutModal.classList.remove("show");
  aboutModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (btnAbout) btnAbout.addEventListener("click", openModal);
if (closeModalOverlay) closeModalOverlay.addEventListener("click", closeModal);
if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
if (xClose) xClose.addEventListener("click", closeModal);

// ESC to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && aboutModal?.classList.contains("show")) {
    closeModal();
  }
});

// -----------------------------
// Copy Email
// -----------------------------
const copyEmailBtn = $("#copyEmail");
const emailText = $("#emailText");

if (copyEmailBtn && emailText) {
  copyEmailBtn.addEventListener("click", async () => {
    const email = emailText.textContent.trim();

    // If user didn't change email yet
    if (email === "contact.rubabhamim@gfirl.com") {
      alert("Replace the email in HTML first 🙂");
      return;
    }

    try {
      await navigator.clipboard.writeText(email);

      const action = copyEmailBtn.querySelector(".pill-action");
      const old = action.textContent;

      action.textContent = "Copied!";
      copyEmailBtn.style.transform = "translateY(-1px)";

      setTimeout(() => {
        action.textContent = old;
        copyEmailBtn.style.transform = "";
      }, 1400);
    } catch (err) {
      alert("Copy failed. Try manually copying the email.");
    }
  });
}

// -----------------------------
// Portfolio Filters
// -----------------------------
const filters = $$(".filter");
const workCards = $$(".work-card");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active from all
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.filter;

    workCards.forEach((card) => {
      const cardType = card.dataset.type;

      if (type === "all" || cardType === type) {
        card.style.display = "block";
        card.classList.remove("hide");
        card.classList.add("show");
      } else {
        card.classList.remove("show");
        card.classList.add("hide");

        // Delay to allow animation then hide
        setTimeout(() => {
          card.style.display = "none";
        }, 180);
      }
    });
  });
});