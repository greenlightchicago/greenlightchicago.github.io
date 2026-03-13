/*
  ============================================================
  EMAIL SETTINGS (EDIT HERE)
  Replace GREENLIGHT_EMAIL with your real inbox address.
  Every join button + email text uses this one value.
  ============================================================
*/
const GREENLIGHT_EMAIL = "hello@greenlightchicago.org";

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

function animateCount(element, target, suffix = "") {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    element.textContent = `${target}${suffix}`;
    return;
  }

  const durationMs = 1250;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / durationMs, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);

    element.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

function setupCountUpOnScroll() {
  const counters = document.querySelectorAll(".count-up");
  if (!counters.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const el = entry.target;
        const target = Number(el.getAttribute("data-target"));
        const suffix = el.getAttribute("data-suffix") || "";

        if (!Number.isFinite(target)) {
          return;
        }

        animateCount(el, target, suffix);
        obs.unobserve(el);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));
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
  setupCountUpOnScroll();
  setFooterYear();
});
