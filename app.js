document.addEventListener("DOMContentLoaded", () => {
  const plank_len = 400;
  const half = plank_len / 2;

  // dom elemens
  const clickable = document.querySelector(".seesaw-clickable");
  const resetBtn = document.getElementById("resetBtn");
  const incBtn = document.getElementById("increaseBtn");
  const nextEl    = document.getElementById("next-weight");
  
  const container = document.querySelector(".seesaw-container");
  const previewLine = document.createElement("div");
  previewLine.className = "preview-line hidden";
  const previewBall = document.createElement("div");
  previewBall.className = "preview-ball hidden";
  container.appendChild(previewLine);
  container.appendChild(previewBall);

  let next_weight = Math.floor(Math.random() * 10) + 1;

  nextEl.textContent = `${next_weight} kg`;

  let masses = [];
  
  const keepInRange = (value, min, max) => Math.max(min, Math.min(max, value));

  function getOffsetFromCenter(event) {
    const plankBounds = clickable.getBoundingClientRect();
    const mouseXWithinPlank = event.clientX - plankBounds.left;
    const distanceFromCenter = mouseXWithinPlank - plankBounds.width / 2;
    const safeOffset = Math.max(-half, Math.min(half, distanceFromCenter));

    return safeOffset;
  }

  function showPreviewAt(offset_x) {
    const leftPct = ((offset_x + half) / plank_len) * 100;
    previewLine.style.left = `calc(50% + (${leftPct}% - 50%))`;
    previewLine.style.top = `calc(50% - 15px - 40px)`;
    previewLine.style.height = `40px`;
    previewLine.classList.remove("hidden");

    previewBall.style.left = `calc(50% + (${leftPct}% - 50%))`;
    previewBall.style.top = `calc(50% - 15px - 40px - 16px)`;
    previewBall.textContent = `${next_weight}`;
    previewBall.classList.remove("hidden");
  }

  function hidePreview() {
    previewBall.classList.add("hidden");
    previewLine.classList.add("hidden");
  }

  clickable.addEventListener("mousemove", (e) => {
    const x = getOffsetFromCenter(e);
    showPreviewAt(x)
    
  });

  clickable.addEventListener("mouseleave",hidePreview);

  
  clickable.addEventListener("click", (e) => {
    console.log("clicked to drop ball");

  });


  resetBtn.addEventListener("click", () => {
    console.log("reset seesaw");

  });

  incBtn.addEventListener("click", () => {
    next_weight = Math.floor(Math.random() * 10) + 1;
    nextEl.textContent = `${next_weight} kg`;
    previewBall.textContent = `${next_weight}`;
  });

  resetBtn.addEventListener("click", () => {
    console.log("reset seesaw");
    hidePreview();
    next_weight = Math.floor(Math.random() * 10) + 1;
    nextEl.textContent = `${next_weight} kg`;
  })
});
