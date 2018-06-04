// Add maze
function Obj3d (obj, shape, geometry) {
    this.shape = shape;
    this.geometry = geometry;
    this.body = new CANNON.Body({
        position:obj.position || {x:0, y:0, z:0},
        mass:obj.mass || 0,
        shape:this.shape,
        collisionFilterMask:1
    });
    var angle=obj.angle || {x:0,y:0,z:0};
    if(angle.x!=0) this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),angle.x);
    if(angle.y!=0) this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),angle.y);
    if(angle.z!=0) this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),angle.z);
    this.mesh = new THREE.Mesh(this.geometry, obj.material || new THREE.MeshPhongMaterial({side:THREE.DoubleSide}));
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    world.add(this.body);
    if (obj.parent) obj.parent.add(this.mesh);
    else scene.add(this.mesh);
    this.update = function () {
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
    this.update();
    if (obj.mass) objAry.push(this);
    if (obj.name) this.mesh.name = obj.name;
}
function Box (obj) {
    this.shape = new CANNON.Box(new CANNON.Vec3(obj.size.x/2, obj.size.y/2, obj.size.z/2));
    this.geometry = new THREE.BoxGeometry(obj.size.x, obj.size.y, obj.size.z);
    Obj3d.call(this, obj, this.shape, this.geometry);
}



function Wall(obj){

        this.body=new CANNON.Body({
                position:obj.position || {x:0, y:0, z:0},
                mass:obj.mass || 0,
                shape:new CANNON.Box(new CANNON.Vec3(obj.size.x/2, obj.size.y/2, obj.size.z/2)),
                collisionFilterMask:1
        });
        var angle=obj.angle || {x:0,y:0,z:0};
        if(angle.x!=0) this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),angle.x);
        if(angle.y!=0) this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),angle.y);
        if(angle.z!=0) this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),angle.z);
        world.add(this.body);
}

