function moveLinkContainer()
{

    var linkContainer= document.getElementById("link-container");
    var socialContainer= document.getElementById("social-container")
    var collapsibleNavbar=document.getElementById("collapsibleNavbar");
    var showcase=document.getElementById("showcase");
        if (window.outerWidth <= 800)
        {
            collapsibleNavbar.append(linkContainer);
            collapsibleNavbar.append(socialContainer);
            linkContainer.style.margin="0 auto";
            socialContainer.style.margin="0 auto";
        }
        else
        {
            showcase.appendChild(linkContainer);
            showcase.appendChild(socialContainer);
            linkContainer.style.margin="10px";
            socialContainer.style.margin="10px";
        }

}
async function fetchGames(page){
    $.ajax({
        type:'GET',
        url:"https://api.rawg.io/api/games?key=2d150e2f5c964e6992d048af8ef065f7&page="+page+"&page_size=10",
       success:function (result){
            for(var i=0;i<result.results.length;i++)
            {
                creatGame(result.results[i].name,result.results[i].background_image,result.results[i].id);
            }
        }

    });
}
function  createBadge(store,element)
{
    if (store==7)
    {
        var badge=document.createElement("div");
        badge.classList.add("xbox");
        element.append(badge);
    }
    else if(store==1)
    {
        var badge=document.createElement("div")
        badge.classList.add("steam");
        element.append(badge);
    }
    if(store==11)
    {
        var badge=document.createElement("div")
        badge.classList.add("epic");
        element.append(badge);
    }
    if(store==5)
    {
        var badge=document.createElement("div")
        badge.classList.add("gog");
        element.append(badge);
    }
    if(store==3)
    {
         var badge=document.createElement("div")
        badge.classList.add("playstation");
        element.append(badge);
    }
    if(store==6)
    {
        var badge=document.createElement("div")
        badge.classList.add("nintendo");
        element.append(badge);
    }

}
function createGameContainer()
{
    var body= document.getElementById("showcase");
    var GameContainer=document.createElement("div")
    GameContainer.className="container"
    GameContainer.setAttribute("id","gamecontainer")
    GameContainer.classList.add("gamecontainer")
    body.append(GameContainer);
}
function creatGame(name,image,gameid)
{
    var Space=document.createElement('div');
    Space.classList.add("GameSpace");
    Space.className="GameSpace"
    var Img=document.createElement('div')
    Img.classList.add("GameImage")
    Img.style.backgroundImage="url("+image+")"
    var Name=document.createElement('div');
    Name.classList.add("GameName");
    Name.textContent=name
    Space.append(Img);
    Space.append(Name);
    var element=document.getElementById("gamecontainer");
    element.append(Space);
    $.ajax({
        type: 'GET',
        url: "https://api.rawg.io/api/games/"+gameid+"/stores?key=2d150e2f5c964e6992d048af8ef065f7",
        success:function (result){
            for(var j=0;j<result.results.length;j++)
            {createBadge(result.results[j].store_id,Img);}

        }
    });
}
function cleanGameContainer()
{
    let element = document.getElementById("gamecontainer");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    fetchGames("2")
}
function  createButton()
{
    var Button=document.createElement('button')
    Button.className="btn"
    Button.textContent="1966"
    Button.setAttribute("onclick","cleanGameContainer()")
    var container=document.getElementById("gamecontainer")
    container.append(Button)
}
document.body.onload=moveLinkContainer(),createGameContainer(),fetchGames("1"),createButton();
window.onresize=moveLinkContainer;

