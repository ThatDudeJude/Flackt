/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
import {
  FirstTimeModal,
  DisplayChannel,
  DisplayModal,
} from './display_logic.js';
import { socket } from './posts.js';

const request = new XMLHttpRequest();
let newUserModal,
  scrollPage = 1,
  previousTitle;

function getData(url, formData = undefined, method = 'POST') {
  return new Promise((resolve, reject) => {
    request.open(method, url);

    request.onload = () => {
      try {
        const data = JSON.parse(request.responseText);

        if (data.success) {
          resolve(data);
        }
      } catch (e) {
        reject(e);
      }
    };

    if (formData) {
      request.send(formData);
    } else {
      request.send();
    }
  });
}

async function getChannelsList(type = 'all') {
  const context = {},
    data = await getData(`/chan/list/${type}`),
    { allChannels } = data;

  return new Promise((resolve) => {
    const channelNames = Object.keys(allChannels),
      numberOfChannels = channelNames.length;
    if (numberOfChannels) {
      const dataList = [];
      channelNames.forEach((name) => {
        const channel = allChannels[name];
        channel.channel_first_letter = name[0].toUpperCase();
        dataList.push(channel);
      });
      context.channelsData = dataList;
    } else {
      context.channelsData = 0;
    }
    resolve(context);
  });
}

async function selectChannel(channelName) {
  const currentChannelData = await getData(`/chan/show/${channelName}`);

  if (currentChannelData.success) {
    const context = await getChannelsList('member'),
      currentChannel = new DisplayChannel(
        currentChannelData.channelData,
        context
      );
    currentChannel.updateChannelDisplay();
  }
}

async function resumeChannelDisplay(displayName, channelName) {
  const data = await getData(`/access/current_user/${displayName}`);
  if (data.success) {
    await selectChannel(channelName);
  }
}

function getDisplayName(modal) {
  const displayName = document.querySelector('#displayName').value;

  request.open('POST', '/access/addname');

  request.onload = () => {
    const data = JSON.parse(request.responseText);

    if (data.success) {
      localStorage.setItem('displayName', displayName);
      // getNameModal.clear();
      modal.scroll(scrollPage);
      scrollPage += 1;
    } else {
      // getNameModal.showMessage(data.message);
      modal.showMessage(data.message, scrollPage - 1);
    }
  };
  const data = new FormData();
  data.append('display-name', displayName);
  request.send(data);
}

function createNewChannel(modal) {
  const createFirstChannel = document.querySelector('#create-channel-form');
  //     nextModal = document.querySelector('.next-modal-join');

  //   nextModal.onclick = () => {
  //     scrollPage += 1;
  //     modal.scroll(scrollPage);
  //     joinChannel(modal);
  //   };
  previousTitle = document.title;
  const title = 'Flackt | Create Channel';
  document.title = title;
  createFirstChannel.onsubmit = () => {
    // e.preventDefault()
    const channelName = document.querySelector('#channel-name').value,
      channelTopic = document.querySelector('#channel-topic').value,
      channelDescription = document.querySelector('#channel-description').value,
      channelCreator = localStorage.getItem('displayName');

    request.open('POST', '/chan/create');

    request.onload = async () => {
      const data = JSON.parse(request.responseText);
      if (data.success === false) {
        modal.showMessage(data.message, scrollPage - 1);
      } else {
        const context = await getChannelsList('member');
        modal.clear();

        const currentChannel = new DisplayChannel(data.newChannel, context);
        currentChannel.updateChannelDisplay();
      }
    };

    const data = new FormData();
    data.append('channel_creator', channelCreator);
    data.append('channel_name', channelName);
    data.append('channel_topic', channelTopic);
    data.append('channel_description', channelDescription);
    request.send(data);
    return false;
  };
}

function joinChannel(modal) {
  previousTitle = document.title;
  const title = 'Flackt | Join Channel';
  document.title = title;
  const channelDescriptionToggleButtons =
      document.querySelectorAll('.description-btn'),
    descriptionText = document.querySelectorAll('.chan-descr'),
    channelJoinButtons = document.querySelectorAll('.join-channel-btn');
  //     previousModal = document.querySelector('.previous-modal-create');

  //   previousModal.onclick = () => {
  //     console.log('back');
  //     modal.scrollBack(scrollPage);
  //     scrollPage -= 1;
  //   };

  channelDescriptionToggleButtons.forEach((button, i) => {
    // eslint-disable-next-line no-param-reassign
    button.onclick = () => {
      descriptionText[i].classList.toggle('show-description');
      const caret = document.querySelectorAll('.description-btn .fas')[i],
        caretOrientation = caret.className;
      if (caretOrientation.match(/\bdown\b/)) {
        caret.className = 'fas fa-caret-up';
      } else {
        caret.className = 'fas fa-caret-down';
      }
    };
  });

  async function clickHandler() {
    const data = await getData(`/chan/join/${this.dataset.channel}`);
    if (data.success) {
      const context = await getChannelsList('member'),
        currentChannel = new DisplayChannel(data.joinedChannel, context);

      modal.clear();
      currentChannel.updateChannelDisplay();
      setTimeout(() => {
        if (socket) {
          const textInfo = {
            name: 'Joined',
            text: `${localStorage.getItem('displayName')} joined this channel`,
          };
          socket.emit('submit text', textInfo);
        }
      }, 1000);
    }
  }

  channelJoinButtons.forEach((button) => {
    // eslint-disable-next-line no-param-reassign
    button.onclick = clickHandler;
  });
}

