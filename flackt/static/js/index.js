// eslint-disable-next-line import/no-cycle
import {
  selectChannel,
  joinExistingChannel,
  createNewChannelExistingUser,
} from './requests.js';

function addEventHandlers() {
  const toggle = document.querySelector('.toggle'),
    toggleLabel = document.querySelector('#toggle-label'),
    toggleSwitch = document.querySelector('.toggle-switch'),
    groupInfo = document.querySelector('#aside'),
    mainContent = document.querySelector('#main'),
    textInputContainer = document.querySelector('#footer'),
    header = document.querySelector('#header'),
    toggleGroupInfoButton = document.querySelector('#group-btn'),
    toggleGroupInfoStatus = document.querySelector('#action-label'),
    navMenuContainer = document.querySelector('#nav-menu-container'),
    navHamburger = document.querySelector('#nav-hamburger'),
    nav = document.querySelector('#nav'),
    createChannelButton = document.querySelector('#nav-create-channel'),
    joinChannelButton = document.querySelector('#nav-join-channel'),
    channelSelector = document.querySelector('#list');

  function navMenuResponse() {
    const { classList } = navHamburger,
      navStyle = nav.style;
    if (classList.contains('nav-menu-hide')) {
      classList.replace('nav-menu-hide', 'nav-menu-show');
      navStyle.left = '0';
    } else {
      classList.replace('nav-menu-show', 'nav-menu-hide');
      navStyle.left = '-90vw';
    }
  }

  function closeNav() {
    const { classList } = navHamburger,
      navStyle = nav.style;
    if (classList.contains('nav-menu-show')) {
      classList.replace('nav-menu-show', 'nav-menu-hide');
      navStyle.left = '-90vw';
    }
  }

  function groupInfoButton() {
    toggleGroupInfoButton.classList.toggle('group-info-btn-show');
    if (groupInfo.classList.contains('aside-show')) {
      groupInfo.classList.replace('aside-show', 'aside-hide');
      navMenuContainer.style.zIndex = '98';
    } else {
      groupInfo.classList.replace('aside-hide', 'aside-show');
      navMenuContainer.style.zIndex = '89';
    }

    if (toggleGroupInfoStatus) {
      let textInfo = toggleGroupInfoStatus.innerHTML;
      if (textInfo.startsWith('Show')) {
        textInfo = textInfo.replace('Show', 'Hide');
      } else {
        textInfo = textInfo.replace('Hide', 'Show');
      }
      toggleGroupInfoStatus.innerHTML = textInfo;
    }
  }

  function closeGroupInfo() {
    if (groupInfo.classList.contains('aside-show')) {
      toggleGroupInfoButton.classList.toggle('group-info-btn-show');
      groupInfo.classList.replace('aside-show', 'aside-hide');
    }
  }

  navMenuContainer.onclick = () => {
    navMenuResponse();
  };

  nav.onclick = closeGroupInfo;

  textInputContainer.onclick = () => {
    closeNav();
    closeGroupInfo();
  };
  mainContent.onclick = () => {
    closeNav();
    closeGroupInfo();
  };
  header.onclick = () => {
    closeNav();
    closeGroupInfo();
  };

  toggleGroupInfoButton.onclick = groupInfoButton;

  toggle.onclick = () => {
    let switchStatus = toggleSwitch.className,
      toggleStatus = toggle.className,
      toggleInfo = toggleLabel.innerHTML;
    if (switchStatus.includes('off')) {
      switchStatus = switchStatus.replace('off', 'on');
      toggleStatus = toggleStatus.replace('off', 'on');
      toggleInfo = toggleInfo.replace('Show', 'Hide');
      mainContent.style.gridColumn = '2 /span 1';
      groupInfo.style.cssText += '; display: block; grid-area: aside;';
      textInputContainer.style.gridColumn = '2 / span 1';
    } else {
      switchStatus = switchStatus.replace('on', 'off');
      toggleStatus = toggleStatus.replace('on', 'off');
      toggleInfo = toggleInfo.replace('Hide', 'Show');
      mainContent.style.gridColumn = '2 / span 2';
      groupInfo.style.display = 'none';
      textInputContainer.style.gridColumn = '2 / span 2';
    }
    toggleSwitch.className = switchStatus;
    toggle.className = toggleStatus;
    toggleLabel.innerHTML = toggleInfo;
  };

  channelSelector.onchange = (e) => {
    e.preventDefault();
    const channelName = channelSelector.value;
    selectChannel(channelName);
    return false;
  };

  joinChannelButton.onclick = () => {
    joinExistingChannel();
  };
  createChannelButton.onclick = () => {
    createNewChannelExistingUser();
  };
}

function changeSelectedChannel(channelName) {
  if (localStorage.getItem('flacktLastChannel')) {
    const selectedChannel = document.querySelector(
      `option[value='${channelName}']`
    );
    selectedChannel.setAttribute('selected', '');
  }
}

export { changeSelectedChannel, addEventHandlers };
