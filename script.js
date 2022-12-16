const variants = ["rock", "paper", "scissors"];
let user_choice;
let computer_choice;

const createGameButton = (name, parent_id) => {
  const element = document.createElement("div");
  element.id = name;
  if (name === "load") {
    element.className = name;
  } else {
    element.className = `${name} game_button`;
    const image = document.createElement("img");
    image.src = `./Images/icon-${name}.svg`;
    image.alt = name;
    element.appendChild(image);
  }
  const parent = document.getElementById(parent_id);
  parent.appendChild(element);
  return element;
};

const gamePlay = () => {
  let game_result;
  document.getElementById("load").remove();
  computer_choice = Math.floor(Math.random() * 3);
  createGameButton(variants[computer_choice], "load_container");
  if (computer_choice === user_choice) {
    game_result = "have a draw";
  } else if (
    computer_choice - user_choice === 1 ||
    computer_choice - user_choice === -2
  ) {
    game_result = "lost";
  } else {
    game_result = "win";
  }
  const play_again = document.getElementById("play_again");
  play_again.style.display = "block";
  play_again.getElementsByTagName("p")[0].innerText = `You ${game_result}`;
  animateAppearance("play_again");
};

const switchToGameMode = (game_button) => {
  animateAppearance("game_mode");
  document.getElementById("choose_mode").style.display = "none";
  document.getElementById("game_mode").style.display = "flex";
  game_button = createGameButton(game_button.classList[0], "user_choice");
  const load = createGameButton("load", "load_container");
  const animate_load = setTimeout(() => {
    animateLoad();
    clearTimeout(animate_load);
  }, 500);
  const game_play = setTimeout(() => {
    gamePlay();
  }, 1000);
};

const animateAppearance = (name) => {
  let i = 0;
  const element = document.getElementById(name);
  let animate = setInterval(() => {
    element.style.opacity = `${i}%`;
    i += 10;
    if (i > 100) {
      clearInterval(animate);
      return;
    }
  }, 10);
};

const animateDisappearance = (name) => {
  let i = 100;
  const element = document.getElementById(name);
  let animate_disappearance = setInterval(() => {
    element.style.opacity = `${i}%`;
    i -= 10;
    if (i < 0) {
      clearInterval(animate_disappearance);
      return;
    }
  }, 10);
};

const animateLoad = () => {
  let i = 10;
  let animate = setInterval(() => {
    document.getElementsByClassName("load")[0].style.height = `${i}vh`;
    i += 0.5;
    if (i > 20) {
      clearInterval(animate);
      return;
    }
  }, 20);
};

const game_buttons = document
  .getElementById("choose_mode")
  .getElementsByClassName("game_button");
for (let i = 0; i < game_buttons.length; i++) {
  game_buttons[i].addEventListener("click", () => {
    animateDisappearance("choose_mode");
    user_choice = variants.indexOf(game_buttons[i].classList[0]);
    let timer = setTimeout(() => {
      switchToGameMode(game_buttons[i]);
      clearTimeout(timer);
    }, 300);
  });
}

document.getElementById("play_again").addEventListener("click", () => {
  animateDisappearance("game_mode");
  document
    .getElementById("user_choice")
    .getElementsByTagName("div")[0]
    .remove();
  document
    .getElementById("computer_choice")
    .getElementsByTagName("div")[1]
    .remove();
  document.getElementById("play_again").style.display = "none";
  document.getElementById("game_mode").style.display = "none";
  const choose_appear = setTimeout(() => {
    document.getElementById("choose_mode").style.display = "grid";
    animateAppearance("choose_mode");
  }, 100);
});