function closeModal(modal) {
  const canvas = document.querySelector('#close-modal-btn'),
    cx = canvas.getContext('2d'),
    circle = new Path2D();
  circle.moveTo(0, 30);
  circle.arc(30, 30, 30, 0, 7);
  cx.fillStyle = '#880E4F';
  cx.fill(circle);

  cx.translate(30, 30); //     nextModal = document.querySelector('.next-modal-join');

  //   nextModal.onclick = () => {
  //     scrollPage += 1;
  //     modal.scroll(scrollPage);
  //     joinChannel(modal);
  //   };
  cx.rotate(-0.25 * Math.PI);
  cx.beginPath();
  cx.moveTo(-20, 0);
  cx.strokeStyle = 'white';
  cx.lineWidth = 3;
  cx.lineTo(20, 0);
  cx.stroke();

  cx.beginPath();
  cx.moveTo(0, -20);
  cx.strokeStyle = 'white';
  cx.lineWidth = 3;
  cx.lineTo(0, 20);
  cx.stroke();

  cx.rotate(0.25 * Math.PI);
  cx.translate(-30, -30);

  canvas.addEventListener('click', (event) => {
    if (cx.isPointInPath(circle, event.offsetX, event.offsetY)) {
      modal.clear();
      document.title = previousTitle;
    }
  });
}

async function joinExistingChannel() {
  const context = await getChannelsList('non-member'),
    modal = new DisplayModal(Handlebars.templates.loneModal, {
      loneModal: Handlebars.templates.joinChannelModal({
        channelsList: context.channelsData,
      }),
    });
  modal.createModal();
  joinChannel(modal);
  closeModal(modal);
  return true;
}

function createNewChannelExistingUser() {
  const modal = new DisplayModal(Handlebars.templates.loneModal, {
    loneModal: Handlebars.templates.newChannelModal({}),
  });
  modal.createModal();
  closeModal(modal);
  createNewChannel(modal);
  // addEventHandlers()
}

function showErrorMessage(message) {
  const modal = new DisplayModal(Handlebars.templates.errorModal, {
    loneModal: Handlebars.templates.joinChannelModal({ message }),
  });
  modal.createModal();
  closeModal(modal);
}

document.addEventListener('DOMContentLoaded', () => {
  localStorage.clear();
  if (!localStorage.getItem('displayName')) {
    getChannelsList().then((context) => {
      const mainContainer = Handlebars.templates.siteContainer(context),
        container = document.querySelector('.site-container');
      container.innerHTML = mainContainer;
      const newUserContext = {
        pickChannelFromList: Handlebars.templates.joinChannelModal({
          channelsList: context.channelsData,
        }),
        createNewChannel: Handlebars.templates.newChannelModal({}),
      };
      newUserModal = new FirstTimeModal(
        Handlebars.templates.newUserDisplay,
        newUserContext
      );

      const title = 'Flackt | Display Name';
      document.title = title;
      window.history.pushState(null, title, `/access/user`);

      newUserModal.createModal();
      document.querySelector('#getDisplayName').onsubmit = () => {
        getDisplayName(newUserModal);
        const title = 'Flackt | Create or Join';
        document.title = title;
        return false;
      };
      document.querySelector('#new-user-create-channel').onclick = () => {
        newUserModal.scroll(scrollPage);
        createNewChannel(newUserModal);
        document.querySelector('.previous-modal-from-create').style.display =
          'none';
        document.querySelector('.next-modal-from-join').style.display = 'none';
        const nextModalFromCreate = document.querySelector(
            '.next-modal-from-create'
          ),
          previousModalFromJoin = document.querySelector(
            '.previous-modal-from-join'
          );

        nextModalFromCreate.onclick = () => {
          scrollPage += 1;
          newUserModal.scroll(scrollPage);
          joinChannel(newUserModal);
        };
        previousModalFromJoin.onclick = () => {
          newUserModal.scrollBack(scrollPage);
          scrollPage -= 1;
        };
      };
      document.querySelector('#new-user-join-channel').onclick = () => {
        const modalChildren =
            document.querySelector('#modal-container').children,
          lastChild = modalChildren[modalChildren.length - 1],
          thirdChild = modalChildren[modalChildren.length - 2];
        document
          .querySelector('#modal-container')
          .insertBefore(lastChild, thirdChild);
        newUserModal.scroll(scrollPage);
        joinChannel(newUserModal);
        document.querySelector('.previous-modal-from-join').style.display =
          'none';
        document.querySelector('.next-modal-from-create').style.display =
          'none';
        const nextModalFromJoin = document.querySelector(
            '.next-modal-from-join'
          ),
          previousModalFromCreate = document.querySelector(
            '.previous-modal-from-create'
          );

        nextModalFromJoin.onclick = () => {
          scrollPage += 1;
          newUserModal.scroll(scrollPage);
          createNewChannel(newUserModal);
        };
        previousModalFromCreate.onclick = () => {
          newUserModal.scrollBack(scrollPage);
          scrollPage -= 1;
        };
      };
    });
  } else {
    const currentChannelName = localStorage.getItem('lastChannel'),
      currentDisplayName = localStorage.getItem('displayName');
    resumeChannelDisplay(currentDisplayName, currentChannelName);
  }
});

export {
  getData,
  getChannelsList,
  selectChannel,
  joinExistingChannel,
  createNewChannelExistingUser,
  closeModal,
  resumeChannelDisplay,
  showErrorMessage,
};
