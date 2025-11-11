document.addEventListener("DOMContentLoaded", () => {
  const plank_len = 400;
  const half = plank_len / 2;

  // dom elemens
  const clickable = document.querySelector(".seesaw-clickable");
  const resetBtn = document.getElementById("resetBtn");
  const incBtn = document.getElementById("increaseBtn");
  const nextEl = document.getElementById("next-weight");
  const logsEl = document.querySelector(".logs");

  
  const container = document.querySelector(".seesaw-container");
  const previewLine = document.createElement("div");
  previewLine.className = "preview-line hidden";
  const previewBall = document.createElement("div");
  previewBall.className = "preview-ball hidden";
  clickable.appendChild(previewLine);
  clickable.appendChild(previewBall);

  // random ball color
  const colors = ["#5AD1C3","#FF7E6B","#9B6BFB","#F6C85F","#7CD992","#60A5FA"];
  const pickColor = () => colors[Math.floor(Math.random()*colors.length)];
  const fmtPx = (x) => (x >= 0 ? `+${x.toFixed(0)}px` : `${x.toFixed(0)}px`);


  let next_weight = Math.floor(Math.random() * 10) + 1;

  nextEl.textContent = `${next_weight} kg`;

  let masses = [];


  // create ball div by manipulatin html with DOM
  function createBall(offsetX, weight) {
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.backgroundColor = pickColor();
    ball.style.left = `calc(50% + ${offsetX}px)`;         
    ball.style.bottom = "calc(50% + 12px)";               
    ball.textContent = weight;
    ball.title = `${weight} kg`;
    container.appendChild(ball);

    masses.push({ offsetX, weight, el: ball });
    return ball;
  }
  // adding ball position to logs
  function addLog(weight, offsetX) {
    const side = offsetX < 0 ? "left" : (offsetX > 0 ? "right" : "center");
    const row = document.createElement("div");
    row.className = "log-entry";
    row.textContent = `${weight} kg dropped --> ${side} (${fmtPx(offsetX)})`;
    logsEl.prepend(row);
  }

  function getOffsetFromCenter(event) {
    const plankBounds = clickable.getBoundingClientRect();
    const mouseXWithinPlank = event.clientX - plankBounds.left;
    const distanceFromCenter = mouseXWithinPlank - plankBounds.width / 2;
    const safeOffset = Math.max(-half, Math.min(half, distanceFromCenter));

    return safeOffset;
  }

  // show preview ball
function showPreviewAt(offsetX) {
  const leftPx = `calc(50% + ${offsetX}px)`; 
  const baseSize = 18;                       
  const size = baseSize + next_weight * 1.8; 

  previewLine.style.left = leftPx;
  previewLine.style.top = "50%";
  previewLine.style.height = `${size + 16}px`;
  previewLine.style.transform = "translate(-50%, -50%)";
  previewLine.classList.remove("hidden");
  
  previewBall.style.left = leftPx;
  previewBall.style.top = "50%";
  previewBall.style.width = `${size}px`;
  previewBall.style.height = `${size}px`;
  previewBall.style.fontSize = `${10 + next_weight * 0.4}px`;
  previewBall.style.transform = "translate(-50%, -50%)";
  previewBall.textContent = `${next_weight}`;
  previewBall.classList.remove("hidden");
}
  // hide when move cursor away from clickable area
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
    const offsetX = getOffsetFromCenter(e);
    const weight = next_weight;

    createBall(offsetX, weight);
    addLog(weight, offsetX);
    
    next_weight = Math.floor(Math.random()*10) + 1;
    nextEl.textContent = `${next_weight} kg`;
    previewBall.textContent = `${next_weight}`;

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
    document.querySelectorAll(".ball").forEach(b => b.remove());
    masses = [];
    logsEl.innerHTML = "";
    hidePreview();
    next_weight = Math.floor(Math.random()*10) + 1;
    nextEl.textContent = `${next_weight} kg`;
    previewBall.textContent = `${next_weight}`;
  })
});
