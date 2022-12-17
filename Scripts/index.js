import Animations from "./animations.js";

const animations = new Animations();

const variants = ["rock", "paper", "scissors"];
let user_choice;
let computer_choice;

const createLoad = () => {
  const parent = document.getElementById("computer_choice");
  const container = document.createElement("div");
  const element = document.createElement("div");
  container.id = "load_container";
  element.id = "load";
  container.appendChild(element);
  parent.appendChild(container);
  return element;
};

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
    .animateFromTo("choose_mode", "disappearance", 200)
    .then(() => {
      choose_mode.style.display = "none";
      game_mode.style.display = "grid";
      const load = createLoad();
      const user_button = createGameButton(
        "user",
        game_button.classList[0],
        "user_choice"
      );
      return animations.animateFromTo("game_mode", "appearance", 200);
    })
    .then(() => {
      return animations.animateFromTo("load", "load", 200);
    })
    .then(() => {
      return animations.animateFromTo("load", "disappearance", 100);
    })
    .then(() => {
      document.getElementById("load_container").remove();
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
      play_again.style.display = "flex";
      play_again.getElementsByTagName("p")[0].innerText = `You ${result}`;
      animations.animateFromTo("play_again", "appearance");
    });
};

const game_buttons = Array.from(
  document.querySelector("#choose_mode").querySelectorAll(".game_button")
);

const game_button_images = Array.from(
  document.querySelectorAll(".game_button_image")
);

const gameModeHandler = (event) => {
  const elem = event.currentTarget;
  elem.removeEventListener("click", gameModeHandler);
  user_choice = variants.indexOf(elem.classList[0]);
  switchToGameMode(elem);
};

game_buttons.forEach((elem) => {
  elem.addEventListener("click", gameModeHandler);
});

const play_again_button = document.querySelector("#play_again_button");

play_again_button.addEventListener("click", () => {
  game_buttons.forEach((elem) => {
    elem.removeEventListener("click", gameModeHandler);
  });
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
});
