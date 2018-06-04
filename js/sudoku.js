var sudokuGameIsPass=false;
var curChoice=0;//选择色
var corArr=['white','red','green','blue','yellow','orange','purple','cyan','magenta','#007f7f'];
var tempcorArr=[];

var arrXxX=[];

var arr4x4=[
                [2,0,0,0],
                [0,1,0,0],
                [3,0,0,0],
                [0,2,3,0]
            ];
var arr9x9=[
                [0,7,0,8,0,0,0,0,0],
                [0,0,3,0,0,0,4,0,0],
                [0,0,0,7,0,0,0,0,5],
                [8,0,0,9,0,0,0,0,0],
                [0,0,4,0,0,0,3,1,0],
                [0,0,0,0,0,0,6,0,0],
                [9,0,0,0,0,0,0,0,8],
                [0,0,6,0,0,1,0,0,0],
                [0,0,0,0,0,3,0,0,0]
            ];
// var arr9x9=[
//                 [4,7,5,8,6,2,1,9,3],
//                 [2,8,3,1,5,9,4,7,6],
//                 [6,1,9,7,3,4,8,2,5],
//                 [8,3,2,9,1,6,7,5,4],
//                 [5,6,4,2,7,8,3,1,9],
//                 [1,9,7,3,4,5,6,8,2],
//                 [9,4,1,6,2,7,5,3,8],
//                 [3,2,6,5,8,1,9,4,7],
//                 [7,5,8,4,9,3,2,6,0]
//             ];

function initSudoku(){

    var sudoku=document.getElementById('sudoku');
    var sudokuGamePage=document.getElementById('sudokuGamePage');
    var difficulty=document.getElementById('difficulty');
    var ulGrade=sudoku.getElementsByTagName('ul')[0];
    var aGrade=ulGrade.getElementsByTagName('a');
    var perNum;

    difficulty.onclick=function(){
        //选择了“难度”，为简单的4X4颜色数独
        sudoku.style.display="none";
        sudokuGamePage.style.display="block";
        tempcorArr=corArr.slice(0,5);
        creatLockCor();
        perNum=4;
        for (var i = 0; i < perNum; i++) {
            arrXxX[i]=arr4x4[i].concat();
        };
        creatPanel(perNum,arr4x4);
        lockColor(perNum);
        clickCor(perNum,curChoice);
    }

    for (var i = 0; i < aGrade.length; i++) {
        aGrade[i].onclick=function(){
            //选择了任何一个难度，为9X9的颜色数独
            sudoku.style.display="none";
            sudokuGamePage.style.display="block";
            tempcorArr=corArr.concat();
            creatLockCor();
            perNum=9;
            //二维数组的复制需要对每个一维数组赋值才能不改变原数组
            for (var l = 0; l < perNum; l++) {
                arrXxX[l]=arr9x9[l].concat();
            };
            creatPanel(perNum,arr9x9);
            lockColor(perNum);
            clickCor(perNum,curChoice);
        }
    };

    var controlBtn=document.getElementById('control-btn');
    var arrCtrlBtn=controlBtn.getElementsByTagName('button');
    //重置按钮
    arrCtrlBtn[0].onclick=function(){
        if(perNum==4){
            creatPanel(perNum,arr4x4);
            clickCor(perNum,curChoice);
        }else if(perNum==9){
            creatPanel(perNum,arr9x9);
            clickCor(perNum,curChoice);
        }

    }
    //退出按钮
    arrCtrlBtn[1].onclick=function(){
                sudokuBGlayer.style.display="none";
                sudokuGamePage.style.display="none";
                sudoku.style.display="none";
                controls.enabled=true;
                element.requestPointerLock();

    }

    var farewell=document.getElementById('farewell');
    farewell.addEventListener('click',function(e){
                sudokuBGlayer.style.display="none";
                sudokuGamePage.style.display="none";
                sudoku.style.display="none";
                controls.enabled=true;
                element.requestPointerLock();
            });
}

function creatLockCor(){

    var ulCorlorLock=document.getElementById('CorlorLock').getElementsByTagName('ul')[0];
    ulCorlorLock.innerHTML="";
    for (var i = 0; i < tempcorArr.length; i++) {
        var linode=document.createElement('li');
        linode.style.background=tempcorArr[(i+1)%tempcorArr.length];
        ulCorlorLock.appendChild(linode);
    };

}

function creatPanel(perNum,arr){
    var panel=document.getElementById('panel');
    var taPanel=panel.getElementsByTagName('table')[0];
    taPanel.innerHTML="";
    for (var i = 0; i < perNum; i++) {
        var tr=document.createElement('tr');
        for (var j = 0; j < perNum; j++) {
            var td=document.createElement('td');
            td.canchange=true;
            td._id=0;
            //加边框
            if(j%Math.sqrt(perNum)==0)
            {
                td.style.borderLeft="#FFF 3px solid";
            }
            //判断是否为已知颜色
            if(arr[i][j]!=0)
            {
                td.style.background=corArr[arr[i][j]];
                td.style.position="relative";
                //加个标记，不可被修改颜色
                td.canchange=false;
                var divnode=document.createElement('div');
                divnode.className="lockIcon";
                td.appendChild(divnode);
            }
            tr.appendChild(td);
        };
        if(i%Math.sqrt(perNum)==0)
        {
            tr.style.borderTop="#FFF 3px solid";
        }
        taPanel.appendChild(tr);
    };


}

