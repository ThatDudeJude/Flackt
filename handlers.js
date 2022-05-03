document.addEventListener('DOMContentLoaded', () => {
    const request = new XMLHttpRequest()
    if (!localStorage.getItem('displayName')) {

        let nameDisplay = new displayNameDisplay
        let display = new currentDisplay(nameDisplay)
        display.updateDisplay()
    
        document.querySelector('#getDisplayName').onsubmit = () => {
            let displayName = document.querySelector('#displayName').value

            request.open('POST', '/addname')

            request.onload = () => {
                const data = JSON.parse(request.responseText)
                
                if (data.success) {
                    displayNameDisplay.createDisplayName(data.displayName)
                    display = display.create                    
                } else {
                    let message = new messageDisplay(`Diplay name ${data.displayName} already taken!`)
                    display.addMessage(message)       
                }
            }

            let data = new FormData()
            data.append('displayName', displayName)
            request.send(data)

            return false;
        }
    }
})