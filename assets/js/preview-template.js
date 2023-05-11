
const iframeControls = document.querySelector(".iframe-controls");
const desktopViewButton = document.querySelector(".desktop-view");
const mobileViewButton = document.querySelector(".mobile-view");
const iframePreview = document.querySelector(".iframe-email-preview");

desktopViewButton.addEventListener("click", () => {
  desktopViewButton.classList.add("active");
  mobileViewButton.classList.remove("active");
  iframePreview.style.width = "900px";
  iframePreview.style.height = "100%";
});

mobileViewButton.addEventListener("click", () => {
  mobileViewButton.classList.add("active");
  desktopViewButton.classList.remove("active");
  iframePreview.style.width = "375px";
  iframePreview.style.height = "100%";
});