
const bannedSiteList = [
    'www.facebook.com',
    'youtube.com'
]

const HTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>

<style>
    @font-face {
    font-family: 'Glacial Indifference', bold, sans-serif;
    src: url(fonts/GlacialIndifference-Bold.otf);
    }
    body{background: linear-gradient(180deg,rgba(45,15,66,1) 45%, rgba(39,145,100,1) 100%); height: 100vh;}
    p.Alert{font-family: 'Glacial Indifference', bold, sans-serif; font-size: 36px; color:white; text-align: center; }
    div.Alert{max-height: 100%; padding-top: 10%; text-align: center}
    input.purpinlinebutton{
    background-color: rgba(45,15,66,1);
    color: white;
    padding: 16px 32px;
    font-family: "Glacial Indifference", sans-serif;
    font-size: 20px;
    border-radius: 4px;
    border: none;
    margin: auto;
    display: inline-block;
    width: 30%;}
    input.inlinebutton{
    background: none;
    color: white;
    padding: 16px 32px;
    font-family: "Glacial Indifference", sans-serif;
    font-size: 14px;
    border: none;
    margin: auto;
    display: inline-block;
    text-decoration: underline;}


</style>
<body>
    <div class="Alert">
        <img class="Alert" src="icons/angry_workmate_small.png" width="250" height="250" >
        <p class="Alert"><b>Workmate blocked this website. Go back to work!</b></p>
        <input type="button" value="Close this page" class="purpinlinebutton" class="Alert">
        <input type="button" value="I really need to access. Let me in once." class="inlinebutton" class="Alert">
    </div>
</body>
</html>`

const curSite = window.location.hostname

console.log(window.location)

if (bannedSiteList.includes(curSite)) {
    // const body = document.getElementsByTagName('body')[0]
    // console.log(body)
    // body.innerHTML(`<div class="Alert">
    // <img class="Alert" src="icons/angry_workmate_small.png" width="250" height="250" >
    // <p class="Alert"><b>Workmate blocked this website. Go back to work!</b></p>
    // <input type="button" value="Close this page" class="purpinlinebutton" class="Alert">
    // <input type="button" value="I really need to access. Let me in once." class="inlinebutton" class="Alert">
    // </div>`)
    document.open()
    document.write(HTML)
    document.close()
}