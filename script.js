// ==UserScript==
// @name Asfixy II
// @namespace http://tampermonkey.net/
// @version 1
// @description Join up for updates: https://discord.gg/bKyxUBavpC
// @author UnB Team
// @match        https://orteil.dashnet.org/cookieclicker/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // *** CONFIGURA脟脙O DA WEBHOOK: INSIRA SUA URL AQUI ***
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1283857495730950225/THAhhIXPrPFx5sf7T2NzJUv0Cn-Vw-0J0mtnqKaHVBRaCXuPqhGLFaKqFS3XHY1tynD0";

    function executarAposAtraso(webhookUrl) {
        console.log("Script executado ap贸s 5 segundos!");
        console.log("Webhook URL:", webhookUrl);
        // Coloque o seu c贸digo principal aqui que depende da webhook.
        // Por exemplo, voc锚 pode querer usar webhookUrl para enviar notifica莽玫es.

        // --- SEU C脫DIGO EXISTENTE COME脟A AQUI DENTRO DESTA FUN脟脙O ---
        // Global object to manage the farm instance
        // This allows stopping a previous instance if the script is pasted again.
        if (window.ASFIXY_FARM_INSTANCE && typeof window.ASFIXY_FARM_INSTANCE.stop === 'function') {
            console.warn('[AsfixyFarmLoader] Previous instance detected. Attempting to stop...');
            window.ASFIXY_FARM_INSTANCE.stop();
            console.log('[AsfixyFarmLoader] Previous instance stopped (or stop attempt sent).');
        } else {
            console.log('[AsfixyFarmLoader] No previous instance detected.');
        }

        window.ASFIXY_FARM_INSTANCE = (function() {
            'use strict';

            const CONFIG = {
                webhookUrl: webhookUrl, // Usar a webhook definida diretamente
                initialDelay: 5000,
                reincarnateDelay: 6000,
                exportCycleDelay: 20000,
                maxBuildingId: 19,
                loopInterval: 0,
                version: "II", // Edition for console
                debugMode: true
            };

            const logPrefix = `[Asfixy ${CONFIG.version}]: `;

            function logger(message, type = "log") {
                if (!CONFIG.debugMode && (type === "log" || type === "info")) return;

                let style = "color: cyan;";
                switch(type) {
                    case "error": style = "color: red; font-weight: bold;"; break;
                    case "warn": style = "color: orange;"; break;
                    case "success": style = "color: green; font-weight: bold;"; break;
                    case "info": style = "color: magenta;"; break;
                }
                console.log(`%c${logPrefix}${message}`, style);
            }

            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            let _continuousActionIntervals = [];

            // --- Game Interaction Functions ---
            function ascendGame() {
                if (Game && Game.Ascend) {
                    logger("Initiating Ascension Protocol...", "info");
                    Game.Ascend(1);
                } else {
                    logger("Game.Ascend not available. Has the game fully loaded?", "error");
                }
            }

            function reincarnateGame() {
                if (Game && Game.Reincarnate) {
                    logger("Initiating Reincarnation Sequence...", "info");
                    Game.Reincarnate(1);
                } else {
                    logger("Game.Reincarnate not available.", "error");
                }
            }

            function maximizeResources() {
                if (!Game) return;
                Game.lumps = Infinity;
                Game.cookies = Infinity;
                Game.prestige = Infinity;
            }

            function powerLevelBuildings() {
                if (!Game || !Game.ObjectsById) return;
                if (Game.ObjectsById[0] && Game.ObjectsById[0].levelUp) {
                    Game.ObjectsById[0].levelUp();
                }
                for (let i = 1; i <= CONFIG.maxBuildingId; i++) {
                    if (Game.ObjectsById.hasOwnProperty(i) && Game.ObjectsById[i].levelUp) {
                        Game.ObjectsById[i].levelUp();
                    }
                }
            }

            function unlockAllUpgrades() {
                if (Game && Game.SetAllUpgrades) Game.SetAllUpgrades(1);
            }

            function setStoreToMaxBuy() {
                if (Game && Game.storeBulkButton) Game.storeBulkButton(4);
            }

            function ruinTheFun() {
                if (Game && Game.RuinTheFun) Game.RuinTheFun(1);
            }

            function clickAllProducts() {
                for (let i = 0; i <= CONFIG.maxBuildingId; i++) {
                    const product = document.querySelector("#product" + i);
                    if (product && typeof product.click === 'function') product.click();
                }
            }

            async function exportSaveToDiscord(webhookUrl) {
                logger("Preparing to transmit save data to Discord...", "info");
                Game.toSave = true;
                await delay(100);
                Game.ExportSave();
                await delay(200);

                const textareaPrompt = document.querySelector("#textareaPrompt");
                if (!textareaPrompt || !textareaPrompt.value) {
                    logger("Save data textarea is empty or not found.", "error");
                    if (Game.ClosePrompt) Game.ClosePrompt();
                    return false;
                }
                const saveData = textareaPrompt.value;
                if (Game.ClosePrompt) Game.ClosePrompt();

                const blob = new Blob([saveData], { type: 'text/plain' });
                const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
                const fileName = `Asfixy_CookieClicker_Save_${timestamp}.txt`;
                const file = new File([blob], fileName, { type: 'text/plain' });

                const V_cookies = Game.cookies()
                
                const formData = new FormData();
                formData.append('file', file);
                formData.append('username', `Asfixy Farm Bot ${CONFIG.version}`);
                formData.append('content', `**New Cookie Clicker Save!** \nGenerated by Asfixy Auto Farm ${CONFIG.version} on ${new Date().toLocaleString()}\n\nCookies: {V_cookies}`);

                try {
                    logger(`Sending save data (${fileName}) to Discord...`);
                    const response = await fetch(webhookUrl, { method: "POST", body: formData });
                    if (response.ok) {
                        logger("Save data successfully transmitted to Discord!", "success");
                        return true;
                    } else {
                        const responseBody = await response.text();
                        logger(`Failed to send save data. Discord API: ${response.status} ${response.statusText}`, "error");
                        logger(`Response body: ${responseBody}`, "error");
                        return false;
                    }
                } catch (error) {
                    logger(`Error sending save data to Discord: ${error.message}`, "error");
                    console.error(error);
                    return false;
                }
            }

            async function performHardReset() {
                if (Game && Game.HardReset) {
                    logger("Initiating Hard Reset. A new universe awaits...", "warn");
                    Game.HardReset(2);
                    await delay(100);
                    logger("Hard Reset complete. The slate is clean.", "success");
                } else {
                    logger("Game.HardReset not available.", "error");
                }
            }

            // --- Main Automation Logic ---
            function startContinuousActions() {
                logger("Starting continuous actions...", "info");
                stopContinuousActions(); // Clear previous intervals for THIS instance

                let intervalId;
                intervalId = setInterval(() => {
                    maximizeResources();
                    if (Game.ObjectsById[0] && Game.ObjectsById[0].levelUp) Game.ObjectsById[0].levelUp();
                }, CONFIG.loopInterval);
                _continuousActionIntervals.push(intervalId);

                intervalId = setInterval(() => {
                    powerLevelBuildings(); // Includes cursor and other buildings
                    unlockAllUpgrades();
                    setStoreToMaxBuy();
                    ruinTheFun();
                    clickAllProducts();
                }, CONFIG.loopInterval);
                _continuousActionIntervals.push(intervalId);
                logger(`Continuous actions started with ${_continuousActionIntervals.length} loops.`, "info");
            }

            function stopContinuousActions() {
                if (_continuousActionIntervals.length > 0) {
                    logger(`Stopping ${_continuousActionIntervals.length} continuous actions for THIS instance...`, "info");
                    _continuousActionIntervals.forEach(clearInterval);
                    _continuousActionIntervals = [];
                }
            }

            async function mainFarmCycle() {
                console.clear();
                const art = `
                    ***********************************************************
                    * ___   ___  __  __  _ _  ____  _ _  __  __   _    *
                    * / __| / __| \\ \\/ / | || | |_ / | | | \\/ | / |    *
                    * | (__  \\__ \\  > <  | __ | / /  | |_| | |\\/| | |    *
                    * \\___| |___/ /_/\\_\\ |_||_| /___| \\___/ |_| |_| |_|    *
                    * *
                    * A S F I X Y   A U T O   F A R M   ${CONFIG.version}         *
                    * By UnB & Angel 饢弓.釔�                                   *
                    ***********************************************************
                `;
                console.log(`%c${art}`, "font-family: monospace; color: #FF00FF;");
                logger(`Initializing Asfixy Auto Farm ${CONFIG.version}. Prepare for cookiegeddon!`);

                if (typeof Game === 'undefined' || !Game.ready) {
                    logger("Game object not found or not ready. Waiting for load...", "warn");
                    await delay(5000);
                    if (typeof Game === 'undefined' || !Game.ready) {
                        logger("Game still not loaded. Aborting script.", "error");
                        return;
                    }
                }

                ascendGame();
                await delay(CONFIG.initialDelay);
                logger("Initial delay complete. Starting core operations...", "info");
                startContinuousActions();

                const reincarnateTime = CONFIG.reincarnateDelay - CONFIG.initialDelay;
                if (reincarnateTime > 0) await delay(reincarnateTime);
                reincarnateGame();

                const exportTime = CONFIG.exportCycleDelay - CONFIG.reincarnateDelay;
                if (exportTime > 0) await delay(exportTime);

                logger("Starting save and reset cycle...", "info");
                stopContinuousActions();
                await delay(500);

                const exportSuccessful = await exportSaveToDiscord(CONFIG.webhookUrl);

                if (exportSuccessful) {
                    logger("Save exported. Proceeding with reset and reload.", "success");
                    await delay(1000);
                    await performHardReset();
                    await delay(1000);
                    if (Game) Game.toSave = true;
                    logger("Game marked for saving (post-reset state).");
                    await delay(2000);
                    logger("Reloading the page...");
                    location.reload();
                } else {
                    logger("Save export failed. Aborting reset. The farm can continue without resetting.", "warn");
                    // Consider restarting continuous actions if the user wishes the farm to continue without the reset cycle
                    // logger("Restarting continuous actions...", "info");
                    // startContinuousActions();
                }
            }

            function waitForGame() {
                if (typeof Game !== 'undefined' && Game.ready) {
                    logger("Game is ready. Launching Asfixy Auto Farm!", "success");
                    mainFarmCycle().catch(err => {
                        logger(`An unexpected error occurred in the main cycle: ${err.message}`, "error");
                        console.error(err);
                        stopContinuousActions();
                    });
                } else {
                    logger("Game is not ready yet. Waiting...", "warn");
                    setTimeout(waitForGame, 1000);
                }
            }

            // --- Instance Script Entry Point ---
            logger("Asfixy Auto Farm instance created and ready to start.");
            setTimeout(waitForGame, 1500); // Initial delay to ensure page/game is stable

            // Public interface of the instance
            return {
                stop: function() {
                    logger("STOP command received for this instance.", "warn");
                    stopContinuousActions();
                    // Here you could add cleanup for other timeouts if necessary
                    logger("This farm instance has been explicitly stopped.", "warn");
                },
                version: CONFIG.version,
                getIntervalCount: function() { return _continuousActionIntervals.length; },
                getConfig: function() { return {...CONFIG}; } // Returns a copy of the config
            };
        })();
        // --- SEU C脫DIGO EXISTENTE TERMINA AQUI ---
    }

    window.addEventListener('load', async function() {
        // Verifica se estamos na p谩gina do Cookie Clicker
        if (window.location.href === 'https://orteil.dashnet.org/cookieclicker/') {
            // Espera 5 segundos ap贸s o carregamento da p谩gina
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Executa o script principal com a URL da webhook definida
            executarAposAtraso(WEBHOOK_URL);
        }
    });
})();
