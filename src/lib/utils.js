import confetti from "canvas-confetti";

export const runFireworks = () => {
  var defaults = {
    spread: 360,
    ticks: 600,
    gravity: 0.3,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8", "FFF", "000"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 1.4,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 400);
  setTimeout(shoot, 800);
  setTimeout(shoot, 1200);
  setTimeout(shoot, 1600);
  setTimeout(shoot, 1800);
  setTimeout(shoot, 2000);
  setTimeout(shoot, 2200);
  setTimeout(shoot, 2300);
  setTimeout(shoot, 2400);
  setTimeout(shoot, 2500);
};
