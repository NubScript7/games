//destroy every tab,spaces,break,all indent if you can.That shitz cost a byte.
let select=prompt("pick the difficulty\n1 easy\n2 hard\n3 person vs. person");let diff=(select==1)?"easy":"hard";if(select=='3')diff='1v1';
const tiles=document.querySelectorAll(".tile");const sect=document.querySelector(".container");let playerType="X";let winner="none";let ended=false;
function end(){sect.remove(sect);const a=document.createElement("a");a.textContent="play again!";a.href="index.html";if(document.body.clientWidth>900)a.style.left=`${document.body.clientWidth*.5-95}px`;else a.style.left=`${document.body.clientWidth*.5-45}px`;const popup=document.createElement("main");popup.classList.add("pop");const div=document.createElement("div");const head=document.createElement("h1");const p=document.createElement("p");document.body.append(popup,a);popup.appendChild(div);div.append(head,p);head.textContent="winner";p.textContent=`player ${winner} won!`}
function mark(tile){playerType=(playerType=="X")?"O":"X";let p=document.createElement("p");tile.appendChild(p);p.textContent=playerType;tile.classList.add(playerType);tile.classList.add("occupied")}
if(diff=="hard")setTimeout(()=>mark(tiles[4]),500);tiles.forEach(a=>a.addEventListener("click",()=>{if(ended)return;if(a.classList.contains("occupied")){a.classList.add("warn");setTimeout(()=>a.classList.remove("warn"),500);return}mark(a);botmode(diff);}))
//winning patterns
let config=setInterval(()=>{
	let marked=0;
	tiles.forEach(tile=>{if(tile.classList.contains("occupied"))marked++});
//<>-----
checkTiles([0,1,2],["X","O"]);checkTiles([3,4,5],["X","O"]);checkTiles([6,7,8],["X","O"]);checkTiles([0,4,8],["X","O"]);checkTiles([2,4,6],["X","O"]);checkTiles([0,3,6],["X","O"]);checkTiles([1,4,7],["X","O"]);checkTiles([2,5,8],["X","O"]);
//-----<>
if(winner=="X"||winner=="O"||marked>=9){if(ended){clearInterval(config);return};ended=true;sect.classList.add("end");setTimeout(()=>end(),1000)}},10)
function botmode(difficulty){setTimeout(()=>{
if(ended)return;let marked=0;for(tile of tiles)if(tile.classList.contains("occupied"))marked++;if(marked>9)return;if(difficulty=="1v1")return;
//bot moves😎💃
if(difficulty=="easy"){let move=Math.floor(Math.random()*8+1);while(tiles[move].classList.contains("occupied"))move=Math.floor(Math.random()*8+1);mark(tiles[move])}
if(difficulty=="hard"){let a=[];let b=[];let c=[];
for(tile of tiles){if(tile.classList.contains("X"))c.push(true);else c.push(false);if(tile.classList.contains("O"))a.push(true);else a.push(false);if(tile.classList.contains("occupied"))b.push(true);else b.push(false)}
//patterns to calc next move
if(condition(tiles[0],tiles[3],tiles[6],"O"))return;if(condition(tiles[1],tiles[4],tiles[7],"O"))return;if(condition(tiles[2],tiles[5],tiles[8],"O"))return;if(condition(tiles[0],tiles[1],tiles[2],"O"))return;if(condition(tiles[3],tiles[4],tiles[5],"O"))return;if(condition(tiles[6],tiles[7],tiles[8],"O"))return;if(condition(tiles[0],tiles[4],tiles[8],"O"))return;if(condition(tiles[2],tiles[4],tiles[6],"O"))return;
//patterns for sides
if(c[5]&&b[3]!=true&&b[1]!=true&&b[7]!=true)return mark(tiles[1]);if(c[7]&&c[5]&&a[1]&&b[2]!=true&&b[6]!=true)return mark(tiles[2]);if(c[7]&&b[1]!=true&&b[3]!=true&&b[5]!=true)return mark(tiles[5]);if(c[3]&&c[7]&&a[5]&&b[2]!=true&&b[6]!=true)return mark(tiles[8]);if(c[3]&&b[1]!=true&&b[7]!=true&&b[5]!=true)return mark(tiles[7]);if(c[3]&&c[1]&&a[7]&&b[0]!=true&&b[8]!=true)return mark(tiles[6]);if(c[1]&&b[7]!=true&&b[3]!=true&&b[5]!=true)return mark(tiles[5]);if(c[3]&&c[1]&&a[5]&&b[0]!=true&&b[8]!=true)return mark(tiles[2]);
//patterns for corners
if(b[2]!=true&&b[6]!=true&&b[8]!=true&&b[0])mark(tiles[6]);if(b[0]!=true&&b[6]!=true&&b[8]!=true&&b[2])mark(tiles[0]);if(b[2]!=true&&b[0]!=true&&b[8]!=true&&b[6]&&c[3]!=true&&c[7]!=true)mark(tiles[8]);if(b[2]!=true&&b[6]!=true&&b[0]!=true&&b[8])mark(tiles[2]);if(condition(tiles[0],tiles[1],tiles[2],"X",true))return;if(condition(tiles[2],tiles[5],tiles[8],"X",true))return;if(condition(tiles[6],tiles[7],tiles[8],"X",true))return;if(condition(tiles[0],tiles[3],tiles[6],"X",true))return;if(b[0]&&b[6]&&b[3]!=true)return mark(tiles[3]);if(b[2]&&b[8]&&b[5]!=true)return mark(tiles[5]);if(b[0]&&b[2]&&b[1]!=true)return mark(tiles[1]);if(b[6]&&b[8]&&b[7]!=true)return mark(tiles[7])}},300)}
function condition(tile1,tile2,tile3,player,conf){let opponent=(player=="X")?"O":"X";if(conf)opponent=player;if(tile1.classList.contains(player)&&tile2.classList.contains(player)&&tile3.classList.contains("occupied")!=true&&playerType==opponent){mark(tile3);return true}if(tile2.classList.contains(player)&&tile3.classList.contains(player)&&tile1.classList.contains("occupied")!=true&&playerType==opponent){mark(tile1);return true}if(tile1.classList.contains(player)&&tile3.classList.contains(player)&&tile2.classList.contains("occupied")!=true&&playerType==opponent){mark(tile2);return true}};
function checkTiles([...num],[...player]){player.forEach(e=>{if(tiles[num[0]].classList.contains(e)&&tiles[num[1]].classList.contains(e)&&tiles[num[2]].classList.contains(e)){tiles[num[0]].classList.add("won");tiles[num[1]].classList.add("won");tiles[num[2]].classList.add("won");winner=e}})}
