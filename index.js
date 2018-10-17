var wrapper = document.getElementsByClassName('wrapper')[0];
var go = document.getElementById('go');
var main = document.getElementById('main');
var result = document.getElementById('result');
var defen = document.getElementById('defen');
var replay = document.getElementById('replay');
var speed = 0.05;
var timer = null;
var num = 0;
var rem = document.documentElement.scrollWidth/400*100;

wrapper.style.height = document.documentElement.scrollHeight/rem + 'rem'


function clickStart(){
    go.addEventListener('click',function(){
        go.style.display = 'none';
        cDiv();
        cDiv();
        cDiv();
        move();
        bindEvent();
    },false)
}
clickStart();


function move(){
    timer = setInterval(function(){
        var offsetTop = main.offsetTop/rem;
        main.style.top = offsetTop + speed + 'rem';
        if(offsetTop >= 0){
            main.style.top = offsetTop - 1.5 + 'rem';
            cDiv();
        }
        console.log(main.style.top)
    },20)
}

function cDiv(){
    var nDiv = document.createElement('div');
    nDiv.setAttribute('class','row');
    for (let i = 0; i < 4; i++) {
        var iDiv = document.createElement('div')
        nDiv.appendChild(iDiv);
    }
    var index = Math.floor(Math.random()*4)
    if (main.childNodes.length == 0) {
        main.appendChild(nDiv);
    } else {
        main.insertBefore(nDiv, main.childNodes[0])
    }
    for (let i = 0; i < 4; i++) {
        var $t = main.childNodes[0].childNodes[i];
        if (i == index) {
            $t.setAttribute('class', 'b');
        }else{
            $t.setAttribute('class', 'w')
        }
    }
    if(main.childNodes.length > 6){
        var last = main.lastChild;
        var li = last.childNodes;
        console.log(li)
        for (let i = 0; i < 4; i++) {
            if(li[i].classList.contains('b')){
                clearInterval(timer);
                defen.innerText = num + '分';
                main.style.display = 'none';
                result.style.display = 'block';
            }
        }
        main.removeChild(last);
        speed+=0.001;
        console.log(speed);
    }
}

function bindEvent(){
    main.addEventListener('click',function(e){
        if(e.target.classList.contains('w')){
            clearInterval(timer);
            defen.innerText = num + '分';
            main.style.display = 'none';
            result.style.display = 'block';
        }else if(e.target.classList.contains('b')){
            e.target.classList.remove('b');
            e.target.classList.add('m');
            num++;
            // console.log(e.target.classList.remove)
        }
    })
}

replay.addEventListener('click',function(){
    main.innerHTML = '';
    main.style.top = '-7.5rem';
    cDiv();
    cDiv();
    cDiv();
    move();
    bindEvent();
    num = 0;
    result.style.display = 'none';
    main.style.display = 'block';
},false)