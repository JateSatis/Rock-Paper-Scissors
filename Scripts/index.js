import "./resizeEffects.js";
import Animations from "./animations.js";

const animations = new Animations();

let count = 0;
let max_count = 0;

const variants = ["rock", "paper", "scissors"];
let user_choice;
let computer_choice;

const createGameButton = (player_name, name, parent_id) => {
  const element = document.createElement("div");
  element.id = `${player_name}_${name}`;
  element.className = `${name} game_button game_button_big`;
  const image = document.createElement("img");
  image.src = `./Images/icon-${name}.svg`;
  image.alt = name;
  element.appendChild(image);
  const parent = document.getElementById(parent_id);
  parent.appendChild(element);
  return element;
};

const gameResult = (computer_choice, user_choice, play_again) => {
  let result;
  if (computer_choice === user_choice) {
    result = "have a draw";
    count += 1;
    play_again.getElementsByTagName("button")[0].style.color = "grey";
  } else if (
    computer_choice - user_choice === 1 ||
    computer_choice - user_choice === -2
  ) {
    result = "lost";
    play_again.getElementsByTagName("button")[0].style.color = "red";
  } else {
    result = "win";
    count += 3;
    play_again.getElementsByTagName("button")[0].style.color = "green";
  }
  return result;
};

const switchToGameMode = (game_button) => {
  const choose_mode = document.getElementById("choose_mode");
  const game_mode = document.getElementById("game_mode");
  animations
    .animateFromTo("choose_mode", "disappearance", 200)
    .then(() => {
      choose_mode.style.display = "none";
      game_mode.style.display = "grid";
      const user_button = createGameButton(
        "user",
        game_button.classList[0],
        "user_choice"
      );
      computer_choice = Math.floor(Math.random() * 3);
      const computer_button = createGameButton(
        "computer",
        variants[computer_choice],
        "computer_choice"
      );
      computer_button.style.opacity = 0;
      return animations.animateFromTo("game_mode", "appearance", 500);
    })
    .then(() => {
      return animations.animateFromTo(
        `computer_${variants[computer_choice]}`,
        "appearance",
        500
      );
    })
    .then(() => {
      const play_again = document.getElementById("play_again");
      const result = gameResult(computer_choice, user_choice, play_again);
      document.getElementById("game_mode").style.justifyContent =
        "space-between";
      play_again.style.display = "flex";
      play_again.getElementsByTagName("p")[0].innerText = `You ${result}`;

      animations.animateFromTo("play_again", "appearance");
    })
    .then(() => {
      document.querySelector("#score_number").innerText = count;
    });
};

const switchToChooseMode = () => {
  game_buttons.forEach((elem) => {
    elem.addEventListener("click", gameModeHandler);
  });
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
};

const gameModeHandler = (event) => {
  play_again_button.addEventListener("click", chooseModeHandler);
  game_buttons.forEach((elem) => {
    elem.removeEventListener("click", gameModeHandler);
  });
  const elem = event.currentTarget;
  user_choice = variants.indexOf(elem.classList[0]);
  animations
    .animateInstantFromTo(elem.id, "button_down", 200)
    .then(() => {
      return animations.animateInstantFromTo(elem.id, "button_up", 200);
    })
    .then(() => {
      switchToGameMode(elem);
    });
};

const chooseModeHandler = (event) => {
  play_again_button.removeEventListener("click", chooseModeHandler);
  const play_again = event.currentTarget;
  animations
    .animateInstantFromTo(play_again.id, "button_down", 200)
    .then(() => {
      return animations.animateInstantFromTo(play_again.id, "button_up", 200);
    })
    .then(() => {
      switchToChooseMode();
    });
};

const game_buttons = Array.from(
  document.querySelector("#choose_mode").querySelectorAll(".game_button")
);

const play_again_button = document.querySelector("#play_again_button");

game_buttons.forEach((elem) => {
  elem.addEventListener("click", gameModeHandler);
});