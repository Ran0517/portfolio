"use strict";

(() => {
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu-button");
  const panel = document.getElementById("nav-panel");
  const mobile = window.matchMedia("(max-width: 900px)");

  function closeMenu(returnFocus = false) {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", menu.dataset.open);
    panel.classList.remove("is-open");
    if (returnFocus) menu.focus();
  }

  if (nav && menu && panel) {
    menu.addEventListener("click", () => {
      const opening = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(opening));
      menu.setAttribute(
        "aria-label",
        opening ? menu.dataset.open : menu.dataset.close,
      );
      panel.classList.toggle("is-open", opening);
    });

    nav.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        menu.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu(true);
      }
    });

    nav.addEventListener("focusout", (event) => {
      if (event.relatedTarget && !nav.contains(event.relatedTarget))
        closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target)) closeMenu();
    });

    panel.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
        const target = document.getElementById(link.hash.slice(1));
        if (target) {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      });
    });

    mobile.addEventListener("change", () => {
      const focused = document.activeElement;
      closeMenu();
      if (mobile.matches && panel.contains(focused)) menu.focus();
      if (!mobile.matches && focused === menu)
        nav.querySelector(".brand").focus();
    });

    menu.hidden = false;
    nav.classList.add("menu-ready");
  }

  document
    .querySelectorAll(".skip-link, .back-to-top, .brand")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const target = document.getElementById(link.hash.slice(1));
        if (target) {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      });
    });

  document.querySelectorAll("details").forEach((details) => {
    details.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
        details.querySelector("summary").focus();
      }
    });
  });
})();
