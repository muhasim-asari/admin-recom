const iframe = document.getElementById("iframe-email-preview");
iframe.innerHTML = `<iframe src="./checkout-email.html"></iframe>`;

function reloadIframe() {
  const iframeSrc = iframe.querySelector("iframe").src;
  iframe.querySelector("iframe").src = iframeSrc;
}

("use strict");
!(function () {
  var a = `<div class="dz-preview dz-file-preview">
<div class="dz-details">
  <div class="dz-thumbnail">
    <img data-dz-thumbnail>
    <span class="dz-nopreview">No preview</span>
    <div class="dz-success-mark"></div>
    <div class="dz-error-mark"></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    <div class="progress">
      <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
    </div>
  </div>
  <div class="dz-filename" data-dz-name></div>
  <div class="dz-size" data-dz-size></div>
</div>
</div>`;
  new Dropzone("#imageBannerUpload", {
    previewTemplate: a,
    parallelUploads: 1,
    maxFilesize: 5,
    addRemoveLinks: !0,
    maxFiles: 1,
  }),
  new Dropzone("#imageLogoUpload", {
    previewTemplate: a,
    parallelUploads: 1,
    maxFilesize: 5,
    addRemoveLinks: !0,
    maxFiles: 1,
  })
})();

new Quill("#full-editor", {
  bounds: "#full-editor",
  placeholder: "Type Something...",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ header: [1, 2, 3, 4, 5, 6] }, "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  },
  theme: "snow",
});
