import {
    getData
} from "./requests.js";



const request = new XMLHttpRequest()
let socket;
let isLiveSocket;

let scrollHeight;
let isLoading = false

function getChannelContent(previousChannelName, currentChannelName, counter = 1, quantity = 10) {
    console.log('previousCHan', previousChannelName, 'currentChan', currentChannelName)
    let mainContainer;
    let textBox;
    let oldHeight, newHeight;
    let loadingMessage = document.createElement('div')
    loadingMessage.innerHTML = 'Retrieving Previous Messages'
    loadingMessage.id = "loading-message"


    mainContainer = document.querySelector('#main')
    textBox = document.querySelector('.text-container')
    loadPosts(currentChannelName).then(boolValue => {
        mainContainer.scrollTo(0, 10000)
        console.log('boolValue', boolValue)
        if (boolValue) {
            console.log('boolValue', boolValue)
            oldHeight = textBox.scrollHeight
            mainContainer.style.scrollBehavior = 'auto'
            mainContainer.addEventListener('scroll', loadMorePosts)
            console.log("counter", counter)

            if (!socket && !isLiveSocket) {
                socket = io.connect(location.protocol + "//" + document.domain + ":" + location.port)
                isLiveSocket = io('/live')                

                function liveNotification() {
                    let live = document.createElement('span')                        
                        let text = document.createTextNode('Live')                    
                        live.appendChild(text)
                        live.className = "live"
                        return live
                }

                socket.on('broadcast text', (text) => {
                    let message = processMessage(text)

                    if (text.name == "Joined") {
                        let nameJoining = /[\w]+/.exec(text['text'])[0]

                        console.log('nameJoining', nameJoining, 'add to member list')
                        let currentUser = localStorage.getItem('displayName')
                        if (nameJoining != currentUser) {
                            let li = document.createElement('li')
                            li.innerHTML = nameJoining
                            let memberList = document.querySelector(".members-info")                            
                            memberList.append(li)                                 
                        } 
                    }
                    let textBox = document.querySelector('.text-container')
                    textBox.innerHTML += message
                    let mainContainer = document.querySelector('#main')
                    mainContainer.scrollTo(0, 100000)
                    addSVGS()
                })
                isLiveSocket.on('Joined Room', (data) => {                    
                    setTimeout(() => {
                        console.log('Is live socket joined room', data.memberName)
                        if (data.isLive) {
                            console.log('Joined room')                                       
                            
                            let members = document.querySelector('.members-info').children
                            let memberName = data.memberName
                            Array.from(members).forEach(member => {
                                let text = member.innerHTML
                                if (text.includes(memberName)) {
                                    console.log('update member', text)
                                    let live = liveNotification()
                                    member.append(live)
                                } else {
                                    console.log('members in room', text)
                                }
                            })
                        } 
                    }, 1500)                    
                })

                isLiveSocket.on('Update Live', (data) => {
                    console.log('Update live socket joined room', data.liveMembers)
                    let membersInfo = document.querySelector('.members-info')
                    let members = membersInfo.children
                    let liveMembers = data.liveMembers
                    Array.from(members).forEach(member => {
                        let text = member.innerHTML                        
                        liveMembers.forEach(presentMember => {                                                        
                            if (text.includes(presentMember)) {
                                let live = liveNotification()                                
                                member.append(live)
                            }                                
                        })
                    })
                })
                isLiveSocket.on('Left Room', (data) => {                    
                    if (!data.isLive) {                                 
                        let membersInfo = document.querySelector('.members-info')
                        let members = membersInfo.children                        
                        let memberName = data.memberName
                        Array.from(members).forEach(member => {
                            let text = member.innerHTML
                            if (text.includes(memberName)) {
                                member.innerHTML = memberName
                            }
                        })
                    }
                })                
            }

            connectWebSocket(previousChannelName, currentChannelName)            

        }
    })

    function connectWebSocket(previousChannel, currentChannel) {        
        console.log('leaving', previousChannel, 'joining', currentChannel)
        socket.emit('leave', previousChannel)
        socket.emit('join', currentChannel)
        isLiveSocket.emit('leave', previousChannel)              
        isLiveSocket.emit('join', currentChannel)                                                                                                        
        console.log('Adding socket handlers')
        let name = localStorage.getItem('displayName')
        let textForm = document.querySelector('#text-form')
        textForm.onsubmit = (e) => {
            e.preventDefault()
            let textInput = document.querySelector('#textbox')
            console.log('Submitting text', textInput)
            let text = textInput.innerHTML
            if (/\w+|\d+/g.test(text)) {
                console.log('text', text)
                let textInfo = {
                    name,
                    text
                }
                socket.emit("submit text", textInfo)
                textInput.innerHTML = "";
            }

            return false

        }
    }

    async function loadPosts(currentChannelName) {
        let start = counter
        let end = start + quantity - 1
        counter = end + 1

        console.log('loadPOsts counter', counter)
        let formData = new FormData()
        formData.append("start", start)
        formData.append("end", end)

        let data = await getData(`/chan/posts/${currentChannelName}`, formData)
        console.log('data texts', data.texts)
        if (data.success && data.texts.length > 0) {
            let texts = data.texts
            console.log('adding previous texts')
            addPreviousTexts(texts, counter, quantity)
            addSVGS()
            if (start == 1 && data.texts.length !== 0) {
                return true
            } else if (data.texts.length < quantity) {
                counter = undefined
                console.log('Few texts')
                // setTimeout(() => {
                //     loadingMessage.innerHTML = "No Previous Messages"
                // }, 3000)
                return false;
            }
        } else {
            counter = undefined
            console.log('No mo texts')
            setTimeout(() => {
                loadingMessage.innerHTML = "No Previous Messages"
            }, 3000)
            return false;
        }
    }
    function processMessage(text) {
        let message;
        if (text["name"] == 'Joined') {
            message = document.createElement('div')
            message.innerHTML = text['text']
            message.className = "joining-message"
            message = message.outerHTML
        } else {
            if (localStorage.getItem('displayName') == text['name']) {
                text['sender'] = 'self'
            } else {
                text['sender'] = 'other'
            }
            message = Handlebars.templates.textTemplate(text);
        }
        return message
    }
    function addPreviousTexts(texts, counter, quantity) {
        texts.forEach((text, i) => {
            let message = processMessage(text)
            let textBox = document.querySelector('.text-container')
            if (i == 0 && counter < quantity) {
                textBox.innerHTML = message
            } else {
                textBox.firstElementChild.insertAdjacentHTML('beforebegin', message)
            }
        })
    }
    function loadMorePosts() {
        if (mainContainer.scrollTop == 0 && !isLoading) {
            isLoading = true
            loadingMessage.remove()
            textBox.prepend(loadingMessage)
            setTimeout(() => {
                loadPosts(localStorage.getItem('lastChannel')).then(() => {
                    newHeight = textBox.scrollHeight
                    scrollHeight = newHeight - oldHeight                   
                    mainContainer.scrollTo(0, (scrollHeight * 0.95))
                    oldHeight = newHeight
                    if (counter) {
                        loadingMessage.style.animationPlayState = 'running'
                        setTimeout(() => {
                            loadingMessage.remove()
                        }, 10000 * counter / 8)
                    }
                })
                isLoading = false
            }, 1800)
        }
        if (counter == undefined) {
            setTimeout(() => {                
                mainContainer.addEventListener('scroll', loadFinalMessages)
                mainContainer.removeEventListener('scroll', loadMorePosts)
            }, 500)
        }

        function loadFinalMessages() {
            if (mainContainer.scrollTop == 0) {                
                loadingMessage.remove();
                loadingMessage = document.createElement('div')
                loadingMessage.innerHTML = 'Retrieving Previous Messages'
                loadingMessage.id = "loading-message"
                loadingMessage.innerHTML = "No Previous Messages"
                textBox.prepend(loadingMessage)
                setTimeout(() => {
                    loadingMessage.remove();                    
                    mainContainer.removeEventListener('scroll', loadFinalMessages)
                }, 3000)
            }
        }
    }
}

