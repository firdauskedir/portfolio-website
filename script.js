document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }

  const header = document.querySelector(".site-header");
  const updateHeader = () => header && header.classList.toggle("scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const form = document.querySelector("#contact-form");
  if (form) {
    const status = document.querySelector("#form-status");
    const setError = (field, message) => {
      const error = form.querySelector(`[data-error-for="${field.name}"]`);
      field.classList.toggle("invalid", Boolean(message));
      if (error) error.textContent = message;
    };

    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");
      let valid = true;

      if (!name.value.trim()) { setError(name, "Please enter your name."); valid = false; }
      else setError(name, "");

      if (!email.value.trim()) { setError(email, "Please enter your email."); valid = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setError(email, "Please enter a valid email address."); valid = false;
      } else setError(email, "");

      if (!message.value.trim()) { setError(message, "Please enter a message."); valid = false; }
      else setError(message, "");

      if (valid) {
        status.textContent = "Thanks! Your message passed validation. Connect a form service to receive it.";
        status.className = "form-status success";
        form.reset();
      } else {
        status.textContent = "Please fix the highlighted fields.";
        status.className = "form-status";
      }
    });
  }
});