//锁定颜色
function lockColor(perNum){
    var ulCorlorLock=document.getElementById('CorlorLock').getElementsByTagName('ul')[0];
    var liCorlorLock=ulCorlorLock.getElementsByTagName('li');
    liCorlorLock[liCorlorLock.length-1].style.border="4px solid #141214";
    for (var i = 0; i < liCorlorLock.length; i++) {
        liCorlorLock[i]._id=(i+1)%(perNum+1);
        liCorlorLock[i].onclick=function(){
            //先全部清除边框
            for(var j = 0; j < liCorlorLock.length; j++) {
                liCorlorLock[j].style.border="none";
            }
            //当前的添加选中边框
            this.style.border="4px solid #141214";
            curChoice=this._id;
        }
    };
}


//点击事件
function clickCor(perNum){

    var panel=document.getElementById('panel');
    var taPanel=panel.getElementsByTagName('table')[0];
    var tdPanel=taPanel.getElementsByTagName('td');
    for (var k = 0; k < tdPanel.length; k++) {
        (function(arg){
            tdPanel[k].onclick=function(){
                //如果是已知颜色就直接退出函数即可
                if(this.canchange==false)
                {
                    return;
                }
                if(curChoice==0)
                {
                    this.style.background="none";
                     arrXxX[Math.floor(arg/perNum)][arg%perNum]=0;
                }else{
                    this.style.background=corArr[curChoice];
                    // console.log(Math.floor(arg/perNum)+","+arg%perNum);
                    arrXxX[Math.floor(arg/perNum)][arg%perNum]=curChoice;
                }
                //检查游戏是否通关
                if(checkOK(perNum)){
                    var spanly=luckyColor.getElementsByTagName('span');
                    var ranindex1=Math.floor(Math.random()*3);
                    var ranindex2=Math.floor(Math.random()*3)+6;
                    BossCor.push(allColor[ranindex1]);
                    BossCor.push(allColor[ranindex2]);
                    spanly[0].innerHTML=allColor[ranindex1].name;
                    spanly[1].innerHTML=allColor[ranindex2].name;
                    spanly[0].style.color="rgb("+allColor[ranindex1].rgb[0]+","+allColor[ranindex1].rgb[1]+","+allColor[ranindex1].rgb[2]+")";
                    spanly[1].style.color="rgb("+allColor[ranindex2].rgb[0]+","+allColor[ranindex2].rgb[1]+","+allColor[ranindex2].rgb[2]+")";
                    sudokuGameIsPass=true;
                    sudokuGamePage.style.display="none";
                    sudoku.style.display="none";
                    var colorfulNum=document.getElementById('colorfulNum');
                    colorfulNum.style.display="block";
                    colorfulNum.innerHTML="彩色碎片 x "+colorfulnumber;
                    taskcontent.innerHTML=bgstory+"</br></br>当前任务：收集两片彩色碎片就可以释放地球的颜色！幸运色?究竟是房门的颜色？还是房间内的颜色?</br>*温馨：大厅左侧有合成颜料区，右侧有分解颜料区。";
                    luckyColor.style.display="block";
                    luckyColor.getElementsByTagName('button')[0].onclick=function(){
                        if(colorfulnumber==2)
                        {
                            luckyColor.style.display="none";
                            sudokuBGlayer.style.display="none";
                            //游戏结束
                            gameover=true;
                            controls.enabled=true;
                            element.requestPointerLock();
                        }else{
                            luckyColor.style.display="none";
                            sudokuBGlayer.style.display="none";
                            var colorMess=document.getElementById('colorMess');
                            colorMess.style.display="block";
                            setTimeout(function(){
                                colorMess.style.display="none";
                            }, 1000 );
                            controls.enabled=true;
                            element.requestPointerLock();
                        }

                    }
                    luckyColor.getElementsByTagName('button')[1].onclick=function(){
                        luckyColor.style.display="none"
                        sudokuBGlayer.style.display="none";
                        controls.enabled=true;
                        element.requestPointerLock();
                    }
                }
            }
        })(k);
    };
}


function checkOK(perNum){


    //存在格子没有填色就不用检查了
    for (var i = 0; i < perNum; i++) {
        for (var j = 0; j < perNum; j++) {
            if(arrXxX[i][j]==0)
            {
                return false;
            }
        };
     };
     for (var m = 0; m < perNum; m++) {
        for (var n = 0; n < perNum; n++) {
            if(!(checkRow(m,n,perNum) && checkCol(m,n,perNum) && checkArea(m,n,perNum)))
            {
                //存在一个不满足条件就不行
                return false;
            }
        };
     };
     return true;
}

//检查横冲突
function checkRow(r,c,perNum)
{
    for (var i = 0; i < perNum; i++)
    {
        if(i == c)
        {
            continue;//同一个格子跳过
        }
        if (arrXxX[r][i] == arrXxX[r][c])
        {
            return false;//冲突
        }
    }
    return true;//没有冲突
}

//检查列冲突
function checkCol(r,c,perNum)
{
    for (var i = 0; i < perNum; i++)
    {
        if(i == r)
        {
            continue;//同一个格子跳过
        }
        if (arrXxX[i][c] == arrXxX[r][c])
        {
            return false;//冲突
        }
    }
    return true;//没有冲突
}

//检测小块宫格冲突
function checkArea(r,c,perNum)
{
    var n=Math.sqrt(perNum);
    var left = Math.floor(r/n)*n;
    var top = Math.floor(c/n)*n;
    for (var i = left; i < left+n; i++)
    {
        for (var j = top; j < top+n; j++)
        {
            if (i == r && j == c)
            {
                continue;//同一个格子跳过
            }
            if (arrXxX[i][j] == arrXxX[r][c])
            {
                return false;//冲突
            }
        }
    }
    return true;//没有冲突
}