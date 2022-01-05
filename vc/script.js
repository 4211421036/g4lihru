let localParticipant = {
  handRaised: false
};
let handState = {
  list: [],
  // sends the current hand state without raising or lowering the hand
  broadcastLocalHandState() {
    let data = {
      handRaised: localParticipant.handRaised,
      session_id: localParticipant.session_id
    };
    window.callFrame.sendAppMessage(data, "*");
  },
  addHandToList(e) {
    this.list = [...this.list].concat([
      { session_id: e.fromId, handRaised: e.data.handRaised }
    ]);
    updateParticipants();
  },
  removeHandFromList(e) {
    this.list.splice(this.list.indexOf(e.data.session_id), 1);
    updateParticipants();
  },
  // gets called when a message is received, adds the session id and the hand state to this list
  updateList(e) {
    e.data.handRaised
      ? handState.addHandToList(e)
      : handState.removeHandFromList(e);
  },
  // raise or lower the local hand
  toggleState() {
    localParticipant = {
      ...localParticipant,
      handRaised: !localParticipant.handRaised
    };
  }
};

async function raiseOrLowerHand() {
  handState.toggleState();
  // Let other users see my hand state by sending a message
  handState.broadcastLocalHandState();
  updateParticipants();
  // Update the UI to show my own hand state
  document.getElementById("hand-img").classList.toggle("hidden");
  document.querySelector(".raise-hand-button").innerText = `${
    localParticipant.handRaised ? "lower your hand" : "raise your hand"
    }`;
  document.querySelector(".hand-state").innerText = `${
    localParticipant.handRaised ? "your hand is up" : "your hand is down"
    }`;
}

// Send a message to update everyone's hand state
async function messageReceived(e) {
  handState.updateList(e);
}

async function joinedMeeting(e) {
  localParticipant = {
    ...e.participants.local,
    handRaised: false
  };

  let localParticipantInfoBox = document.querySelector(
    ".local-participant-info"
  );
  localParticipantInfoBox.innerHTML = `
    <img
    id="hand-img"
    class=" is-pulled-right hidden"
    src="assets/hand.png"
    alt="hand icon"
    />  

    <p class="name-label"><strong>${localParticipant.user_name ||
    "You"}</strong></p>
    <button
      class="button is-info raise-hand-button"
      onclick="raiseOrLowerHand()"
      >raise your hand
    </button>
    <p class="hand-state has-text-right">your hand is down</p>
`;
  await updateParticipants();
  setTimeout(handState.broadcastLocalHandState, 2500)
}

async function participantJoined() {
  localParticipant = { ...localParticipant };
  await updateParticipants();
  setTimeout(handState.broadcastLocalHandState, 2500)
}

function leftMeeting(e) {
  document.querySelector(".participants-section").classList.toggle("hidden");
  document.querySelector(".thanks").classList.toggle("hidden");
  let list = document.querySelector(".participant-list");
  list.innerHTML = "";

  window.callFrame.destroy();
}

function updateParticipants() {
  // the local user has their own hand state. Other callers raised hands are saved in the handState list
  let raisedHands = handState.list.map(caller => caller.session_id);
  let ps = callFrame.participants();
  // will append the li elements (call participants) to this list
  let list = document.querySelector(".participant-list");
  // clear so the list shows current info when participants enter or leave
  list.innerHTML = "";

  Object.keys(ps).forEach(p => {
    let participant = ps[p];
    let callerHandUp = raisedHands.includes(participant.session_id);
    // This li will display the single participant info
    let li = document.createElement("li");
    // Don't list the local user again. Their info is in the first box.
    if (participant.local) {
      return;
    }
    let handStateLabel = callerHandUp ? "hand up" : "";
    li.innerHTML =
      `<div class="box">
        ${raisedHands.includes(participant.session_id)
        ? `<img
          id="hand-img"
          class=" is-pulled-right"
          src="assets/hand.png"
          alt="hand icon"
          />`
        : ""
      }
        <p>${participant.user_name || "Guest"}</p>
        <p class="hand-state has-text-right">${handStateLabel}</p> 
      </div>`;
    list.append(li);
  });
}
async function run() {
  // setting up for conditional rendering
  const welcomePrompt = document.querySelector(".welcome-box");
  welcomePrompt.classList.toggle("hidden");

  let room = { url: "https://popschools.daily.co/qOrbXQ3zJZC7o7aH8ycI" };

  window.callFrame = DailyIframe.wrap(document.getElementById("call-frame"), {
    showLeaveButton: true
  });

  callFrame
    .on("joined-meeting", joinedMeeting)
    .on("left-meeting", leftMeeting)
    .on("participant-joined", participantJoined)
    .on("participant-left", updateParticipants)
    .on("app-message", messageReceived);

  // join the room
  await callFrame.join({ url: room.url });
}
