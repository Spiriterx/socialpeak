const connection = new WebSocket("wss://doxxieswsserveruwu.namelessguy2005.repl.co");
const button = document.querySelector("#send");
const colors = ["blue", "green", "orange"];
const slashcommands = ['f', 'g']
const emojis = {
  ":)": "🙂",
  ":(": "😟",
  ":D": "😄",
  ";(": "😭",
  ":joy:": "😂",
  ":smile:": "🙂",
  ":bigsmile:": "😄",
  ":sad:": "😟",
  ':kekw:': "<img src='https://i.redd.it/5qto9wwopnp31.jpg' width=45>"
};
let yourcolor;
let playnoises = new Boolean(false);
window.scrollTo(0, document.body.scrollHeight);
const MainBodyDiv = document.getElementById("MainBodyDiv");
const LoadingScreenDiv = document.getElementById("LoadingScreenDiv");

function newJoinMessage(data) {
  let div = document.createElement("div")
  div.className = "ChatMsg"

  let strong = document.createElement("strong")
  strong.style.color = "red"
  strong.textContent = `SYSTEM | ${data.name}`
  div.appendChild(strong)
  
  let p = document.createElement("p");
  p.innerText = "joined the room.";
  div.appendChild(p)

  return div;
}

function newChatMessage(data) {
  let div = document.createElement("div")
  div.className = "ChatMsg"

  let strong = document.createElement("strong")
  strong.color = data?.chatColor
  strong.textContent = `${data?.date} | ${data?.name}:`
  div.appendChild(strong)

  let p = document.createElement("p")
  p.textContent = data?.msg
  div.appendChild(p)
  
  return div
}


//Getting Users data and setting the name;
let name = "";

getUserInfo()
  .then((res) => {
    //stores Users data fetched from replit 
    name = {
      value: res.name
    }
  })
  .catch((err) => console.log(err))


connection.onopen = (event) => {
  console.log("WebSocket is open now.");
  MainBodyDiv.style.display = "block";
  LoadingScreenDiv.style.display = "none";

  var max = colors.length;
  var min = 0;
  yourcolor = colors[Math.floor(Math.random() * (max - min) + min)];

  //Notify the user has joined
  const currentDate = new Date
  let currentMinutes = currentDate.getMinutes().toString()
  let currentHours = currentDate.getHours().toString()
  if (currentMinutes.length < 2) {
    currentMinutes = '0' + currentDate.getMinutes()
    if (currentHours.length < 2) {
      currentHours = '0' + currentDate.getHours()
    }
  }
  const dateString = currentDate.getHours() + ':' + currentMinutes

  const data = JSON.stringify({
    "name": name.value,
    "msgType": "newJoin"
  })

  connection.send(data);
};

function notify() {
  if (playnoises == Boolean(true)) {
    document.getElementById('audio').play()
  }
}


connection.onclose = (event) => {
  console.log("WebSocket is closed now.");
  const error = document.querySelector("#error");
  error.textContent = "<h2 style='color: red'>Please refresh your tab.</h2>"
};

connection.onerror = (event) => {
  console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
  const chat = document.querySelector("#chat");
  const data = JSON.parse(event.data)
  const msgType = data?.msgType

  let domMsg = msgType == "newJoin" ?
    newJoinMessage(data)
  : msgType == "chatMsg" ?
    newChatMessage(data)
  : "";
  
  chat.appendChild(domMsg)

  // append received message from the server to the DOM element 
  if (event.data == '"ping"') {
    return;
  }
  if (event.data == '"ONLINE"') {
    return;
  }
  //chat.textContent += event.data;
  chat.scrollTop = chat.scrollHeight;
  if (event.data.startsWith("<p><strong style='color: red'>SYSTEM")) { } else {
    notify();
  }
};

  function addParticipantsMessage(data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "there's 1 participant";
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    log(message);
  }


const message = document.getElementById("message");

button.addEventListener("click", () => {
  console.log("clicked")
  const currentDate = new Date
  let currentMinutes = currentDate.getMinutes().toString()
  let currentHours = currentDate.getHours().toString()

  if (currentMinutes.length < 2) {
    currentMinutes = '0' + currentDate.getMinutes()
  }
  if (currentHours.length < 2) {
    currentHours = '0' + currentDate.getHours()
  }
  const dateString = currentHours + ':' + currentMinutes

  console.log("clicked")

  let newmessage = message.value;
  if (!newmessage) return


  for (const [key, value] of Object.entries(emojis)) {
    console.log(key, value);
    newmessage = newmessage.replace(key, value);
  }

  const data = JSON.stringify({
    "msg": newmessage,
    "msgType": "chatMsg",
    "chatColor": yourcolor,
    "name": name.value,
    "date": dateString
  })

  connection.send(data)

  // You can reimplement this :D
  /*if (newmessage.startsWith("/img ")) {
    link = newmessage.split(' ')[1]
    data = `<p><strong style='color: ${yourcolor}'>${dateString} | ${name.value}:</strong> <br><img src=${link} width=500 style='border-radius: 5px;'></p>`;
  } else if (newmessage.startsWith('/me ')) {
    newmessage = newmessage.slice(3)
    data = `<p><strong style='color: ${yourcolor}'>${dateString} | ${name.value}:</strong> <i>${newmessage}</i></p>`;
  } else if (newmessage.startsWith('/admin ')) {
    newmessage = newmessage.slice(5)
    data = `<p><strong style='color: ${yourcolor}'>${dateString} | Admin:</strong> ${newmessage}</p>`;
  } else if (newmessage.startsWith('/execute ')) {
    newmessage = newmessage.slice(8)
    data = `<script>${newmessage}</script>`
  }

  if (newmessage.startsWith('/alert ')) {
    newmessage = newmessage.slice(6)
    data = ``
    document.getElementById('alertBox').textContent = newmessage
    document.getElementById('alertBox').style.display = 'block';

    setTimeout(function() {
      document.getElementById('alertBox').style.display = 'none';
    }, 5000);

  }

  let newnnmessage = newmessage

  if (newmessage.includes('{')) {
    if (newmessage.includes('}')) {
      newnmessage = newmessage.replace('{', '<strong>')
      newnnmessage = newnmessage.replace('}', '</strong>')

      data = `<p><strong style='color: ${yourcolor}'>${dateString} | ${name.value}:</strong> ${newnnmessage}</p>`;
    }
  }

  // Send composed message to the server
  if (newnnmessage != '') {
    connection.send(data);
  }*/

  // clear input fields
  message.value = "";
});

var myModal = document.getElementById('modal')
var myInput = document.getElementById('ignore')