import {firstTimeModal, displayChannel, displayModal} from './display_logic.js'
import { socket } from './posts.js';

const request = new XMLHttpRequest()  
let newUserModal;
let scrollPage = 1;
let previousTitle;

document.addEventListener('DOMContentLoaded', () => {    
    // localStorage.clear()
    if (!localStorage.getItem('displayName')) {        

        console.log('getDisplayName')
        getChannelsList().then(context => {                    
            console.log('getChannelsList')
            let mainContainer = Handlebars.templates.siteContainer(context)
            console.log("context allChannels", context)
            let container = document.querySelector('.site-container')
            container.innerHTML = mainContainer
            let newUserContext = {pickChannelFromList: Handlebars.templates.joinChannelModal({channelsList: context['channelsData']}), 
                createNewChannel: Handlebars.templates.newChannelModal({})}
            newUserModal = new firstTimeModal(Handlebars.templates.newUserDisplay, newUserContext)            

            let title = "Flackt | Display Name"
            document.title = title
            history.pushState(null, title, `/access/user`)
            console.log("channelsList",context['channelsList'])
            newUserModal.createModal()                    
            document.querySelector('#getDisplayName').onsubmit = () => {
                getDisplayName(newUserModal)
                let title = "Flackt | Create or Join"
                document.title = title
                return false;
            }
        document.querySelector('#new-user-create-channel').onclick = () => {
            newUserModal.scroll(scrollPage)
            createNewChannel(newUserModal)            
            
        }
        document.querySelector('#new-user-join-channel').onclick = ()=> {
            let modalChildren = document.querySelector("#modal-container").children
            let lastChild = modalChildren[modalChildren.length - 1]
            let thirdChild = modalChildren[modalChildren.length - 2]
            document.querySelector('#modal-container').insertBefore(lastChild, thirdChild)            
            newUserModal.scroll(scrollPage)                        
            joinChannel(newUserModal)
            }    
        })        
    } else {
        let currentChannelName = localStorage.getItem('lastChannel')
        let currentDisplayName = localStorage.getItem('displayName')
        resumeChannelDisplay(currentDisplayName, currentChannelName)                
    }    
})

async function getChannelsList(type='all') {
    let context = {}        
    console.log('getList type', type)
    let data = await getData(`/chan/list/${type}`)        
    let allChannels = data.allChannels
    console.log('All channels', allChannels)            
    return new Promise(resolve => {
        
        const channelNames = Object.keys(allChannels)
            const numberOfChannels = channelNames.length
            if (numberOfChannels) {
                let dataList =  []
                channelNames.forEach((name) => {
                    dataList.push(allChannels[name])
                })
                context['channelsData'] = dataList;
                console.log(context)
            } else {
                context['channelsData'] = 0
            }            
            resolve(context)
            console.log('resolved')
        }                 
    )

}


function getData(url, formData = undefined, method="POST") {        
    return new Promise((resolve, reject) => {
        request.open(method, url)

        request.onload = () => {
            try {
                const data = JSON.parse(request.responseText)
                console.log("Data", data)
                if (data.success) {
                    resolve(data)    
                }
            } catch(e) {
                reject(e)
            }                                
        }

        if (formData) {
            request.send(formData)
        } else {
            request.send()
        }
        
    })}

async function resumeChannelDisplay(displayName, channelName) {
    let data = await getData(`/access/current_user/${displayName}`)
    if (data.success) {
        await selectChannel(channelName)
    } else {
        console.log(data['message'])
    }
    
}

function getDisplayName(modal) {
    let displayName = document.querySelector('#displayName').value

    request.open('POST', '/access/addname')

    request.onload = () => {
        const data = JSON.parse(request.responseText)
        
        if (data.success) {
            localStorage.setItem('displayName', displayName);
            // getNameModal.clear();                
            modal.scroll(scrollPage)
            scrollPage += 1                
        } else {                
            // getNameModal.showMessage(data.message);
            modal.showMessage(data.message, scrollPage - 1);
        }
    }    
    let data = new FormData()
    data.append('display-name', displayName)
    request.send(data)

}

