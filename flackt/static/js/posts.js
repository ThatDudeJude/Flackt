/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import { getData } from './requests.js';

// eslint-disable-next-line import/no-mutable-exports
let socket,
  isLiveSocket,
  scrollHeight,
  isLoading = false;

function getChannelContent(prevChan, currChan, countStart = 1, numPosts = 10) {
  let mainContainer,
    oldHeight,
    newHeight,
    loadingMessage = document.createElement('div'),
    counter = countStart;

  loadingMessage.innerHTML = 'Retrieving Previous Messages';
  loadingMessage.id = 'loading-message';
  const previousChannelName = prevChan,
    currentChannelName = currChan,
    quantity = numPosts;
  // eslint-disable-next-line prefer-const
  mainContainer = document.querySelector('#main');
  const textBox = document.querySelector('.text-container');

  function connectWebSocket(previousChannel, currentChannel) {
    socket.emit('leave', previousChannel);
    socket.emit('join', currentChannel);
    isLiveSocket.emit('leave', previousChannel);
    isLiveSocket.emit('join', currentChannel);

    const name = localStorage.getItem('displayName'),
      textForm = document.querySelector('#text-form');
    textForm.onsubmit = (e) => {
      e.preventDefault();
      const textInput = document.querySelector('#textbox'),
        text = textInput.innerHTML;
      if (/\w+|\d+/g.test(text)) {
        const textInfo = {
          name,
          text,
        };
        socket.emit('submit text', textInfo);
        textInput.innerHTML = '';
      }

      return false;
    };
  }

  async function loadPosts(currentChannelName) {
    const start = counter,
      end = start + quantity - 1;
    counter = end + 1;

    const formData = new FormData();
    formData.append('start', start);
    formData.append('end', end);

    const data = await getData(`/chan/posts/${currentChannelName}`, formData);
    let value;

    if (data.success && data.texts.length > 0) {
      const { texts } = data;

      // eslint-disable-next-line no-use-before-define
      addPreviousTexts(texts, counter, quantity);
      // eslint-disable-next-line no-use-before-define
      addSVGS();
      if (start === 1 && data.texts.length !== 0) {
        value = true;
      } else if (data.texts.length < quantity) {
        counter = undefined;
        value = false;
      }
    } else {
      counter = undefined;

      setTimeout(() => {
        loadingMessage.innerHTML = 'No Previous Messages';
      }, 3000);
      value = false;
    }
    return value;
  }
  function processMessage(text) {
    let message;
    if (text.name === 'Joined') {
      message = document.createElement('div');
      message.innerHTML = text.text;
      message.className = 'joining-message';
      message = message.outerHTML;
    } else {
      if (localStorage.getItem('displayName') === text.name) {
        text.sender = 'self';
      } else {
        text.sender = 'other';
      }
      // eslint-disable-next-line no-undef
      message = Handlebars.templates.textTemplate(text);
    }
    return message;
  }
  function addPreviousTexts(texts, counter, quantity) {
    texts.forEach((text, i) => {
      const message = processMessage(text),
        // eslint-disable-next-line no-shadow
        textBox = document.querySelector('.text-container');
      if (i === 0 && counter < quantity) {
        textBox.innerHTML = message;
      } else {
        textBox.firstElementChild.insertAdjacentHTML('beforebegin', message);
      }
    });
  }
  function loadFinalMessages() {
    if (mainContainer.scrollTop === 0) {
      loadingMessage.remove();
      loadingMessage = document.createElement('div');
      loadingMessage.innerHTML = 'Retrieving Previous Messages';
      loadingMessage.id = 'loading-message';
      loadingMessage.innerHTML = 'No Previous Messages';
      textBox.prepend(loadingMessage);
      setTimeout(() => {
        loadingMessage.remove();
        mainContainer.removeEventListener('scroll', loadFinalMessages);
      }, 3000);
    }
  }
  function loadMorePosts() {
    if (mainContainer.scrollTop === 0 && !isLoading) {
      isLoading = true;
      loadingMessage.remove();
      textBox.prepend(loadingMessage);
      setTimeout(() => {
        loadPosts(localStorage.getItem('lastChannel')).then(() => {
          newHeight = textBox.scrollHeight;
          scrollHeight = newHeight - oldHeight;
          mainContainer.scrollTo(0, scrollHeight * 0.95);
          oldHeight = newHeight;
          if (counter) {
            loadingMessage.style.animationPlayState = 'running';
            setTimeout(() => {
              loadingMessage.remove();
            }, (10000 * counter) / 8);
          }
        });
        isLoading = false;
      }, 1800);
    }
    if (counter === undefined) {
      setTimeout(() => {
        mainContainer.addEventListener('scroll', loadFinalMessages);
        mainContainer.removeEventListener('scroll', loadMorePosts);
      }, 500);
    }
  }

  loadPosts(currentChannelName).then((boolValue) => {
    mainContainer.scrollTo(0, 10000);

    if (boolValue) {
      oldHeight = textBox.scrollHeight;
      mainContainer.style.scrollBehavior = 'auto';
      mainContainer.addEventListener('scroll', loadMorePosts);

      if (!socket && !isLiveSocket) {
        // eslint-disable-next-line no-undef
        socket = io.connect(
          `${document.location.protocol}//${document.domain}:${document.location.port}`
        );
        // eslint-disable-next-line no-undef
        isLiveSocket = io('/live');

        // eslint-disable-next-line no-inner-declarations
        function liveNotification() {
          const live = document.createElement('span'),
            text = document.createTextNode('Live');
          live.appendChild(text);
          live.className = 'live';
          return live;
        }

        socket.on('broadcast text', (text) => {
          const message = processMessage(text);

          if (text.name === 'Joined') {
            const nameJoining = /[\w]+/.exec(text.text)[0],
              currentUser = localStorage.getItem('displayName');

            if (nameJoining !== currentUser) {
              const li = document.createElement('li');
              li.innerHTML = nameJoining;
              const memberList = document.querySelector('.members-info');
              memberList.append(li);
            }
          }
          // eslint-disable-next-line no-shadow
          const textBox = document.querySelector('.text-container');
          textBox.innerHTML += message;
          // eslint-disable-next-line no-shadow
          const mainContainer = document.querySelector('#main');
          mainContainer.scrollTo(0, 100000);
          // eslint-disable-next-line no-use-before-define
          addSVGS();
        });

        isLiveSocket.on('Joined Room', (data) => {
          setTimeout(() => {
            if (data.isLive) {
              const members = document.querySelector('.members-info').children,
                { memberName } = data;
              Array.from(members).forEach((member) => {
                const text = member.innerHTML;
                if (text.includes(memberName)) {
                  const live = liveNotification();
                  member.append(live);
                }
              });
            }
          }, 1500);
        });

        isLiveSocket.on('Update Live', (data) => {
          const membersInfo = document.querySelector('.members-info'),
            members = membersInfo.children,
            { liveMembers } = data;

          Array.from(members).forEach((member) => {
            const text = member.innerHTML;
            liveMembers.forEach((presentMember) => {
              if (text.includes(presentMember)) {
                const live = liveNotification();
                member.append(live);
              }
            });
          });
        });
        isLiveSocket.on('Left Room', (data) => {
          if (!data.isLive) {
            const membersInfo = document.querySelector('.members-info'),
              members = membersInfo.children,
              { memberName } = data;

            Array.from(members).forEach((member) => {
              const text = member.innerHTML;
              if (text.includes(memberName)) {
                member.innerHTML = memberName;
              }
            });
          }
        });
      }

      connectWebSocket(previousChannelName, currentChannelName);
    }
  });
}

