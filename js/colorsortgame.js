var arrCor1=[
                ["ff0000","bf0000","7f0000","400000","200000"],
                ["00ff00","00bf00","007f00","004000","002000"],
                ["0000ff","0000bf","00007f","000040","000020"],
                ["ffff00","bfbf00","7f7f00","404000","202000"],
                ["ff00ff","bf00bf","7f007f","400040","200020"],
                ["00ffff","00bfbf","007f7f","004040","002020"],
                ["ff0000","ff4040","ff7f7f","ffbfbf","ffdcdc"],
                ["060696","0000ff","4f4fff","8080ff","d3d3ff"],
                ["ffaf3d","ff9600","ae6905","714404","372101"]
            ];

var arrCor2=["ff0000","ff0040","ff007f","ff00bf",
               "ff00ff","bf00ff","7f00ff","4000ff",
               "0000ff","0040ff","007fff","00bfff",
               "00ffff","00ffbf","00ff7f","00ff40",
               "00ff00","40ff00","7fff00","bfff00",
               "ffff00","ffbf00","ff7f00","ff4000"];

var gamePass=1;//游戏关卡
var colorNum;//颜色数量


function initColorSort(){

    level.innerHTML="level "+gamePass;
    nextPass.style.color="white";
    nextPass.onclick="";

    var colorChoice=[];//记录了从颜色库中取出的颜色和排序id
    var tempcolorChoice=[];//用来随机分配颜色位置
    //清除所有颜色块
    for(var i=0;i<colorBarLi.length;i++)
    {
        colorBarLi[i].innerHTML="";
    }
   putBar.innerHTML="";
    //根据关卡数设置颜色的数量，提高难度
    if(gamePass<=3)
    {
        colorNum=4;
    }else if(gamePass>3&&gamePass<=6){
        colorNum=5;
    }else if(gamePass>6&&gamePass<=8){
        colorNum=6;
    }else if(gamePass>8&&gamePass<=10){
        colorNum=8;
    }

    if(colorNum<=5)
    {
        var index=Math.floor(Math.random()*arrCor1.length);
        var base_cor=arrCor1[index];
        base_cor=base_cor.slice(0,colorNum);
        for(var i=0;i<colorNum;i++)
        {
            var o={};
            o.cor=base_cor[i];
            o.id=i;
            colorChoice.push(o);
        }

    }else{
        var index=Math.floor(Math.random()*24);
        for(var i=0;i<colorNum;i++)
        {
            var o={};
            o.cor=arrCor2[(index+i)%24];
            o.id=i;
            colorChoice.push(o);
        }
    }

    tempcolorChoice=colorChoice.concat();//复制一份
    var fixed=Math.floor(Math.random()*colorNum);
    tempcolorChoice.splice(fixed,1);//随机取一个颜色直接固定在摆放条的相应位置
    //打乱数组顺序
    tempcolorChoice.sort(function() {
         return (0.5-Math.random());
    });

    //摆放条
    for(var i=0;i<colorChoice.length;i++){
        var newnode=document.createElement("li");
        if(i!=fixed)
        {
            newnode.ondrop=drop;
            newnode.ondragover=allowDrop;
        }else{
            var spannode=document.createElement("span");
            spannode.className="fixedBlock";
            spannode.innerHTML="√";
            var divnode=document.createElement("div");
             divnode.className="corBlock";
             divnode.style.background="#"+colorChoice[fixed].cor;
             divnode.style.position="relative";
             divnode.id="drag"+colorChoice[fixed].id;
             divnode.appendChild(spannode);
             newnode.appendChild(divnode);
        }
            putBar.appendChild(newnode);

    }
    //选择条
    for(var i=0;i<tempcolorChoice.length;i++)
    {
        var newnode=document.createElement("div");
        newnode.draggable=true;
        newnode.id="drag"+tempcolorChoice[i].id;
        newnode.className="corBlock";
        newnode.ondragstart=drag;
        colorBarLi[i].appendChild(newnode);
        newnode.style.background="#"+tempcolorChoice[i].cor;

    }

}


function allowDrop(ev)
{
    ev.preventDefault();
}

function drag(ev)
{
    ev.dataTransfer.setData("Text",ev.target.id);

}

function drop(ev)
{
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

    //放置一次就判断一次是否过关
    var putBarLiBlock=putBar.getElementsByTagName('div');
    var isOver;
    //li等于div说明每个li都有颜色块即填满putbar
    if(putBarLiBlock.length==putBarLi.length)
    {   isOver=true;
        for(var i=0;i<colorNum;i++){
            if(parseInt(putBarLiBlock[i].id.substr(-1,1))!=i)
            {
            //存在一个不相等即没过关
                    isOver=false;
            }
        }
        if(isOver)
        {
            //循环过后没有改变isOver说明过关
            // console.log("过关了");
            for(var i=0;i<putBarLiBlock.length;i++){
                putBarLiBlock[i].draggable=false;
                putBarLiBlock[i].ondragstart="";
            }
            nextPass.style.color="green";

            if(gamePass<10)
            {
                nextPass.onclick=function(){
                    gamePass++;
                    initColorSort();
                }
            }else{
               GamePage.innerHTML="";
               GamePage.style.height="190px";
               var node=document.createElement('div');
               node.innerHTML="任务已经完成";
               node.className="work";
               var anode=document.createElement('a');
               anode.innerHTML="离开";
               anode.className="work_exit";
               anode.onclick=function(){
                 GamePage.style.display="none";
                 bglayer.style.display="none";
                 controls.enabled=true;
                 element.requestPointerLock();
               }
               GamePage.appendChild(node);
               GamePage.appendChild(anode);
               GamePage.style.display="none";
               reward.style.display="block";
               reward.getElementsByTagName('button')[0].onclick=function(){
                    //添加道具
                    for(var k=0;k<3;k++)
                    {
                        ownedCor.push(allColor[k]);
                    }
                    updatebag();
                    reward.style.display="none";
                    bglayer.style.display="none";
                    controls.enabled=true;
                    element.requestPointerLock();
                    //开门
                    startDoor[0].position.x=-2;
                    startDoor[1].position.x=2;
                    startDoorWall.body.position.y=12;
                    //开灯
                    scene.add( light11 );
                    taskcontent.innerHTML=bgstory+"</br></br>当前任务：前往大厅，寻找幸运色。";
               }
            }

        }
    }

}