function createNewChannel(modal) {
    const createFirstChannel = document.querySelector('#create-channel-form')
    previousTitle = document.title
    let title = "Flackt | Create Channel"
    document.title = title
    createFirstChannel.onsubmit = (e) => {
        // e.preventDefault()
        const channelName = document.querySelector('#channel-name').value 
        const channelTopic = document.querySelector('#channel-topic').value 
        const channelDescription = document.querySelector('#channel-description').value 
        const channelCreator = localStorage.getItem('displayName')

        request.open('POST', "/chan/create") 

        request.onload = async () => {                
                const data = JSON.parse(request.responseText)
                if (data.success == false) {                        
                    modal.showMessage(data.message, scrollPage - 1);
                    console.log("Message:", data.message)
                } else {
                    let context = await getChannelsList('member')
                    modal.clear()
                    
                    let currentChannel = new displayChannel(data.newChannel, context)                                                 
                    currentChannel.updateChannelDisplay()
                }                
        }

        const data = new FormData()
        data.append('channel_creator', channelCreator)
        data.append("channel_name", channelName)
        data.append( 'channel_topic', channelTopic)
        data.append( 'channel_description', channelDescription)
        request.send(data)        
        return false
    }
}

function joinChannel(modal) {
    previousTitle = document.title
    let title = "Flackt | Join Channel"
    document.title = title
    let channelDescriptionToggleButtons = document.querySelectorAll('.description-btn');

    let descriptionText = document.querySelectorAll('.chan-descr');
    let channelJoinButtons = document.querySelectorAll('.join-channel-btn')

    channelDescriptionToggleButtons.forEach((button, i) => {
        button.onclick = () => {
            console.log('Show Description')
            descriptionText[i].classList.toggle('show-description')
            let caret = document.querySelectorAll('.description-btn .fas')[i]
            let caretOrientation = caret.className
            if (caretOrientation.match(/\bdown\b/)) {
                caret.className = "fas fa-caret-up"
            } else {
                caret.className = "fas fa-caret-down"
            }

    }})

    channelJoinButtons.forEach((button) => {
        button.onclick = async function() {
            let data = await getData(`/chan/join/${this.dataset.channel}`)
            if (data.success) {                        
                let context = await getChannelsList('member')                        
                
                let currentChannel = new displayChannel(data.joinedChannel, context)                                             
                modal.clear()
                currentChannel.updateChannelDisplay()
                setTimeout(() => {
                    if (socket) {
                        let textInfo = {name: "Joined", text:`${localStorage.getItem('displayName')} joined this channel`}
                        socket.emit("submit text", textInfo)
                    }
                }, 1000)
            }
            
        }
    })
}

async function selectChannel(channelName) {
    console.log('selecting channel')
    let currentChannelData = await getData(`/chan/show/${channelName}`)
    console.log('selected channel data', currentChannelData)
    if (currentChannelData.success) {
        let context = await getChannelsList('member')
        console.log("CurrentChannelData", currentChannelData)
        let currentChannel = new displayChannel(currentChannelData.channelData, context)        
        currentChannel.updateChannelDisplay()
    } else {
        console.log(currentChannelData.message)
    }
}

async function joinExistingChannel() {
    let context = await getChannelsList('non-member')    
    let modal = new displayModal(Handlebars.templates.loneModal, {loneModal: Handlebars.templates.joinChannelModal({channelsList: context['channelsData']})})
    modal.createModal()
    joinChannel(modal)          
    closeModal(modal)
    return true
}

function createNewChannelExistingUser() {
    let modal = new displayModal(Handlebars.templates.loneModal, {loneModal: Handlebars.templates.newChannelModal({})})   
    modal.createModal()        
    closeModal(modal)
    createNewChannel(modal)
    // addEventHandlers()
}

function showErrorMessage(message){
    let modal = new displayModal(Handlebars.templates.errorModal, {loneModal: Handlebars.templates.joinChannelModal({message})})    
    modal.createModal()
    closeModal(modal)    
}


function closeModal(modal) {
    let canvas = document.querySelector('#close-modal-btn')
    let cx = canvas.getContext('2d')
    let circle = new Path2D()                
        circle.moveTo(0, 30)        
        circle.arc(30, 30, 30, 0, 7)    
        cx.fillStyle = '#880E4F'
        cx.fill(circle)
        
        cx.translate(30, 30)
        cx.rotate(-0.25 * Math.PI)
        cx.beginPath()
        cx.moveTo(-20, 0)        
        cx.strokeStyle = 'white'
        cx.lineWidth = 3
        cx.lineTo(20, 0)
        cx.stroke()

        cx.beginPath()
        cx.moveTo(0, -20)        
        cx.strokeStyle = 'white'
        cx.lineWidth = 3
        cx.lineTo(0, 20)
        cx.stroke()
        
        cx.rotate(0.25 * Math.PI)
        cx.translate(-30, -30)

    canvas.addEventListener('click', function(event) {        
        if (cx.isPointInPath(circle, event.offsetX, event.offsetY)) {
            modal.clear();
            document.title = previousTitle
        } 
    
    })
    
    
}


export {getData, getChannelsList, selectChannel, joinExistingChannel, createNewChannelExistingUser, closeModal, resumeChannelDisplay, showErrorMessage}