const t = document.getElementById('pixelCanvas');
let td = document.getElementsByTagName('td');
const colorPicker = document.getElementById('colorPicker');

function clearTable() {
    if(t.hasChildNodes() === true){
        while(t.firstChild){
            t.removeChild(t.firstChild);
        }
    }
    };
function makeGrid(h,w) {
    for(let r=1; r<=h; r=r+1){
        var row = document.createElement("tr");
        for(let c=1; c<=w; c=c+1){
            let column = document.createElement("td");
            t.appendChild(row);
            row.appendChild(column);
            }
        }
    }; 

function colorGrid(){
    t.addEventListener('click',function(evt){
        evt.target.style.backgroundColor = colorPicker.value;
    });
 };

document.getElementById('submit').addEventListener('click', function(evt){
    clearTable();
    makeGrid(document.getElementById('inputHeight').value, document.getElementById('inputWeight').value);
    colorGrid();
}, true);

document.getElementById('clrBtn').addEventListener('click',function(){
    for(c = 0; c < td.length; c++){
        if(td[c].style !== 'undefined'){
            td[c].style.backgroundColor = '#ffffff'
        }
    }
},true);