function addDefs(svg) {
  const defs = svg.append('defs');

  svg.attr('width', 75).attr('height', 200);

  const filter = defs
    .append('filter')
    .attr('id', 'drop-shadow')
    .attr('height', '130%');
  filter
    .append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', 3)
    .attr('result', 'blur');

  filter
    .append('feOffset')
    .attr('in', 'blur')
    .attr('dx', 5)
    .attr('dy', 5)
    .attr('result', 'offsetBlur');

  const feMerge = filter.append('feMerge');

  feMerge.append('feMergeNode').attr('in', 'offsetBlur');
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

  return svg;
}

function addSVGS() {
  // eslint-disable-next-line no-undef
  let svgOther = d3.selectAll('.svg-other'),
    // eslint-disable-next-line no-undef
    svgSelf = d3.selectAll('.svg-self');

  svgOther = addDefs(svgOther);
  svgSelf = addDefs(svgSelf);

  svgOther
    .append('path')
    .attr('d', 'M 32 0 L 75 0 L 32 25 Z')
    .style('fill', '#870048')
    .style('filter', 'url(#drop-shadow)');

  svgSelf
    .append('path')
    .attr('d', 'M 0 0 L 43 0 L 43 25 Z')
    .style('fill', '#870048')
    .style('filter', 'url(#drop-shadow)');
}

export { getChannelContent, socket };
