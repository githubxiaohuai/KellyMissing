var allColor=[
        {
            name:"red",
            rgb:[255,0,0],
            kids:[]
        },
        {
            name:"yellow",
            rgb:[255,255,0],
            kids:[]
        },
        {
            name:"blue",
            rgb:[0,0,255],
            kids:[]
        },
        {
            name:"orange",
            rgb:[255,128,0],
            kids:[0,1]
        },
        {
            name:"purple",
            rgb:[128,0,128],
            kids:[0,2]
        },
        {
            name:"green",
            rgb:[0,169,51],
            kids:[1,2]
        },
        {
            name:"redorange",
            rgb:[255,65,0],
            kids:[0,3]
        },
        {
            name:"bluepurple",
            rgb:[64,71,147],
            kids:[2,4]
        },
        {
            name:"yellowgreen",
            rgb:[151,220,21],
            kids:[1,5]
        },
        {
            name:"bluegreen",
            rgb:[33,112,131],
            kids:[2,5]
        },
        {
            name:"redpurple",
            rgb:[222,0,34],
            kids:[0,4]
        },
        {
            name:"yelloworange",
            rgb:[255,193,0],
            kids:[1,3]
        }
];

var ownedCor=[];
var BossCor=[];//幸运色（任务色）到这两种发光颜色的房间就可以得到点灯机会

var colorfulnumber=0;//彩色碎片的数量
function initMixInterface(){
    var options=document.getElementById('options');
    var ulops=options.getElementsByTagName('ul')[0];
    var liops=ulops.getElementsByTagName('li');
    ulops.innerHTML="";
    for (var i = 0; i < 16; i++) {
        var linode=document.createElement('li');
        linode.ondrop=dropAndMix;
        linode.ondragover=allowDrop;
        ulops.appendChild(linode);
    };
    for (var i = 0; i < ownedCor.length; i++) {

        var newnode=document.createElement("div");
        newnode.draggable=true;
        newnode.id="cor"+i;
        newnode.className="corBlock2";
        newnode.ondragstart=drag;
        newnode.rgb=ownedCor[i].rgb;
        newnode.name=ownedCor[i].name;
        newnode.kids=ownedCor[i].kids;
        liops[i].appendChild(newnode);
        newnode.style.background="rgb("+ownedCor[i].rgb[0]+","+ownedCor[i].rgb[1]+","+ownedCor[i].rgb[2]+") url('./img/prop/black.png')";
        newnode.style.backgroundSize="80px";
    };
}

//混合函数
function mixCorfunc(rgb1,rgb2){
    //rgb转成ryb
    var arr_ryb1=rgb2ryb(rgb1);
    var arr_ryb2=rgb2ryb(rgb2);

    //转成ryb的16进制格式
    var ryb1 = "#" + ((1 << 24) + (arr_ryb1[0] << 16) + (arr_ryb1[1] << 8) + arr_ryb1[2]).toString(16).slice(1);
    var ryb2 = "#" + ((1 << 24) + (arr_ryb2[0] << 16) + (arr_ryb2[1] << 8) + arr_ryb2[2]).toString(16).slice(1);


    //传入ryb的两种颜色，生产rgb的结果
    var result={isOK:false};
    result.bg="#"+rybColorMixer.mix([ryb1,ryb2], {result: "rgb" });
    var arrRes=rybColorMixer.mix([ryb1,ryb2], { hex: false,result: "rgb" });
    for (var i = 0; i < allColor.length; i++) {
        if(allColor[i].rgb.toString()==arrRes.toString()){
            //生成的颜色存在于门色中的一个就可以合成
            result.isOK=true;
            result.name=allColor[i].name;
            result.kids=allColor[i].kids.concat();
        }
    };
    result.rgb=arrRes;
    //同种颜色不给合成的处理
    if(ryb1==ryb2)
    {
        result.isOK=false;
    }
    return result;
}


