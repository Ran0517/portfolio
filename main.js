"use strict";

(() => {
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu-button");
  const panel = document.getElementById("nav-panel");
  const mobile = window.matchMedia("(max-width: 900px)");

  function closeMenu(returnFocus = false) {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", menu.dataset.open);
    menu.querySelector("span").textContent = " +";
    panel.classList.remove("is-open");
    if (returnFocus) menu.focus();
  }

  if (nav && menu && panel) {
    menu.addEventListener("click", () => {
      const opening = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(opening));
      menu.setAttribute(
        "aria-label",
        opening ? menu.dataset.close : menu.dataset.open,
      );
      panel.classList.toggle("is-open", opening);
      menu.querySelector("span").textContent = opening ? " −" : " +";
    });

    document.addEventListener("keydown", (event) => {
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

    // Keep the current section when following a language link; ordinary URLs
    // remain usable with JavaScript disabled or when opening in another tab.
    const languageLinks = document.querySelectorAll(".language-switch a");
    function syncLanguageLinks() {
      languageLinks.forEach((link) => {
        const url = new URL(link.href);
        url.hash = document.getElementById(location.hash.slice(1))
          ? location.hash
          : "";
        link.href = url.href;
      });
    }
    syncLanguageLinks();
    window.addEventListener("hashchange", syncLanguageLinks);

    menu.hidden = false;
    nav.classList.add("menu-ready");
    document.documentElement.classList.remove("menu-pending");
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

  const header = document.querySelector(".site-header");
  const sectionLinks = [
    ...document.querySelectorAll('.nav-links a[href^="#"]'),
  ];
  const linkedSections = sectionLinks
    .map((link) => ({
      link,
      section: document.getElementById(link.hash.slice(1)),
    }))
    .filter(({ section }) => section);
  let scrollQueued = false;

  function updateOrientation() {
    scrollQueued = false;
    const fixedHeader =
      header && getComputedStyle(header).position === "sticky";
    const offset = fixedHeader ? header.getBoundingClientRect().height : 0;
    let current = linkedSections[0];
    for (const item of linkedSections) {
      if (item.section.getBoundingClientRect().top <= offset + 80)
        current = item;
    }
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4)
      current = linkedSections.at(-1);
    sectionLinks.forEach((link) => {
      if (link === current?.link) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  function queueOrientation() {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateOrientation);
    }
  }

  if (header && linkedSections.length) {
    function syncHeader() {
      // Keep a tall header in document flow when text is enlarged.
      header.classList.toggle(
        "header-static",
        header.offsetHeight > innerHeight / 3,
      );
      const sticky = getComputedStyle(header).position === "sticky";
      document.documentElement.style.setProperty(
        "--header-offset",
        `${sticky ? header.offsetHeight + 16 : 32}px`,
      );
      queueOrientation();
    }
    if ("ResizeObserver" in window)
      new ResizeObserver(syncHeader).observe(header);
    window.addEventListener("resize", syncHeader);
    window.addEventListener("scroll", queueOrientation, { passive: true });
    window.addEventListener("hashchange", queueOrientation);
    syncHeader();
  }

  const copyButton = document.querySelector(".copy-email");
  const copyStatus = document.getElementById("copy-status");
  if (copyButton && copyStatus) {
    copyButton.hidden = false;
    copyButton.addEventListener("click", async () => {
      copyStatus.textContent = "";
      copyButton.disabled = true;
      try {
        if (!navigator.clipboard?.writeText)
          throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(copyButton.dataset.email);
        copyStatus.textContent = copyButton.dataset.success;
      } catch {
        copyStatus.textContent = copyButton.dataset.failure;
      } finally {
        copyButton.disabled = false;
      }
    });
  }
})();
