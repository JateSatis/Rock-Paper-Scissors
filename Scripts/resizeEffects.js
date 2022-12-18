const choiceModeResize = () => {
  const elem = document.querySelector("main");
  const width = elem.getBoundingClientRect().width;
  const height = elem.getBoundingClientRect().height;
  if (width < height) {
    const choose_mode = document.querySelector("#choose_mode");
    choose_mode.style.width = "90%";
    choose_mode.style.height = "auto";
  } else {
    choose_mode.style.width = "auto";
    choose_mode.style.height = "90%";
  }
};

const fontResize = () => {
  const game_name = document.querySelector("#game_name");
  const score = document.querySelector("#score_number");
  const screen_width = window.screen.width;
  const screen_height = window.screen.height;
  if (screen_width > screen_height) {
    game_name.style.fontSize = "4vh";
    score.style.fontSize = "6vh";
  } else {
    game_name.style.fontSize = "4vw";
    score.style.fontSize = "6vw";
  }
};

window.addEventListener("load", (event) => {
  fontResize();
  choiceModeResize();
});

window.addEventListener("resize", (event) => {
  fontResize();
  choiceModeResize();
});
