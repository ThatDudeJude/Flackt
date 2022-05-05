import { selectChannel, joinExistingChannel, createNewChannelExistingUser } from "./requests.js"

// document.addEventListener('DOMContentLoaded', () => {



    // Bindings for group info toggle

function addEventHandlers() {
    
    let toggle = document.querySelector('.toggle')
    let toggleLabel = document.querySelector('#toggle-label')
    let toggleSwitch = document.querySelector('.toggle-switch')
    let groupInfo = document.querySelector('#aside')
    let mainContent = document.querySelector('#main')
    let textInputContainer = document.querySelector('#footer')    
    let header = document.querySelector('#header')
    let toggleGroupInfoButton = document.querySelector('#group-btn')
    let toggleGroupInfoStatus = document.querySelector('#action-label')
    let navMenuContainer = document.querySelector('#nav-menu-container')
    let navHamburger = document.querySelector('#nav-hamburger')
    let nav = document.querySelector('#nav')
    let createChannelButton = document.querySelector('#nav-create-channel')
    let joinChannelButton = document.querySelector('#nav-join-channel')
    let channelSelector = document.querySelector('#list')

    
    
    

    
    function navMenuResponse() {
        let classList = navHamburger.classList
        let navStyle = nav.style
        if (classList.contains('nav-menu-hide')) {
            classList.replace('nav-menu-hide', 'nav-menu-show')
            navStyle.left = '0'
        } else {
            classList.replace('nav-menu-show', 'nav-menu-hide')
            navStyle.left = '-90vw'
        }
    }
    
    function closeNav() {
        let classList = navHamburger.classList
        let navStyle = nav.style
        if (classList.contains('nav-menu-show')) {
            classList.replace('nav-menu-show', 'nav-menu-hide')
            navStyle.left = '-90vw'
    }
    }

    function groupInfoButton() {
        toggleGroupInfoButton.classList.toggle('group-info-btn-show')        
        if (groupInfo.classList.contains('aside-show')) {
            groupInfo.classList.replace('aside-show', 'aside-hide')
            navMenuContainer.style.zIndex = '98'
        } else {
            groupInfo.classList.replace('aside-hide', 'aside-show')
            navMenuContainer.style.zIndex = '89'
        }
        


        if (toggleGroupInfoStatus) {
            let textInfo = toggleGroupInfoStatus.innerHTML
        if (textInfo.startsWith('Show')) {
            textInfo = textInfo.replace('Show', 'Hide')                        
        } else {
            textInfo = textInfo.replace('Hide', 'Show')            
        }
        toggleGroupInfoStatus.innerHTML = textInfo
        }        
    }

    function closeGroupInfo() {
        if (groupInfo.classList.contains('aside-show')) {
            toggleGroupInfoButton.classList.toggle('group-info-btn-show')        
            groupInfo.classList.replace('aside-show', 'aside-hide')         
        }
    }

    
    navMenuContainer.onclick = () => {
        navMenuResponse()        
    }
    
    nav.onclick = closeGroupInfo
    
    textInputContainer.onclick = () => {
        closeNav()
        closeGroupInfo()
    }
    mainContent.onclick = () => {
        closeNav()
        closeGroupInfo()
    } 
    header.onclick = () => {
        closeNav()
        closeGroupInfo()
    }

    toggleGroupInfoButton.onclick = groupInfoButton    

    toggle.onclick = () => {
        let switchStatus = toggleSwitch.className;
        let toggleStatus = toggle.className
        let toggleInfo = toggleLabel.innerHTML
        if (switchStatus.includes('off')) {
            switchStatus = switchStatus.replace('off', 'on')
            toggleStatus = toggleStatus.replace('off', 'on')
            toggleInfo = toggleInfo.replace("Show", "Hide")            
            mainContent.style.gridColumn = '2 /span 1'
            groupInfo.style.cssText += "; display: block; grid-area: aside;"            
            textInputContainer.style.gridColumn = '2 / span 1'            
        } else {
            switchStatus = switchStatus.replace('on', 'off')
            toggleStatus = toggleStatus.replace('on', 'off')
            toggleInfo = toggleInfo.replace("Hide", "Show")
            mainContent.style.gridColumn = '2 / span 2'
            groupInfo.style.display = 'none'
            textInputContainer.style.gridColumn = '2 / span 2'
        }
        toggleSwitch.className = switchStatus
        toggle.className = toggleStatus
        toggleLabel.innerHTML = toggleInfo
    }

    channelSelector.onchange = (e) => {
        e.preventDefault()
        let channelName = channelSelector.value
        selectChannel(channelName)        
        return false
    }

    joinChannelButton.onclick = () => {
    
        joinExistingChannel()
        
    }
    createChannelButton.onclick = () => {
    
        createNewChannelExistingUser()
    }
    
}
  
function changeSelectedChannel(channelName) {
    if (localStorage.getItem('lastChannel')) {
        let selectedChannel = document.querySelector(`option[value='${channelName}']`)            
        selectedChannel.setAttribute('selected', '')
    }
}

export {changeSelectedChannel, addEventHandlers}