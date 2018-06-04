
 var PointerLockControls = function ( camera, cannonBody ) {

    // var eyeYPos = 2; // eyes are 2 meters above the ground
    var velocityFactor = 0.2;
    var jumpVelocity = 10;
    var scope = this;

    var pitchObject = new THREE.Object3D();
    pitchObject.add( camera ); // camera is parameter
    var yawObject = new THREE.Object3D();
    yawObject.position.y = 20;
    yawObject.add( pitchObject );


    var quat = new THREE.Quaternion();

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var canJump = false;

    var contactNormal = new CANNON.Vec3(); // Normal in the contact, pointing *out* of whatever the player touched
    var upAxis = new CANNON.Vec3(0,1,0);
    cannonBody.addEventListener("collide",function(e){
        var contact = e.contact;
        // console.log(e);
        // contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
        // We do not yet know which one is which! Let's check.
        if(contact.bi.id == cannonBody.id){ // bi is the player body, flip the contact normal
            contact.ni.negate(contactNormal);
             // console.log(contact.bj);//bj是被撞物体，可以拿到其ID
            if(arrDoorId.indexOf(contact.bj.id)!=-1)
            {
                // console.log(arrDoorId.indexOf(contact.bj.id));
                //撞到门了
                EkeyMess.style.display="block";
            }
            if(contact.bj.id>=162&&contact.bj.id<=174)
            {
                // console.log(contact.bj);
                //与电脑交互
                RkeyMess.style.display="block";
                //定时器关闭提示
                clearTimeout();
                setTimeout(function(){
                    RkeyMess.style.display="none";
                }, 1000 );
            }
            // console.log(contact.bj.id);

        }else{
            contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is
             // console.log("contact.bi");
        }
        // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
        if(contactNormal.dot(upAxis) > 0.5) // Use a "good" threshold value between 0 and 1 here!
            canJump = true;
    });

    var velocity = cannonBody.velocity;
    // console.log(velocity);
    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {

        if ( scope.enabled === false ) return;

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
    };

    var openDoor=false;
    var openComp=false;
    // var areaDoor=false;
    var openPropbag=false;
    var openTaskbag=false;
    var fly=false;
    var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {
            case 66://b
                openPropbag=!openPropbag;
                break;

            case 81://q
                openTaskbag=!openTaskbag;
                break;

            case 69://e
                openDoor=true;
                break;

            case 82://r
                openComp=true;
                break;

            case 84://t
                fly=true;
                break;

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if ( canJump === true ){
                   /*const*/ velocity.y = jumpVelocity; /*cannonBody.velocity*/
                }
                canJump = false;
                break;
        }

    };

    var onKeyUp = function ( event ) {

        switch( event.keyCode ) {


            case 69://e
                openDoor=false;
                break;

            case 82://r
                openComp=false;
                break;

            case 84://t
                fly=false;
                break;

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // a
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    };

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false ); //asdw
    document.addEventListener( 'keyup', onKeyUp, false );// up right left down

    this.enabled = false;

    this.getObject = function () {
        return yawObject;
    };

    this.getDirection = function(targetVec){
        targetVec.set(0,0,-1);
        quat.multiplyVector3(targetVec);
    }


    this.CheckOwn=function(corname){
        var isOK=false;
        for (var i = 0; i < ownedCor.length; i++) {
            if(ownedCor[i].name==corname){
                isOK=true;
                break;
            }
        };
        return isOK;
    }

    this.CheckArea=function(pos){
        //绿门门口
        if(pos.z>=152&&pos.z<=157&&pos.x>=22&&pos.x<=25){
            doorMess.greenDoor.area=true;
            doorMess.greenDoor.isown=this.CheckOwn(doorMess.greenDoor.name);
            return doorMess.greenDoor;
        }
        //蓝绿色门口
        if(pos.z>=-37&&pos.z<=-29&&pos.x>=-120&&pos.x<=-116.5){
            doorMess.bluegreenDoor.area=true;
            doorMess.bluegreenDoor.isown=this.CheckOwn(doorMess.bluegreenDoor.name);
            return doorMess.bluegreenDoor;
        }
        //黄绿色门口
        if(pos.z>=-37&&pos.z<=-29&&pos.x>=-154&&pos.x<=-150.5){
            doorMess.yellowgreenDoor.area=true;
            doorMess.yellowgreenDoor.isown=this.CheckOwn(doorMess.yellowgreenDoor.name);
            return doorMess.yellowgreenDoor;
        }


        //紫色门口
        if(pos.z>=-70&&pos.z<=-67.5&&pos.x>=35&&pos.x<=43){
            doorMess.purpleDoor.area=true;
            doorMess.purpleDoor.isown=this.CheckOwn(doorMess.purpleDoor.name);
            return doorMess.purpleDoor;
        }
        //蓝紫色门口
        if(pos.z>=-70&&pos.z<=-67.5&&pos.x>=0&&pos.x<=7){
            doorMess.bluepurpleDoor.area=true;
            doorMess.bluepurpleDoor.isown=this.CheckOwn(doorMess.bluepurpleDoor.name);
            return doorMess.bluepurpleDoor;
        }
        //红紫色门口
        if(pos.z>=-37&&pos.z<=-33&&pos.x>=0&&pos.x<=7){
            doorMess.redpurpleDoor.area=true;
            doorMess.redpurpleDoor.isown=this.CheckOwn(doorMess.redpurpleDoor.name);
            return doorMess.redpurpleDoor;
        }
        //橙色门口
        if(pos.z>=112&&pos.z<=116&&pos.x>=-180&&pos.x<=-172){
            doorMess.orangeDoor.area=true;
            doorMess.orangeDoor.isown=this.CheckOwn(doorMess.orangeDoor.name);
            return doorMess.orangeDoor;
        }
        //红橙色门口
        if(pos.z>=112&&pos.z<=116&&pos.x>=-214&&pos.x<=-207){
            doorMess.redorangeDoor.area=true;
            doorMess.redorangeDoor.isown=this.CheckOwn(doorMess.redorangeDoor.name);
            return doorMess.redorangeDoor;
        }
        //黄橙色门口
        if(pos.z>=78&&pos.z<=81.5&&pos.x>=-214&&pos.x<=-207){
            doorMess.yelloworangeDoor.area=true;
            doorMess.yelloworangeDoor.isown=this.CheckOwn(doorMess.yelloworangeDoor.name);
            return doorMess.yelloworangeDoor;
        }
    }


    this.CheckComp=function(pos){
        //绿门室内电脑
        if(pos.z>=156&&pos.z<=159.2&&pos.x>=7.78&&pos.x<=13.78){
            //返回紫色电脑
            return corComp.purpleComp;
        }
        //蓝绿色门室内电脑
        if(pos.z>=-35.43&&pos.z<=-32.43&&pos.x>=-109.52&&pos.x<=-103.52){
            return corComp.redComp;
        }
        //黄绿色门室内电脑
        if(pos.z>=-30.9&&pos.z<=-27.9&&pos.x>=-167.38&&pos.x<=-161.38){
            return corComp.redorangeComp;
        }
        //紫色门室内电脑
        if(pos.z>=-83.96&&pos.z<=-77.96&&pos.x>=35.58&&pos.x<=38.58){
            return corComp.orangeComp;
        }
        //蓝紫色门室内电脑
        if(pos.z>=-83.96&&pos.z<=-77.96&&pos.x>=0.87&&pos.x<=3.87){
            return corComp.yellowgreenComp;
        }
        //红紫色门室内电脑
        if(pos.z>=-26.74&&pos.z<=-20.74&&pos.x>=5.3&&pos.x<=8.3){
            return corComp.yellowComp;
        }
        //橙色门室内电脑
        if(pos.z>=123.59&&pos.z<=128.59&&pos.x>=-176.41&&pos.x<=-173.41){
            return corComp.greenComp;
        }
        //红橙色门室内电脑
        if(pos.z>=123.31&&pos.z<=128.31&&pos.x>=-211&&pos.x<=-208){
            return corComp.bluepurpleComp;
        }
        //黄橙色门室内电脑
        if(pos.z>=65.92&&pos.z<=71.92&&pos.x>=-215.51&&pos.x<=-211.51){
            return corComp.blueComp;
        }
    }


    this.creatKnowCor=function(rewardcor,luckyroom){

        if(this.CheckComp(yawObject.position).isPass==true){
            //已经通过了就直接给奖励界面
            var knowcorPass=document.getElementById('knowcorPass');
            var res=knowcorPass.getElementsByTagName('span')[0];
            res.innerHTML=rewardcor.name;
            res.style.color="rgb("+rewardcor.rgb[0]+","+rewardcor.rgb[1]+","+rewardcor.rgb[2]+")";
            knowcorPass.style.display="block";
            var passbtn=knowcorPass.getElementsByTagName('button')[0];
            passbtn.onclick=function(){
                knowcorPass.style.display="none";
                knowcor.style.display="none";
                controls.enabled=true;
                element.requestPointerLock();
            }
        }else{
            var that=this;
            var index=Math.floor(Math.random()*knowledge.length);
            var obj=knowledge[index];
            var title=knowcorPage.getElementsByTagName('h3')[0];
            var ulanswers=knowcorPage.getElementsByTagName('ul')[0];
            ulanswers.innerHTML="";
            title.innerHTML=obj.que;
            for (var k = 0; k < obj.ans.length;k++) {
                var linode=document.createElement('li');
                linode.innerHTML=obj.ans[k];
                ulanswers.appendChild(linode);
            };
            var lianswers=ulanswers.getElementsByTagName('li');
            for (var l = 0; l < lianswers.length; l++) {
                (function(arg){
                    lianswers[l].onclick=function(){
                        if(arg==obj.right)
                        {
                            //选择了正确答案
                            this.style.color="green";
                            var knowcorPass=document.getElementById('knowcorPass');
                            var res=knowcorPass.getElementsByTagName('span')[0];
                            res.innerHTML=rewardcor.name;
                            res.style.color="rgb("+rewardcor.rgb[0]+","+rewardcor.rgb[1]+","+rewardcor.rgb[2]+")";
                            ownedCor.push(rewardcor);
                            updatebag();
                            knowcorPass.style.display="block";
                            var passbtn=knowcorPass.getElementsByTagName('button')[0];
                            passbtn.onclick=function(){

                                that.CheckComp(yawObject.position).isPass=true;
                                //加个新的界面，可以实现一个任务
                                if(luckyroom==true)
                                {
                                    colorfulnumber++;
                                    var colorfulNum=document.getElementById('colorfulNum');
                                    colorfulNum.innerHTML="彩色碎片 x "+colorfulnumber;
                                    var daoju=document.getElementById('daoju');
                                    daoju.style.display="block";
                                    var djbtn=daoju.getElementsByTagName('button')[0];
                                    djbtn.onclick=function(){
                                        daoju.style.display="none";
                                        knowcorPage.style.display="none";
                                        knowcorPass.style.display="none";
                                        knowcor.style.display="none";
                                        controls.enabled=true;
                                        element.requestPointerLock();
                                    }
                                }else{
                                    knowcorPage.style.display="none";
                                    knowcorPass.style.display="none";
                                    knowcor.style.display="none";
                                    controls.enabled=true;
                                    element.requestPointerLock();
                                }
                            }
                        }else{
                            //选择了错误答案
                            for (var i = 0; i < lianswers.length; i++) {
                                lianswers[i].onclick="";
                            };
                            this.style.color="red";
                            lianswers[obj.right].style.color="green";
                            var btn=document.createElement('button');
                            btn.id="again";
                            btn.innerHTML="重新挑战";
                            btn.onclick=function(){
                                that.creatKnowCor(rewardcor,luckyroom);
                            }
                            ulanswers.appendChild(btn);
                        }
                    }
                })(l)
            };
        }

    }

    // Moves the camera to the Cannon.js object position and adds velocity to the object if the run key is down
    var inputVelocity = new THREE.Vector3();
    var euler = new THREE.Euler();
    this.update = function ( delta ) {

        if ( scope.enabled === false ) return;

        delta *= 0.1;

        inputVelocity.set(0,0,0);

        if ( moveForward ){
            inputVelocity.z = -velocityFactor * delta;
        }
        if ( moveBackward ){
            inputVelocity.z = velocityFactor * delta;
        }

        if ( moveLeft ){
            inputVelocity.x = -velocityFactor * delta;
        }
        if ( moveRight ){
            inputVelocity.x = velocityFactor * delta;
        }

        if(fly)
        {
            sphereBody.position.set(-127.5,4,53.8);
        }

        if(gameover){
            BkeyProp.style.display="none";
            QkeyTask.style.display="none";
            colorfulNum.style.display="none";

            // cannonBody.position.y+=velocityFactor * delta*10;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener( 'keydown', onKeyDown);
            // camera.position.x=-100;
            // camera.position.y=200;
            // camera.position.z=-200;
            camera.lookAt(40,0,90);
            if(camera.position.x<-100)
            {
                camera.position.x+=velocityFactor * delta*10;
            }
            if(camera.position.y<200)
            {
                camera.position.y+=velocityFactor * delta*10;
            }else{
                if(group.children[1].material.opacity>0)
                {
                    group.children[1].material.opacity-=0.0015;
                    GameOver.style.display="block";
                }
            }
            if(camera.position.z>-200)
            {
                camera.position.z-=velocityFactor * delta*10;
            }
            group.rotation.y -= 0.001;
            // group.children[1].material.opacity=0;
        }

        // Convert velocity to world coordinates
        euler.x = pitchObject.rotation.x; //camera
        euler.y = yawObject.rotation.y; //camera object
        // console.log(euler);
        euler.order = "XYZ";
        quat.setFromEuler(euler);

        inputVelocity.applyQuaternion(quat);
        //quat.multiplyVector3(inputVelocity);

        // Add to the object
        velocity.x += inputVelocity.x;
        velocity.z += inputVelocity.z;

        yawObject.position.copy(cannonBody.position);
        // console.log(cannonBody.position);
        light.position.copy(cannonBody.position);
        if(this.CheckArea(yawObject.position)){
            // EkeyMess.style.display="block";放在撞到门才显示 解决门开了之后仍然提示的bug
            if(openDoor){
            // console.log("按了E");
            //按了E就检测是在哪个区域
            var obj=this.CheckArea(yawObject.position);
            //如果有道具
            if(obj.isown)
            {
                if(doorObj.children[obj.right].position[obj.direction]<=2)
                {
                    doorObj.children[obj.left].position[obj.direction]-=0.5;
                    doorObj.children[obj.right].position[obj.direction]+=0.5;
                }
                obj.wall.body.position.y=12;
            }else{
                var nocorMess=document.getElementById('nocorMess');
                nocorMess.style.display="block";
                setTimeout(function(){
                    nocorMess.style.display="none";
                }, 1000 );
            }
         }
        }else{
            EkeyMess.style.display="none";
        }

        if(openComp){
            openComp=false;

            var pos=yawObject.position;

            //起始电脑
            if(pos.z>=174&&pos.z<=178.2&&pos.x>=40.5&&pos.x<=45.5){
                //改变isESC,并非ESC导致的鼠标失控
               isESC=false;
               document.exitPointerLock();
                bglayer.style.display="block";
                GameInterface.style.display="block";
            }

            //总部设备
            if(pos.z>=52&&pos.z<=56&&pos.x>=-131&&pos.x<=-127){
                    isESC=false;
                    document.exitPointerLock();
                    sudokuBGlayer.style.display="block";
                if(sudokuGameIsPass)
                {//游戏通过一次了就不再显示了
                    luckyColor.style.display="block";
                }else{
                    sudoku.style.display="block";
                }
            }

            //总部左（合成颜料）
            if(pos.z>=40&&pos.z<=48.5&&pos.x>=-123&&pos.x<=-115)
            {
                isESC=false;
                document.exitPointerLock();
                mix.style.display="block";
                mixInterface.style.display="block";
                initMixInterface();
                console.log(ownedCor);

            }


            //总部右（分解颜料）
            if(pos.z>=60&&pos.z<=68.5&&pos.x>=-123&&pos.x<=-115)
            {
                isESC=false;
                document.exitPointerLock();
                separate.style.display="block";
                separateInterface.style.display="block";
                initSpInterface();
                console.log(ownedCor);
            }

            if(this.CheckComp(pos)){
                var luckyroom=false;
                if(BossCor[0].name==this.CheckComp(pos).name||BossCor[1].name==this.CheckComp(pos).name)
                {
                    //幸运色房间
                    luckyroom=true;
                }

                //本房间奖励的颜料
                var rewardcor={name:this.CheckComp(pos).name};
                for (var i = 0; i < allColor.length; i++) {
                    if(allColor[i].name==this.CheckComp(pos).name){
                        rewardcor.rgb=allColor[i].rgb.concat();
                        rewardcor.kids=allColor[i].kids.concat();
                        break;
                    }
                };
                isESC=false;
                document.exitPointerLock();

                this.creatKnowCor(rewardcor,luckyroom);
                knowcor.style.display="block";
                knowcorPage.style.display="block";

            }
        }

        //道具背包
        if(openPropbag)
        {
            prop.style.display="block";
            propInterface.style.display="block";
        }else{
            prop.style.display="none";
            propInterface.style.display="none";
        }
        //任务
        if(openTaskbag)
        {
            task.style.display="block";
            taskInterface.style.display="block";
        }else{
            task.style.display="none";
            taskInterface.style.display="none";
        }

    };
};
