import { addEventHandlers, changeSelectedChannel } from './index.js'
import { getChannelContent } from './posts.js'
import { closeModal } from './requests.js';

class displayModal {
    constructor(modalTemplate, context) {
        this.modal = modalTemplate;
        this.context = context;
    }
    
    createModal() {        
  
        let modalWrapper = document.querySelector(".modal")
        modalWrapper.innerHTML = this.modal(this.context)
        
    }    

    showMessage(message, index) {
        let messageElement = `<p>${message}</p>`        
        let messageFormRow = document.querySelectorAll(".message")[index]
        messageFormRow.style.display = 'block'
        messageFormRow.innerHTML = messageElement
        setTimeout(() => {
            messageFormRow.style.display = 'none';
        }, 10000)
    }
    clear() {                
        let modalWrapper = document.querySelector(".modal")
        modalWrapper.innerHTML = ''        
    }        
}


class firstTimeModal extends displayModal {
    constructor(modalTemplate, context) {
        super(modalTemplate, context)
    }
    scroll(number) {        
        let modalContainer = document.querySelector("#modal-container")
        modalContainer.animate([
            {left: `-${(number - 1)* 100}vw`},{left: `-${number * 100}vw`}
        ], {duration: 1000, fill: 'forwards'})                        
    }    
}


class displayChannel {
    constructor(channelData, context) {
        this.channel = channelData
        this.context= context
    }    
    get channelContext() {                        
        let channelName = this.channel.channelName        
        localStorage.setItem('lastChannel', channelName)
        this.channel.channelMembers = this.channel.channelMembers.map(member => {
            if (member == localStorage.getItem('displayName')) {
                member = member + ' (You)'
            }
            return member
        })
        return this.channel
    }    
    updateChannelDisplay() {            
        let channel = localStorage.getItem('lastChannel')          
        let previousChannel = channel ? channel : 'None'
        let newContext = {
            ...this.context,
            ...this.channelContext
        }              
  
        let siteContainer = Handlebars.templates.siteContainer(newContext)
        let container = document.querySelector('.site-container')        
        container.innerHTML = siteContainer
        let title = "Flackt | Channel"
        document.title = title
        history.pushState(null, title, `/chan/${newContext.channelName}`)
        addEventHandlers()
        changeSelectedChannel(newContext.channelName)        
        getChannelContent(previousChannel, newContext.channelName)                
    }    
}

export {firstTimeModal, displayChannel, displayModal}