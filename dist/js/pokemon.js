function handleErrors(e){if(!e.ok)throw Error(e.statusText);return e.json()}function findEnglish(e,n){return"en"!==n.flavor_text_entries[e].language.name?findEnglish(++e,n):e}console.log("pokemon page connected",window.location.href),document.addEventListener("DOMContentLoaded",function(){const e=window.location.href,n=e.indexOf("#"),t=e.substring(n+1);fetch(`https://pokeapi.co/api/v2/pokemon/${t}`).then(e=>(console.log(e),e.json())).then(e=>{const n=e.name;document.getElementsByClassName("pokemon-name")[0].innerHTML=n}),fetch(`https://pokeapi.co/api/v2/characteristic/${t}/`).then(handleErrors).then(e=>{const n=e.descriptions,t=n[n.length-1].description;document.getElementsByClassName("description")[0].innerHTML=t}).catch(e=>console.log(e)),fetch(`https://pokeapi.co/api/v2/pokemon-species/${t}/`).then(e=>e.json()).then(e=>{const n=findEnglish(0,e),t=e.flavor_text_entries[n].flavor_text;document.getElementsByClassName("abilities")[0].innerHTML=t}),fetch(`https://pokeapi.co/api/v2/pokemon/${t}/`).then(handleErrors).then(e=>{console.log("pokemon images",e);let n={...e.sprites};delete n.other&&delete n.versions;const t=Object.entries(n);console.log("all Pokemon Images",t);let o=[];const c=t.filter(function(e){return null!==e[1]});if(c.length>2&&c.length/2){const e=c.slice(0,c.length/2);o=[...c.slice(c.length/2),...e]}else o=[...c];o.forEach(function(e){const n=document.createElement("div"),t=document.createElement("img");t.src=e[1];let o=e[0].replace(/_/g," ");o=o.replace(/female/g,"&#9792;");const c=document.createElement("p");c.innerHTML=o,n.appendChild(t),n.appendChild(c),document.getElementById("pokemon-image").appendChild(n)})}).catch(e=>console.log(e));const o=parseInt(t),c=document.createElement("button"),i=document.createElement("button"),l=window.location.href.slice(0,n+1),s=807===o?1:o+1,a=1===o?807:o-1;i.addEventListener("click",function(){window.location.href=`${l}${a}`,location.reload()}),c.addEventListener("click",function(){window.location.href=`${l}${s}`,location.reload()}),i.innerHTML="prev",c.innerHTML="next",document.getElementsByClassName("prev-button")[0].appendChild(i),document.getElementsByClassName("next-button")[0].appendChild(c)});