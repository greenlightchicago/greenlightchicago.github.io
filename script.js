/*
  ============================================================
  EMAIL SETTINGS (EDIT HERE)
  Replace GREENLIGHT_EMAIL with your real inbox address.
  Every join button + email text uses this one value.
  ============================================================
*/
const GREENLIGHT_EMAIL = "greenlightchicago@outlook.com";

/*
  MAILTO TEMPLATE (EDIT HERE)
  Update subject/body fields below if your intake questions change.
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

const BOARD_EMAIL_SUBJECT = "Executive Board Application - GreenLight Chicago";
const BOARD_EMAIL_BODY = [
  "Hi GreenLight Chicago Team,",
  "",
  "I want to apply for an Executive Board position.",
  "",
  "Role applying for (President / VP, Citywide Planning / Treasurer & Operations Lead):",
  "Name:",
  "Grade:",
  "School:",
  "City/Area:",
  "Leadership experience:",
  "Relevant skills:",
  "Why are you a strong fit for this role?",
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
  const boardMailtoHref = buildMailtoLink(GREENLIGHT_EMAIL, BOARD_EMAIL_SUBJECT, BOARD_EMAIL_BODY);

  document.querySelectorAll("[data-join-link]").forEach((link) => {
    link.setAttribute("href", mailtoHref);
  });

  document.querySelectorAll("[data-board-link]").forEach((link) => {
    link.setAttribute("href", boardMailtoHref);
  });

  document.querySelectorAll("[data-email-display]").forEach((emailLink) => {
    emailLink.textContent = GREENLIGHT_EMAIL;
    emailLink.setAttribute("href", `mailto:${GREENLIGHT_EMAIL}`);
  });
}

function setupMenuToggle() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("primaryNav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
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

      const offset = (header ? header.offsetHeight : 0) + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
      window.history.replaceState({}, "", targetId);
    });
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
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupScrollLinkedCountUp() {
  const section = document.getElementById("impact");
  const counters = Array.from(document.querySelectorAll(".count-up")).map((el) => ({
    el,
    target: Number(el.getAttribute("data-target")),
    suffix: el.getAttribute("data-suffix") || ""
  }));

  if (!section || !counters.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    counters.forEach(({ el, target, suffix }) => {
      if (Number.isFinite(target)) {
        el.textContent = `${target}${suffix}`;
      }
    });
    return;
  }

  let ticking = false;
  let maxProgress = 0;

  function renderCounts() {
    ticking = false;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const rect = section.getBoundingClientRect();

    const rawProgress = (viewportHeight - rect.top) / (rect.height + viewportHeight * 0.4);
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    // Keep counts moving forward as users scroll down for a smoother feel.
    maxProgress = Math.max(maxProgress, clampedProgress);

    const easedProgress = 1 - Math.pow(1 - maxProgress, 3);

    counters.forEach(({ el, target, suffix }) => {
      if (!Number.isFinite(target)) {
        return;
      }

      const value = Math.round(target * easedProgress);
      el.textContent = `${value}${suffix}`;
    });
  }

  function requestRender() {
    if (ticking) {
      return;
    }

    ticking = true;
    requestAnimationFrame(renderCounts);
  }

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender);
  requestRender();
}

function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyJoinLinks();
  setupMenuToggle();
  setupSmoothAnchors();
  setupRevealOnScroll();
  setupScrollLinkedCountUp();
  setFooterYear();
});
