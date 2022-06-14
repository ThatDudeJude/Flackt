/* eslint-disable import/no-cycle */

import { addEventHandlers, changeSelectedChannel } from './index.js';
import { getChannelContent } from './posts.js';

class DisplayModal {
  constructor(modalTemplate, context) {
    this.modal = modalTemplate;
    this.context = context;
  }

  createModal() {
    const modalWrapper = document.querySelector('.modal');
    modalWrapper.innerHTML = this.modal(this.context);
  }

  showMessage(message, index) {
    const messageElement = `<p>${message}</p>`,
      messageFormRow = document.querySelectorAll('.message')[index];
    messageFormRow.style.display = 'block';
    messageFormRow.innerHTML = messageElement;
    setTimeout(() => {
      messageFormRow.style.display = 'none';
    }, 10000);
  }

  clear() {
    const modalWrapper = document.querySelector('.modal');
    modalWrapper.innerHTML = '';
  }
}

class FirstTimeModal extends DisplayModal {
  scroll(number) {
    const modalContainer = document.querySelector('#modal-container');
    modalContainer.animate(
      [{ left: `-${(number - 1) * 100}vw` }, { left: `-${number * 100}vw` }],
      { duration: 1000, fill: 'forwards' }
    );
  }

  // eslint-disable-next-line class-methods-use-this
  scrollBack(number) {
    const modalContainer = document.querySelector('#modal-container');
    modalContainer.animate(
      [{ left: `-${number * 100}vw` }, { left: `-${(number - 1) * 100}vw` }],
      { duration: 1000, fill: 'forwards' }
    );
  }
}

class DisplayChannel {
  constructor(channelData, context) {
    this.channel = channelData;
    this.context = context;
  }

  get channelContext() {
    const { channelName } = this.channel;
    localStorage.setItem('lastChannel', channelName);
    let displayName;
    this.channel.channelMembers = this.channel.channelMembers.map((member) => {
      if (member === localStorage.getItem('displayName')) {
        displayName = `${member} (You)`;
      } else {
        return member;
      }
      return displayName;
    });
    return this.channel;
  }

  updateChannelDisplay() {
    const channel = localStorage.getItem('lastChannel'),
      previousChannel = channel || 'None',
      newContext = {
        ...this.context,
        ...this.channelContext,
      },
      // eslint-disable-next-line no-undef
      siteContainer = Handlebars.templates.siteContainer(newContext),
      container = document.querySelector('.site-container');
    container.innerHTML = siteContainer;
    const title = 'Flackt | Channel';
    document.title = title;
    window.history.pushState(null, title, `/chan/${newContext.channelName}`);
    addEventHandlers();
    changeSelectedChannel(newContext.channelName);
    getChannelContent(previousChannel, newContext.channelName);
  }
}

export { FirstTimeModal, DisplayChannel, DisplayModal };