//混合放下颜色操作函数
function dropAndMix(ev){
    ev.preventDefault();

    var data=ev.dataTransfer.getData("Text");
    if(!document.getElementById(data)){return;}
    var oldBlock=document.getElementById(data).parentNode;
    var replacedColor;
    if(ev.target.nodeName=="LI")
    {
        //并没有颜色占领格子
        ev.target.appendChild(document.getElementById(data));
    }else{
        //已经有颜色占领格子
        ev.target.parentNode.replaceChild(document.getElementById(data),ev.target);
        replacedColor=ev.target;
        oldBlock.appendChild(replacedColor);
    }

    var operation=document.getElementById('operation');
    var ulope=operation.getElementsByTagName('ul')[0];
    var liope=ulope.getElementsByTagName('li');
    var rescolor=document.getElementById('rescolor');
    var ulops=options.getElementsByTagName('ul')[0];
    var liops=ulops.getElementsByTagName('li');

    //两个格子都有颜料就进行混合
    if(liope[0].innerHTML&&liope[1].innerHTML)
    {
        var result=mixCorfunc(liope[0].firstChild.rgb,liope[1].firstChild.rgb);
        rescolor.style.background="rgb("+result.rgb[0]+","+result.rgb[1]+","+result.rgb[2]+") url('./img/prop/black.png')";
        rescolor.style.backgroundSize="80px";
        //表示颜色是门色，可以合成
        if(result.isOK)
        {
            var errormess=document.getElementById('errormess');
            errormess.style.display="none";
            var mixbtn=document.getElementById('mixbtn');
            mixbtn.disabled=false;
            mixbtn.onclick=function(){
                //合成格子先清空
                liope[0].innerHTML=liope[1].innerHTML="";
                rescolor.style.background="none";
                ownedCor=[];
                ownedCor.push({name:result.name,rgb:result.rgb,kids:result.kids});
                for (var i = 0; i < liops.length; i++) {
                    if(liops[i].innerHTML){
                        ownedCor.push({name:liops[i].firstChild.name,rgb:liops[i].firstChild.rgb,kids:liops[i].firstChild.kids});
                    }
                };
                updatebag();
                var mixfinish=document.getElementById('mixfinish');
                var btn=mixfinish.getElementsByTagName('button')[0];
                mixfinish.style.display="block";
                btn.onclick=function(){
                    mixfinish.style.display="none";
                    mixInterface.style.display="none";
                    mix.style.display="none";
                    controls.enabled=true;
                    element.requestPointerLock();
                };
            };
        }else{
            var mixbtn=document.getElementById('mixbtn');
            mixbtn.disabled=true;
            var errormess=document.getElementById('errormess');
            errormess.style.display="block";
        }
    }else{
        rescolor.style.background="";
        var errormess=document.getElementById('errormess');
            errormess.style.display="none";
    }
}




function initSpInterface(){
    var options2=document.getElementById('options2');
    var ulops2=options2.getElementsByTagName('ul')[0];
    var liops2=ulops2.getElementsByTagName('li');
    ulops2.innerHTML="";
    for (var i = 0; i < 16; i++) {
        var linode=document.createElement('li');
        linode.ondrop=dropAndSp;
        linode.ondragover=allowDrop;
        ulops2.appendChild(linode);
    };
    for (var i = 0; i < ownedCor.length; i++) {

        var newnode=document.createElement("div");
        newnode.draggable=true;
        newnode.id="corcor"+i;
        newnode.className="corBlock2";
        newnode.ondragstart=drag;
        newnode.rgb=ownedCor[i].rgb;
        newnode.name=ownedCor[i].name;
        newnode.kids=ownedCor[i].kids.concat();
        liops2[i].appendChild(newnode);
        newnode.style.background="rgb("+ownedCor[i].rgb[0]+","+ownedCor[i].rgb[1]+","+ownedCor[i].rgb[2]+") url('./img/prop/black.png')";
        newnode.style.backgroundSize="80px";
    };
}


