export default class Animations {
  constructor() {
    this.disappearance = {
      name: "opacity",
      units: "%",
      from: 100,
      to: -10,
      time: 10,
      change: -5,
    };

    this.appearance = {
      name: "opacity",
      units: "%",
      from: 0,
      to: 110,
      time: 10,
      change: 5,
    };

    this.load = {
      name: "height",
      units: "%",
      from: 0,
      to: 100,
      time: 10,
      change: 5,
    };
  }

  animateFromTo(element_id, animation_name, animation_delay) {
    const element = document.getElementById(element_id);
    const animation = this[animation_name];
    element.style[animation.name] = `${animation.from}${animation.units}`;
    const animation_duration =
      animation.time *
      Math.floor(
        Math.abs(animation.from - animation.to) / Math.abs(animation.change)
      );
    let style_value = animation.from;
    return new Promise((resolve) => {
      const animation_timer = setTimeout(() => {
        clearTimeout(animation_timer);
        resolve();
      }, animation_duration + animation_delay);
      const animation_interval = setInterval(() => {
        if (style_value == animation.to) {
          clearInterval(animation_interval);
          return;
        }
        element.style[animation.name] = `${style_value}${animation.units}`;
        style_value += animation.change;
      }, animation.time);
    });
  }
}