function initCollision(){
        new Wall({
                size:{x:34,y:8,z:1},
                position:{x:-17,y:4,z:-5.3}
        });
        new Wall({
                size:{x:34,y:8,z:1},
                position:{x:-17,y:4,z:12.3}
        });

        new Wall({
                size:{x:10,y:8,z:2},
                position:{x:-39,y:4,z:-2}
        });
        new Wall({
                size:{x:10,y:8,z:2},
                position:{x:-39,y:4,z:9}
        });

        new Wall({
                size:{x:15,y:8,z:3},
                position:{x:-51.5,y:4,z:-1.5}
        });
        new Wall({
                size:{x:15,y:8,z:3},
                position:{x:-51.5,y:4,z:8}
        });

        new Wall({
                size:{x:45,y:8,z:1},
                position:{x:-81,y:4,z:-2.35}
        });
        new Wall({
                size:{x:45,y:8,z:1},
                position:{x:-81,y:4,z:10}
        });

        new Wall({
                size:{x:27,y:8,z:2},
                position:{x:-118,y:4,z:-1.5}
        });
        new Wall({
                size:{x:49,y:8,z:2},
                position:{x:-129,y:4,z:7.5}
        });
        new Wall({
                size:{x:14,y:8,z:2},
                position:{x:-146,y:4,z:-1.5}
        });

        new Wall({
                size:{x:0.5,y:8,z:27},
                position:{x:-132,y:4,z:-14}
        });
        new Wall({
                size:{x:0.5,y:8,z:27},
                position:{x:-139,y:4,z:-14}
        });

        new Wall({
                size:{x:27,y:8,z:0.5},
                position:{x:-118,y:4,z:-28}
        });
        new Wall({
                size:{x:38,y:8,z:0.5},
                position:{x:-135,y:4,z:-35}
        });
        new Wall({
                size:{x:14,y:8,z:0.5},
                position:{x:-146,y:4,z:-28}
        });

        new Wall({
                size:{x:18,y:8,z:0.1},
                position:{x:-108,y:4,z:-28}
        });
        new Wall({
                size:{x:18,y:8,z:0.1},
                position:{x:-108,y:4,z:-36}
        });
        new Wall({
                size:{x:0.1,y:8,z:8},
                position:{x:-98,y:4,z:-32}
        });

        new Wall({
                size:{x:18,y:8,z:0.1},
                position:{x:-164,y:4,z:-28}
        });
        new Wall({
                size:{x:18,y:8,z:0.1},
                position:{x:-164,y:4,z:-36}
        });
        new Wall({
                size:{x:0.1,y:8,z:8},
                position:{x:-173,y:4,z:-32}
        });

        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-158,y:4,z:6.2},
                angle:{x:0,y:Math.PI/40,z:0}
        });
        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-166,y:4,z:9},
                angle:{x:0,y:Math.PI/6,z:0}
        });
        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-172,y:4,z:15.5},
                angle:{x:0,y:Math.PI/3,z:0}
        });
        new Wall({
                size:{x:0.1,y:8,z:8},
                position:{x:-174,y:4,z:23}
        });
        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-158,y:4,z:0},
                angle:{x:0,y:Math.PI/40,z:0}
        });
        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-166,y:4,z:1.5},
                angle:{x:0,y:Math.PI/10,z:0}
        });
        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-172,y:4,z:5},
                angle:{x:0,y:Math.PI/4,z:0}
        });
        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-178,y:4,z:12},
                angle:{x:0,y:Math.PI/3,z:0}
        });
        new Wall({
                size:{x:0.1,y:8,z:14},
                position:{x:-180.5,y:4,z:21}
        });

        new Wall({
                size:{x:8,y:8,z:4},
                position:{x:-185,y:4,z:30}
        });
        new Wall({
                size:{x:8,y:8,z:4},
                position:{x:-171,y:4,z:30}
        });

        new Wall({
                size:{x:0.1,y:8,z:19},
                position:{x:-189,y:4,z:39.5}
        });
        new Wall({
                size:{x:4,y:8,z:0.1},
                position:{x:-190,y:4,z:48}
        });
        new Wall({
                size:{x:0.1,y:8,z:12},
                position:{x:-192.5,y:4,z:54}
        });
        new Wall({
                size:{x:4,y:8,z:0.1},
                position:{x:-190,y:4,z:59}
        });
        new Wall({
                size:{x:0.1,y:8,z:17},
                position:{x:-189,y:4,z:68.5}
        });

        new Wall({
                size:{x:8,y:8,z:4},
                position:{x:-185,y:4,z:78}
        });
        new Wall({
                size:{x:8,y:8,z:4},
                position:{x:-171,y:4,z:78}
        });

        new Wall({
                size:{x:6,y:8,z:14},
                position:{x:-164,y:4,z:40}
        });
        new Wall({
                size:{x:14,y:8,z:4},
                position:{x:-155,y:4,z:49}
        });

        new Wall({
                size:{x:6,y:8,z:14},
                position:{x:-164,y:4,z:68}
        });
        new Wall({
                size:{x:14,y:8,z:4},
                position:{x:-155,y:4,z:59}
        });

        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-144,y:5.5,z:47},
                angle:{x:0,y:Math.PI/10,z:0}
        });
        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-137,y:5.5,z:42},
                angle:{x:0,y:Math.PI/4,z:0}
        });
        new Wall({
                size:{x:19,y:8,z:4},
                position:{x:-128,y:5.5,z:38.5}
        });
        new Wall({
                size:{x:10,y:0.1,z:5},
                position:{x:-128,y:2.3,z:43},
                angle:{x:0,y:0,z:Math.PI/14}
        });
        new Wall({
                size:{x:12,y:0.1,z:26},
                position:{x:-117,y:3.93,z:54}
        });
        new Wall({
                size:{x:0.1,y:8,z:26},
                position:{x:-117,y:3.93,z:54}
        });
        new Wall({
                size:{x:18,y:8,z:14},
                position:{x:-119,y:3.93,z:54}
        });

       //圆台
       var cylinderShape = new CANNON.Cylinder(7.5,7.5,2.82,32);
       var q = new CANNON.Quaternion();
        q.setFromAxisAngle(new CANNON.Vec3(1,0,0),Math.PI / 2);
        cylinderShape.transformAllPoints(new CANNON.Vec3(),q);
        world.addBody(
                new CANNON.Body({
                shape: cylinderShape,
                position: new CANNON.Vec3(-127.5,1.5,53.8)
        })
        );

        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-144,y:5.5,z:60},
                angle:{x:0,y:-Math.PI/10,z:0}
        });
        new Wall({
                size:{x:8,y:8,z:0.1},
                position:{x:-137,y:5.5,z:65},
                angle:{x:0,y:-Math.PI/4,z:0}
        });
        new Wall({
                size:{x:19,y:8,z:4},
                position:{x:-128,y:5.5,z:70}
        });
        new Wall({
                size:{x:10,y:0.1,z:5},
                position:{x:-128,y:2.3,z:64},
                angle:{x:0,y:0,z:Math.PI/14}
        });

        new Wall({
                size:{x:8,y:0.1,z:5},
                position:{x:-139,y:1.68,z:54},
                angle:{x:0,y:0,z:Math.PI/14}
        });

        new Wall({
                size:{x:13,y:0.1,z:5},
                position:{x:-156,y:0,z:54},
                angle:{x:0,y:0,z:Math.PI/14}
        });

        new Wall({
                size:{x:40,y:0.1,z:48},
                position:{x:-130,y:1.4,z:54}
        });

        new Wall({
                size:{x:0.1,y:8,z:52},
                position:{x:-173.8,y:4,z:106}
        });
        new Wall({
                size:{x:0.1,y:8,z:13},
                position:{x:-180.5,y:4,z:86.5}
        });
        new Wall({
                size:{x:0.1,y:8,z:32},
                position:{x:-180.5,y:4,z:116}
        });
        new Wall({
                size:{x:6,y:8,z:0.1},
                position:{x:-177,y:4,z:132}
        });
        new Wall({
                size:{x:28,y:8,z:0.1},
                position:{x:-194,y:4,z:93.5}
        });
        new Wall({
                size:{x:28,y:8,z:0.1},
                position:{x:-194,y:4,z:100}
        });
        new Wall({
                size:{x:0.1,y:8,z:33},
                position:{x:-208.5,y:4,z:76.5}
        });
        new Wall({
                size:{x:0.1,y:8,z:33},
                position:{x:-208.5,y:4,z:117}
        });
        new Wall({
                size:{x:0.1,y:8,z:72},
                position:{x:-214.5,y:4,z:96}
        });
        new Wall({
                size:{x:6,y:8,z:0.1},
                position:{x:-211.5,y:4,z:60}
        });
        new Wall({
                size:{x:6,y:8,z:0.1},
                position:{x:-211.5,y:4,z:132}
        });

        new Wall({
                size:{x:12,y:8,z:2},
                position:{x:6,y:4,z:-2}
        });
        new Wall({
                size:{x:12,y:8,z:2},
                position:{x:6,y:4,z:9}
        });

        new Wall({
                size:{x:2,y:8,z:5},
                position:{x:13,y:4,z:-1.3}
        });
        new Wall({
                size:{x:2,y:8,z:5},
                position:{x:13,y:4,z:8.3}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:19.5,y:4,z:-1.2},
                angle:{x:0,y:Math.PI/10,z:0}
        });
        new Wall({
                size:{x:6,y:8,z:0.1},
                position:{x:27,y:4,z:-5},
                angle:{x:0,y:Math.PI/4,z:0}
        });
        new Wall({
                size:{x:4,y:8,z:0.1},
                position:{x:31.4,y:4,z:-9},
                angle:{x:0,y:Math.PI/4,z:0}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:34.8,y:4,z:-16},
                angle:{x:0,y:Math.PI/2.5,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:31.4,y:4,z:-0.13},
                angle:{x:0,y:Math.PI/5.5,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:40,y:4,z:-8.6},
                angle:{x:0,y:Math.PI/3,z:0}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:42.8,y:4,z:-16},
                angle:{x:0,y:Math.PI/2.2,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:31.4,y:4,z:6.41},
                angle:{x:0,y:-Math.PI/5.5,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:40,y:4,z:15.17},
                angle:{x:0,y:-Math.PI/3,z:0}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:42.8,y:4,z:23.8},
                angle:{x:0,y:-Math.PI/2.2,z:0}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:19.5,y:4,z:7.89},
                angle:{x:0,y:-Math.PI/10,z:0}
        });
        new Wall({
                size:{x:6,y:8,z:0.1},
                position:{x:27,y:4,z:11.76},
                angle:{x:0,y:-Math.PI/4,z:0}
        });
        new Wall({
                size:{x:4,y:8,z:0.1},
                position:{x:31.4,y:4,z:16},
                angle:{x:0,y:-Math.PI/4,z:0}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:34.8,y:4,z:22.4},
                angle:{x:0,y:-Math.PI/2.5,z:0}
        });

        new Wall({
                size:{x:0.1,y:8,z:50},
                position:{x:42,y:4,z:-45}
        });
        new Wall({
                size:{x:0.1,y:8,z:20},
                position:{x:43.3,y:4,z:-80}
        });
        new Wall({
                size:{x:0.1,y:8,z:20},
                position:{x:35.3,y:4,z:-80}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:40.3,y:4,z:-90}
        });
        new Wall({
                size:{x:0.1,y:8,z:27},
                position:{x:36.6,y:4,z:-34.5}
        });
        new Wall({
                size:{x:0.1,y:8,z:15},
                position:{x:36.6,y:4,z:-62.7}
        });
        new Wall({
                size:{x:29,y:8,z:0.1},
                position:{x:22.5,y:4,z:-48.2}
        });
        new Wall({
                size:{x:29,y:8,z:0.1},
                position:{x:22.5,y:4,z:-55.3}
        });
        new Wall({
                size:{x:0.1,y:8,z:15},
                position:{x:7.88,y:4,z:-40.7}
        });
        new Wall({
                size:{x:0.1,y:8,z:15},
                position:{x:7.88,y:4,z:-62.7}
        });
        new Wall({
                size:{x:0.1,y:8,z:20},
                position:{x:9,y:4,z:-80}
        });
        new Wall({
                size:{x:0.1,y:8,z:20},
                position:{x:0,y:4,z:-80}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:4,y:4,z:-90}
        });
        new Wall({
                size:{x:0.1,y:8,z:36},
                position:{x:2.1,y:4,z:-52}
        });
        new Wall({
                size:{x:0.1,y:8,z:20},
                position:{x:9,y:4,z:-26}
        });
        new Wall({
                size:{x:0.1,y:8,z:20},
                position:{x:0,y:4,z:-26}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:4,y:4,z:-16}
        });

        new Wall({
                size:{x:0.1,y:8,z:30},
                position:{x:42.5,y:4,z:42.6}
        });
        new Wall({
                size:{x:0.1,y:8,z:30},
                position:{x:36.6,y:4,z:42.6}
        });

        world.addBody(
                new CANNON.Body({
                shape: new CANNON.Sphere(25.9),
                position: new CANNON.Vec3(40.38,-1.46,90.6)
        })
        );

        new Wall({
                size:{x:9.3,y:8,z:0.1},
                position:{x:47.2,y:4,z:57.6},
                angle:{x:0,y:-Math.PI/24,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:57.2,y:4,z:61},
                angle:{x:0,y:-Math.PI/6,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:65.8,y:4,z:67.24},
                angle:{x:0,y:-Math.PI/4,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:72.4,y:4,z:78},
                angle:{x:0,y:-Math.PI/2.5,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:74.3,y:4,z:91.8},
                angle:{x:0,y:-Math.PI/2,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:71.7,y:4,z:103.5},
                angle:{x:0,y:-Math.PI/1.5,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:65.8,y:4,z:112.5},
                angle:{x:0,y:-Math.PI/1.4,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:55.2,y:4,z:120.4},
                angle:{x:0,y:-Math.PI/1.2,z:0}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:48.2,y:4,z:123.5},
                angle:{x:0,y:-Math.PI/1.1,z:0}
        });

        new Wall({
                size:{x:9.3,y:8,z:0.1},
                position:{x:31.8,y:4,z:57.6},
                angle:{x:0,y:Math.PI/24,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:22.88,y:4,z:61},
                angle:{x:0,y:Math.PI/6,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:14.5,y:4,z:67.24},
                angle:{x:0,y:Math.PI/4,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:8,y:4,z:78},
                angle:{x:0,y:Math.PI/2.5,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:6.6,y:4,z:91.8},
                angle:{x:0,y:Math.PI/2,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:9,y:4,z:103.5},
                angle:{x:0,y:Math.PI/1.5,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:15,y:4,z:112.5},
                angle:{x:0,y:Math.PI/1.4,z:0}
        });
        new Wall({
                size:{x:12,y:8,z:0.1},
                position:{x:25.3,y:4,z:120.4},
                angle:{x:0,y:Math.PI/1.2,z:0}
        });
        new Wall({
                size:{x:10,y:8,z:0.1},
                position:{x:32.4,y:4,z:123.5},
                angle:{x:0,y:Math.PI/1.1,z:0}
        });

        new Wall({
                size:{x:0.1,y:8,z:31},
                position:{x:36.5,y:4,z:137.5}
        });
        new Wall({
                size:{x:0.1,y:8,z:31},
                position:{x:36.5,y:4,z:174.5}
        });
        new Wall({
                size:{x:0.1,y:8,z:50},
                position:{x:42,y:4,z:147}
        });
        new Wall({
                size:{x:17,y:8,z:0.1},
                position:{x:45,y:4,z:191}
        });
        new Wall({
                size:{x:0.1,y:8,z:20},
                position:{x:53.6,y:4,z:181}
        });
        new Wall({
                size:{x:10,y:8,z:3},
                position:{x:47,y:4,z:171.5}
        });
        new Wall({
                size:{x:15,y:8,z:0.1},
                position:{x:29,y:4,z:152.6}
        });
        new Wall({
                size:{x:15,y:8,z:0.1},
                position:{x:29,y:4,z:158.9}
        });
        new Wall({
                size:{x:18,y:8,z:0.1},
                position:{x:12,y:4,z:151.7}
        });
        new Wall({
                size:{x:18,y:8,z:0.1},
                position:{x:12,y:4,z:160.7}
        });
        new Wall({
                size:{x:0.1,y:8,z:8},
                position:{x:3,y:4,z:156.7}
        });



        new Wall({
                size:{x:4.2,y:2,z:0.5},
                position:{x:47.7,y:0,z:188.9}
        });
        new Wall({
                size:{x:1,y:8,z:2},
                position:{x:47,y:4,z:176}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-5.28,y:4,z:-4.04}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-16.68,y:4,z:-4.04}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-27.9,y:4,z:-4.04}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-5.3,y:4,z:10.37}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-16,y:4,z:10.37}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-27,y:4,z:10.37}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-64,y:4,z:7.4}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-75.4,y:4,z:7.4}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-98.11,y:4,z:7.4}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-64,y:4,z:-0.86}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-75.4,y:4,z:-0.86}
        });
        new Wall({
                size:{x:2,y:8,z:3},
                position:{x:-98.11,y:4,z:-0.86}
        });


        doorMess.greenDoor.wall=new Wall({
                size:{x:1,y:8,z:4},
               position:{x:21,y:4,z:156}
        });
        doorMess.bluegreenDoor.wall=new Wall({
                size:{x:1,y:8,z:4},
               position:{x:-116.3,y:4,z:-32}
        });
        doorMess.yellowgreenDoor.wall=new Wall({
                size:{x:1,y:8,z:4},
               position:{x:-155,y:4,z:-32}
        });
        doorMess.purpleDoor.wall=new Wall({
                size:{x:4,y:8,z:1},
               position:{x:39.4,y:4,z:-71}
        });
        doorMess.bluepurpleDoor.wall=new Wall({
                size:{x:4,y:8,z:1},
               position:{x:4.6,y:4,z:-71}
        });
        doorMess.redpurpleDoor.wall=new Wall({
                size:{x:4,y:8,z:1},
               position:{x:4.6,y:4,z:-33}
        });
        doorMess.orangeDoor.wall=new Wall({
                size:{x:4,y:8,z:1},
               position:{x:-177.3,y:4,z:116}
        });
        doorMess.redorangeDoor.wall=new Wall({
                size:{x:4,y:8,z:1},
               position:{x:-212,y:4,z:115.6}
        });
        doorMess.yelloworangeDoor.wall=new Wall({
                size:{x:4,y:8,z:1},
               position:{x:-212,y:4,z:78}
        });



        //电脑碰撞体
        new Wall({
                size:{x:1,y:2,z:1},
               position:{x:43,y:1,z:175.2}
        });

        //总部设备
        new Wall({
                size:{x:0.1,y:8,z:2},
               position:{x:-128,y:4,z:53.8}
        });

        //总部左
        new Wall({
                size:{x:0.1,y:8,z:8},
               position:{x:-120,y:4,z:44.7},
               angle:{x:0,y:-Math.PI/4,z:0}
        });

        //总部右
        new Wall({
                size:{x:0.1,y:8,z:8},
               position:{x:-120,y:4,z:64},
               angle:{x:0,y:Math.PI/4,z:0}
        });

        //绿门电脑
        new Wall({
                size:{x:1,y:2,z:1},
               position:{x:10.78,y:1,z:159.2}
        });
        //紫门电脑
        new Wall({
                size:{x:1,y:2,z:1},
               position:{x:35.6,y:1,z:-80.96}
        });
        //蓝紫门电脑
        new Wall({
                size:{x:1,y:2,z:1},
               position:{x:0.87,y:1,z:-80.96}
        });
        //红紫门电脑
        new Wall({
                size:{x:1,y:2,z:1},
               position:{x:8.3,y:1,z:-23.74}
        });
        //蓝绿门电脑
        new Wall({
                size:{x:1,y:2,z:1},
               position:{x:-106.52,y:1,z:-35.43}
        });
        //黄绿门电脑
        new Wall({
                size:{x:1,y:2,z:1},
               position:{x:-164.38,y:1,z:-27.96}
        });
        //橙门电脑
        new Wall({
                size:{x:1,y:2,z:1},
               position:{x:-173.41,y:1,z:125.59}
        });
        //红橙门电脑
        new Wall({
                size:{x:1,y:2,z:1},
               position:{x:-208,y:1,z:125.31}
        });
        //黄橙门电脑
        new Wall({
                size:{x:1,y:2,z:1},
               position:{x:-214.9,y:1,z:68.92}
        });

        //游戏开始的门
        startDoorWall=new Wall({
                    size:{x:4,y:8,z:1},
                   position:{x:39,y:4,z:172}
            });
}

var arrDoorId=[];
function addDoorId(){
    for(var i in doorMess){
        arrDoorId.push(doorMess[i].wall.body.id);
    }
    // console.log(arrDoorId);
}



window.onload=function(){
        initCollision();
        addDoorId();
}