//分解颜色放下操作函数
function dropAndSp(ev){
    ev.preventDefault();

    var data=ev.dataTransfer.getData("Text");
    if(!document.getElementById(data)){return;}
    var oldBlock=document.getElementById(data).parentNode;
    var replacedColor;
    if(ev.target.nodeName=="LI")
    {
        //并没有颜色占领格子
        ev.target.appendChild(document.getElementById(data));
    }else{
        //已经有颜色占领格子
        ev.target.parentNode.replaceChild(document.getElementById(data),ev.target);
        replacedColor=ev.target;
        oldBlock.appendChild(replacedColor);
    }

    var spcolor=document.getElementById('spcolor');
    var errormess2=document.getElementById('errormess2');
    var sp_operation=document.getElementById('sp_operation');
    var separatebtn=document.getElementById('separatebtn');
    var rescor=sp_operation.getElementsByTagName('span');
    //格子有颜料
    if(spcolor.innerHTML)
    {

        if(spcolor.firstChild.kids.length==0){
            //不可分解
            separatebtn.disabled=true;
            errormess2.style.display="block";
            rescor[0].style.background="none";
            rescor[1].style.background="none";
        }else{
            separatebtn.disabled=false;
            var rescor=sp_operation.getElementsByTagName('span');
            errormess2.style.display="none";
            var cor1=allColor[spcolor.firstChild.kids[0]];
            var cor2=allColor[spcolor.firstChild.kids[1]];

            rescor[0].style.background="rgb("+cor1.rgb[0]+","+cor1.rgb[1]+","+cor1.rgb[2]+") url('./img/prop/black.png')";
            rescor[1].style.background="rgb("+cor2.rgb[0]+","+cor2.rgb[1]+","+cor2.rgb[2]+") url('./img/prop/black.png')";
            rescor[0].style.backgroundSize="80px";
            rescor[1].style.backgroundSize="80px";

            separatebtn.onclick=function(){
                //分解格子先清空
                spcolor.innerHTML="";
                rescor[0].style.background="none";
                rescor[1].style.background="none";
                ownedCor=[];
                ownedCor.push(cor1);
                ownedCor.push(cor2);
                var options2=document.getElementById('options2');
                var ulops2=options2.getElementsByTagName('ul')[0];
                var liops2=ulops2.getElementsByTagName('li');
                for (var i = 0; i < liops2.length; i++) {
                     if(liops2[i].innerHTML){
                        ownedCor.push({name:liops2[i].firstChild.name,rgb:liops2[i].firstChild.rgb,kids:liops2[i].firstChild.kids});
                    }
                };
                updatebag();
                var separatefinish=document.getElementById('separatefinish');
                var btn=separatefinish.getElementsByTagName('button')[0];
                separatefinish.style.display="block";
                btn.onclick=function(){
                    separatefinish.style.display="none";
                    separateInterface.style.display="none";
                    separate.style.display="none";
                    controls.enabled=true;
                    element.requestPointerLock();
                };
            }
        }
    }else{

        rescor[0].style.background="none";
        rescor[1].style.background="none";
        var errormess2=document.getElementById('errormess2');
            errormess2.style.display="none";
    }

}

//每当更新ownedCor就应该更新背包
function updatebag(){
    var ulprop=propInterface.getElementsByTagName('ul')[0];
    var liprop=ulprop.getElementsByTagName('li');
    for (var i = 0; i < liprop.length; i++) {
        //先清空
        liprop[i].style.background="none";
    };
    for (var k = 0; k < ownedCor.length; k++) {
        liprop[k].style.background="rgb("+ownedCor[k].rgb[0]+","+ownedCor[k].rgb[1]+","+ownedCor[k].rgb[2]+") url('./img/prop/black.png')";
        liprop[k].style.backgroundSize="80px";
    };
}