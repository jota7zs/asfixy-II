function hi() {
  console.warn("Asfixy Auto Farm");
  console.warn("Join discord for updates: https://discord.gg/9QDNKyYKFk");
  Game.Ascend(0x1);
  alert("Click \"OK\" to run");

  setTimeout(function () {
    setInterval(() => {
      Game.lumps = Infinity;
      Game.cookies = Infinity;
      Game.prestige = Infinity;
      Game.ObjectsById[0x0].levelUp();
    }, 0x0);

    for (let i = 1; i <= 0x13; i++) {
      setInterval(() => {
        if (Game.ObjectsById.hasOwnProperty(i)) {
          Game.ObjectsById[i].levelUp();
        }
        Game.SetAllUpgrades(0x1);
        Game.RuinTheFun(0x1);
      }, 0x0);
    }

    setInterval(() => {
      for (let i = 0x0; i <= 0x13; i++) {
        const product = document.querySelector("#product" + i);
        if (product) {
          product.click();
        }
      }
    }, 0x0);
  }, 0x1388);

  setTimeout(function () {
    Game.Reincarnate(0x1);
  }, 0x1770);
}

hi();
