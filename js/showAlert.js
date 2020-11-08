
export default function showAlert({ text = 'alert', title = 'Alert' }) {
    const modal = document.createElement('div');
    modal.setAttribute("style", "visibility: visible; z-index: 9999; background: white; width: 200px; left: 50px; top: 200px; position: absolute; padding-left: 15px; border-radius: 4px; border-style: solid; border-width: 1px; border-color: rgba(45,15,66,1);");
    modal.id = 'Alert'

    const alertTitle = document.createElement('p');
    alertTitle.setAttribute("style", "color: rgba(45,15,66,1); font-family: 'Glacial Indifference', sans-serif; font-size: 30px; line-height: 0px;");
    alertTitle.innerHTML = title

    const alertText = document.createElement('span');
    alertText.setAttribute("style", "font-family: 'Glacial Indifference', sans-serif; font-size: 14px; color: black;");
    alertText.innerHTML = text + "<br> <br>"; //I know this is dirty, shut up.

    const closebutton = document.createElement("button");
    closebutton.setAttribute("style", "background-color:  rgba(39,145,100,1); color: white; padding: 10px 14px; font-family: 'Glacial Indifference', sans-serif; font-size: 14px; border-radius: 4px; border: none; margin: auto; margin-bottom: 10px;");
    closebutton.textContent = "Try again";

    modal.appendChild(alertTitle);
    modal.appendChild(alertText);
    modal.appendChild(closebutton);
    document.body.appendChild(modal) ;

    //action when clicking
    closebutton.addEventListener('click', function(){
        document.body.removeChild(modal);
    })
}