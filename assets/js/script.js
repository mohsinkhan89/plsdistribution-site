const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navActions = document.querySelector(".nav-actions");
const backToTop = document.querySelector(".back-to-top");

const imageBlocks = document.querySelectorAll("[data-image]");
imageBlocks.forEach((block) => {
  const src = block.dataset.image;
  const tester = new Image();

  tester.onload = () => {
    block.style.backgroundImage = `url("${src}")`;
    block.classList.add("has-image");
  };

  tester.src = src;
});

menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu?.classList.toggle("is-open");
  navActions?.classList.toggle("is-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("is-open");
    navActions?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 60, 360)}ms`;
  revealObserver.observe(element);
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("is-visible", window.scrollY > 520);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
const whatsappFloat = document.querySelector(".whatsapp-float");
const whatsappModal = document.querySelector(".whatsapp-modal");
const whatsappClose = document.querySelector(".whatsapp-close");
const whatsappMessage = document.querySelector("#whatsappMessage");
const whatsappSend = document.querySelector(".whatsapp-send");
const whatsappBaseUrl = "https://wa.me/0000000000?text=";

const updateWhatsAppLink = () => {
  if (!whatsappMessage || !whatsappSend) return;
  whatsappSend.href = whatsappBaseUrl + encodeURIComponent(whatsappMessage.value.trim());
};

const openWhatsAppModal = () => {
  if (!whatsappModal || !whatsappFloat) return;
  whatsappModal.hidden = false;
  requestAnimationFrame(() => whatsappModal.classList.add("is-open"));
  whatsappFloat.classList.add("is-active");
  whatsappFloat.setAttribute("aria-expanded", "true");
  updateWhatsAppLink();
};

const closeWhatsAppModal = () => {
  if (!whatsappModal || !whatsappFloat) return;
  whatsappModal.classList.remove("is-open");
  whatsappFloat.classList.remove("is-active");
  whatsappFloat.setAttribute("aria-expanded", "false");
  window.setTimeout(() => {
    if (!whatsappModal.classList.contains("is-open")) {
      whatsappModal.hidden = true;
    }
  }, 260);
};

whatsappFloat?.addEventListener("click", () => {
  if (whatsappModal?.classList.contains("is-open")) {
    closeWhatsAppModal();
  } else {
    openWhatsAppModal();
  }
});

whatsappClose?.addEventListener("click", closeWhatsAppModal);
whatsappMessage?.addEventListener("input", updateWhatsAppLink);
whatsappSend?.addEventListener("click", updateWhatsAppLink);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeWhatsAppModal();
  }
});

document.addEventListener("click", (event) => {
  if (!whatsappModal || !whatsappFloat || whatsappModal.hidden) return;
  const clickedInsideModal = whatsappModal.contains(event.target);
  const clickedFloat = whatsappFloat.contains(event.target);

  if (!clickedInsideModal && !clickedFloat) {
    closeWhatsAppModal();
  }
});