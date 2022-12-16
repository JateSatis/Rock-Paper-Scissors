import Animations from "./animations.js";

const animations = new Animations();

const variants = ["rock", "paper", "scissors"];
let user_choice;
let computer_choice;

const createLoad = () => {
  const element = document.createElement("div");
  element.className = "load";
  element.id = "load";
  const parent = document.getElementById("computer_choice");
  parent.appendChild(element);
  return element;
};

const createGameButton = (player_name, name, parent_id) => {
  const element = document.createElement("div");
  element.id = `${player_name}_${name}`;
  element.className = `${name} game_button`;
  const image = document.createElement("img");
  image.src = `./Images/icon-${name}.svg`;
  image.alt = name;
  element.appendChild(image);
  const parent = document.getElementById(parent_id);
  parent.appendChild(element);
  return element;
};

const gameResult = (computer_choice, user_choice) => {
  let result;
  if (computer_choice === user_choice) {
    result = "have a draw";
  } else if (
    computer_choice - user_choice === 1 ||
    computer_choice - user_choice === -2
  ) {
    result = "lost";
  } else {
    result = "win";
  }
  return result;
};

const switchToGameMode = (game_button) => {
  const choose_mode = document.getElementById("choose_mode");
  const game_mode = document.getElementById("game_mode");
  animations
    .animateFromTo("choose_mode", "disappearance", 500)
    .then(() => {
      choose_mode.style.display = "none";
      game_mode.style.display = "flex";
      const load = createLoad();
      const user_button = createGameButton(
        "user",
        game_button.classList[0],
        "user_choice"
      );
      return animations.animateFromTo("game_mode", "appearance", 500);
    })
    .then(() => {
      return animations.animateFromTo("load", "load", 500);
    })
    .then(() => {
      return animations.animateFromTo("load", "disappearance", 100);
    })
    .then(() => {
      document.getElementById("load").remove();
      computer_choice = Math.floor(Math.random() * 3);
      createGameButton(
        "computer",
        variants[computer_choice],
        "computer_choice"
      );
      return animations.animateFromTo(
        `computer_${variants[computer_choice]}`,
        "appearance",
        500
      );
    })
    .then(() => {
      const result = gameResult(computer_choice, user_choice);
      const play_again = document.getElementById("play_again");
      document.getElementById("game_mode").style.justifyContent =
        "space-between";
      play_again.style.display = "block";
      play_again.getElementsByTagName("p")[0].innerText = `You ${result}`;
      animations.animateFromTo("play_again", "appearance");
    });
};

const game_buttons = Array.from(
  document.querySelector("#choose_mode").querySelectorAll(".game_button")
);
game_buttons.map((elem) => {
  elem.addEventListener("click", function handler(event) {
    event.currentTarget.removeEventListener(event.type, handler);
    user_choice = variants.indexOf(elem.classList[0]);
    switchToGameMode(elem);
  });
});

const play_again_button = document.querySelector("#play_again");
play_again_button.addEventListener("click", () => {
  animations.animateFromTo("game_mode", "disappearance");
  document.querySelector("#user_choice").querySelectorAll("div")[0].remove();
  document
    .querySelector("#computer_choice")
    .querySelectorAll("div")[0]
    .remove();
  document.getElementById("play_again").style.display = "none";
  document.getElementById("game_mode").style.display = "none";
  const choose_appear = setTimeout(() => {
    document.getElementById("choose_mode").style.display = "grid";
    animations.animateFromTo("choose_mode", "appearance");
  }, 100);
});
