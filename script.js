/*
  ============================================================
  EMAIL SETTINGS (EDIT HERE)
  Replace GREENLIGHT_EMAIL with your real inbox.
  Every join button and visible email address uses this one value.
  ============================================================
*/
const GREENLIGHT_EMAIL = "hello@greenlightchicago.org";

/*
  You can edit the subject/body below to change the prefilled email template.
*/
const JOIN_EMAIL_SUBJECT = "Interested in Joining GreenLight Chicago";
const JOIN_EMAIL_BODY = [
  "Hi GreenLight Chicago Team,",
  "",
  "Name:",
  "Grade:",
  "School:",
  "City/Area:",
  "Interests:",
  "Skills:",
  "Why do you want to join GreenLight Chicago?",
  "",
  "Thank you!"
].join("\n");

function buildMailtoLink(email, subject, body) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
}

function applyJoinLinks() {
  const mailtoHref = buildMailtoLink(GREENLIGHT_EMAIL, JOIN_EMAIL_SUBJECT, JOIN_EMAIL_BODY);

  document.querySelectorAll("[data-join-link]").forEach((link) => {
    link.setAttribute("href", mailtoHref);
  });

  document.querySelectorAll("[data-email-display]").forEach((emailLink) => {
    emailLink.textContent = GREENLIGHT_EMAIL;
    emailLink.setAttribute("href", `mailto:${GREENLIGHT_EMAIL}`);
  });
}

function setupRevealOnScroll() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupSmoothAnchors() {
  const header = document.querySelector(".site-header");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const offset = (header ? header.offsetHeight : 0) + 14;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
      window.history.replaceState({}, "", targetId);
    });
  });
}

function setFooterYear() {
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyJoinLinks();
  setupRevealOnScroll();
  setupSmoothAnchors();
  setFooterYear();
});
