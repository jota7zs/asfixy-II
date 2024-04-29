function keySystem() {
var text = prompt("Insert Key:");

var key = "AsfixyInternal";
if (text === key) {
            alert("Correct Key! Welcome to Asfixy <3");
    console.clear()
    console.warn('Join Discord for updates')
    console.warn('https://discord.gg/9QDNKyYKFk')
    
    var frame = document.createElement("iframe");
    frame.sandbox = "allow-scripts allow-same-origin";
    frame.style.width = "400px";
    frame.style.height = "270px";
    frame.style.position = "fixed";
    frame.style.top = "0";
    frame.style.right = "0";
    frame.style.zIndex = "9999";
    document.body.appendChild(frame);
    
    var textbox = document.createElement("input");
    textbox.type = "text";
    textbox.style.height = "150px";
    textbox.style.backgroundColor = "black";
    textbox.style.color = "white";
    textbox.style.textAlign = "left";
    textbox.style.verticalAlign = "top";
    frame.contentDocument.body.appendChild(textbox);
    
    frame.contentDocument.body.style.display = "flex";
    frame.contentDocument.body.style.flexDirection = "column";
    
    var sandboxedCode = textbox.value;
    // EXECUTE 
    
    var button1 = document.createElement("button");
    var button1Icon = document.createElement("img");
    button1.style.backgroundColor = "black";
    button1Icon.src = "https://media.discordapp.net/attachments/1175719430693605397/1234260120767168663/Picsart_24-04-28_18-48-48-670.png?ex=663015d0&is=662ec450&hm=8b9da926b967e64fa94161e524b45fa161cc63f8777f10100cd56b8657e6a9fb&";
    button1Icon.style.width = "32px";
    button1Icon.style.height = "32px";
    button1.appendChild(button1Icon);
    
    textbox.onchange = function() {
        var jsCode = textbox.value;
        
        if (jsCode === "") {
            console.log('trying to execute nothing mf');
        } else {
            try {
                var scriptElement = document.createElement('script');
                scriptElement.textContent = jsCode;
                document.body.appendChild(scriptElement);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    
    
    
    
    // iNJECT
    
    var button2 = document.createElement("button");
    var button2Icon = document.createElement("img");
    button2.style.backgroundColor = "black";
    button2Icon.src = "https://media.discordapp.net/attachments/1175719430693605397/1234258528928006215/Picsart_24-04-28_18-42-30-846.png?ex=66301454&is=662ec2d4&hm=7aab65808ff529e1a864a9a099b56c22170d7b1f9767b825a7728eea6c29d917&";
    button2Icon.style.width = "32px";
    button2Icon.style.height = "32px";
    button2.appendChild(button2Icon);
    
    button2.onclick = function() {
        alert('Wait for the notificafion to execute scripts.')
        console.log('🟢 -- Attached')
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") {
                    createNotification();
                }
            });
        } else {
            createNotification();
        }
    };
    
    function createNotification() {
        var notification = document.createElement("div");
        var closeButton = document.createElement("span");
    
        notification.className = "notification";
        closeButton.className = "close-button";
    
        notification.style.backgroundColor = "black";
        notification.textContent = "Attached - Check Console";
        closeButton.textContent = "X";
    
        closeButton.onclick = function() {
            notification.style.display = "none";
        };
    
        document.body.appendChild(notification);
        notification.appendChild(closeButton);
    }
    
    var css = `
    .notification {
        position: fixed;
        bottom: 10px;
        right: 10px;
        background-color: #ffffff;
        border: 1px solid #ccc;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        z-index: 9999;
    }
    
    .close-button {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }
    `;
    
    var style = document.createElement("style");
    style.textContent = css;
    
    document.head.appendChild(style);
    
    
    // BuG REPORT SYSTEM
    
    var button3 = document.createElement("button");
    var button3Icon = document.createElement("img");
    button3.style.backgroundColor = "black";
    button3Icon.src = "https://media.discordapp.net/attachments/1175719430693605397/1234259083624845372/Picsart_24-04-28_18-44-46-501.png?ex=663014d8&is=662ec358&hm=1e1e69e3b92a8d61e8380210b0b8cdec93ba59ad0e7385ffcbfa797931e6c08e&";
    button3Icon.style.width = "32px";
    button3Icon.style.height = "32px";
    button3.appendChild(button3Icon);
    
    button3.onclick = function() {
        function sendMessageToWebhook(message, hwid, cancelled) {
            var webhookUrl = "https://discord.com/api/webhooks/1199394939151331450/Rh-NqR65aVNKT_8kDiBBgmt9EMwfj-hRjzW-wwl-R5yrlDCQju_4VQQcE7tRy10ZMMdE";
            var data = {
                content: "# User Bug Report System \n**__Mensagem:__** " + message + "\n**__HWID:__** " + hwid + "\n**__Cancelled:__** " + cancelled
            };
            var request = new XMLHttpRequest();
            request.open("POST", webhookUrl);
            request.setRequestHeader("Content-type", "application/json");
            request.send(JSON.stringify(data));
        }
        
        function sendPromptMessage() {
            var userInput = prompt("Report Bugs System (spam = ban)");
            var hwid = "AsfixyHWiD-" + generateHWID();
            if (userInput !== null) {
                sendMessageToWebhook(userInput, hwid, "false");
            } else {
                sendMessageToWebhook("", hwid, "true");
            }
        }
        
        function generateHWID() {
            var hwid = "";
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.ipify.org?format=json", false);
            xhr.send();
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                hwid = response.ip;
            }
            return hwid;
        }
        
        sendPromptMessage();
    }
    
    frame.contentDocument.body.appendChild(button1);
    frame.contentDocument.body.appendChild(button2);
    frame.contentDocument.body.appendChild(button3);
    } else {
        alert("Incorrect Key. Try Again.");
    }
}

keySystem();
