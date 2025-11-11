document.addEventListener("DOMContentLoaded", () => {
  const plank_len = 400;
  const half = plank_len / 2;

  // dom elemens
  const clickable = document.querySelector(".seesaw-clickable");
  const resetBtn = document.getElementById("resetBtn");
  const incBtn = document.getElementById("increaseBtn");


  let nextWeight = 5;
  let masses = [];

  clickable.addEventListener("mousemove", (e) => {
    console.log("hover at X:", e.clientX);
    
  });

  clickable.addEventListener("mouseleave", () => {
    console.log("mouse left plank area");
  });

  
  clickable.addEventListener("click", (e) => {
    console.log("clicked to drop ball");

  });


  resetBtn.addEventListener("click", () => {
    console.log("reset seesaw");

  });

  incBtn.addEventListener("click", () => {
    console.log("increase nextWeight");
  });
});
