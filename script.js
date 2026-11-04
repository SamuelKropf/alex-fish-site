// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav border on scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
});

// Mobile menu
const toggle = document.getElementById("menuToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  })
);

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
  { threshold: 0.15 }
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Contact form (Formspree). Falls back to mailto until a form ID is added.
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  if (form.action.includes("YOUR_FORM_ID")) {
    const to = document.getElementById("directEmail").textContent;
    const subject = encodeURIComponent(`${data.get("type")}: ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    return;
  }

  status.textContent = "Sending…";
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      status.textContent = "Thank you! Your message has been sent.";
      form.reset();
    } else {
      status.textContent = "Something went wrong. Please try again or email directly.";
    }
  } catch {
    status.textContent = "Network error. Please try again or email directly.";
  }
});