function addSVGS() {
    let svgOther = d3.selectAll('.svg-other')
    let svgSelf = d3.selectAll('.svg-self')

    svgOther = addDefs(svgOther)
    svgSelf = addDefs(svgSelf)

    svgOther.append("path")
        .attr('d', "M 32 0 L 75 0 L 32 25 Z")
        .style('fill', '#870048')
        .style('filter', "url(#drop-shadow)")


    svgSelf.append("path")
        .attr('d', "M 0 0 L 43 0 L 43 25 Z")
        .style('fill', '#870048')
        .style('filter', "url(#drop-shadow)")
}

function addDefs(svg) {
    let defs = svg.append('defs')

    svg.attr("width", 75)
        .attr('height', 200)

    let filter = defs.append('filter')
        .attr('id', 'drop-shadow')
        .attr('height', '130%')
    filter.append('feGaussianBlur')
        .attr('in', 'SourceAlpha')
        .attr('stdDeviation', 3)
        .attr('result', 'blur')

    filter.append('feOffset')
        .attr('in', 'blur')
        .attr('dx', 5)
        .attr('dy', 5)
        .attr('result', 'offsetBlur')

    let feMerge = filter.append('feMerge')

    feMerge.append('feMergeNode')
        .attr('in', 'offsetBlur')
    feMerge.append('feMergeNode')
        .attr('in', 'SourceGraphic')

    return svg
}

export {
    getChannelContent,
    socket, 
    isLiveSocket
}