<template>
  <canvas id="renderCanvas"></canvas>
</template>

<script>
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
export default {
  data() {
    return {
      ball:null,  //回转的景观球
      scene:null, 
    };
  },
  methods:{
    initCity(scene){
      // BABYLON.MeshBuilder.CreateSphere(
      //   "sphere",
      //   { diameter: 2 }
      // );
      this.scene=scene;
      this.initPlant(); //创建地面
      this.initViewBuild(); //创建景观台
      this.initAdministrationBuild(); //创建行政大楼
      this.initSchoolBuild(); //创建学校
      this.initOfficeBuild();  //创建写字楼
      this.initCommercialBuild();  //创建商业楼
      this.initHospitolBuild();  //创建医院
      this.initNeighbourhood();   //创建居民楼
      this.initLineObject();  //创建不会动的线
      this.initRunPoint();  //创建会动的线
    },
    initPlant(){
      var plant=BABYLON.MeshBuilder.CreateBox("box", {width: 80, height: 1, depth:80},this.scene)
      plant.position.set(20,0,10)
      var myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
      myMaterial.diffuseTexture  = new BABYLON.Texture(require("../../static/img/002.jpg"), this.scene);
      myMaterial.specularTexture = new BABYLON.Texture(require("../../static/img/002.jpg"), this.scene);
      myMaterial.emissiveTexture = new BABYLON.Texture(require("../../static/img/002.jpg"), this.scene);
      myMaterial.ambientTexture = new BABYLON.Texture(require("../../static/img/002.jpg"), this.scene);
      plant.material=myMaterial;

    },
    initViewBuild(){
      // this.ball=BABYLON.MeshBuilder.CreateCylinder("ball", {diameter: 10, height: 1.2, tessellation: 5});
      // this.ball=BABYLON.MeshBuilder.CreatePolyhedron("ball", {type: 1, size: 24});
      this.ball=BABYLON.MeshBuilder.CreateSphere("sphere", {segments:3,diameterX: 8, diameterY: 8, diameterZ: 8},this.scene);
      this.ball.position.set(44,10,16);
      var myTexture = new BABYLON.Texture(require("../../static/img/002.jpg"),this.scene);
      var myMaterial = new BABYLON.StandardMaterial("myMaterial",this.scene);
      myMaterial.diffuseTexture=myTexture;
      this.ball.material=myMaterial;
      this.initColumn(5,10,10,40,44,2.5,16);
    },
    initAdministrationBuild:function(){
        this.initCube(3, 20, 6,0,10,20);
        this.initCube(8,20,3,2,10,27);
        this.initCube(6, 14, 6,3,7,20);

      },
    initSchoolBuild:function(){
      this.initCube(6,20,6,0,10,0);
      this.initCube(6,20,10,0,10,8);
      this.initCube(14,20,6,10,10,0);
      this.initCube(3,20,6,20,10,0);
    },
    initOfficeBuild:function(){
        this.initCube(10,40,6,0,20,40);
        this.initCube(10,3,3,10,35,40);
        this.initCube(10,3,3,10,30,40);
        this.initCube(10,3,3,10,20,40);
        this.initCube(10,40,6,20,20,40);
        

      },

      initCommercialBuild:function(){
        this.initCube(3,20,3,20,10,10);
        this.initCube(3,20,3,20,10,20);
        this.initCube(12,30,12,25,15,15);
        this.initCube(3,20,3,30,10,10);
        this.initCube(3,20,3,30,10,20);
        this.initColumn(5,12,12,8,25,32.5,15);
        this.initColumn(10,0,10,8,25,40,15);

        // var outObject=[];
        // outObject.push(this.ball2)
        // this.outlineObj(outObject)
      },

      initHospitolBuild:function(){
        this.initCube(8,30,8,34,15,-16);
        this.initCube(8,4,6,27,20,-16);
        this.initCube(8,2,8,27,1,-16);
        this.initCube(8,30,8,20,15,-16);
        this.initCube(20,10,20,40,5,-10);
        

      },

      initNeighbourhood:function(){
        
        this.initCube(3,12,3,40,6,30);
        this.initCube(3,12,3,40,6,35);
        this.initCube(3,12,3,40,6,40);
        this.initCube(3,12,3,40,6,45);
        this.initCube(3,12,3,45,6,30);
        this.initCube(3,12,3,45,6,35);
        this.initCube(3,12,3,45,6,40);
        this.initCube(3,12,3,45,6,45);
        this.initCube(3,12,3,50,6,30);
        this.initCube(3,12,3,50,6,35);
        this.initCube(3,12,3,50,6,40);
        this.initCube(3,12,3,50,6,45);
        

      },
      initLineObject(){
        this.initLint(40,12,40,34,30,-16); //居民楼，医院
        this.initLint(25,45,15,40,12,40); //商业楼，居民楼
        this.initLint(25,45,15,34,30,-16); //商业楼，医院
        this.initLint(25,45,15,20,40,40); //商业楼，写字楼
        this.initLint(25,45,15,0,20,20); //商业楼，行政大楼
        this.initLint(25,45,15,10,20,0); //商业楼，学校
        this.initLint(34,30,-16,20,40,40); //医院，写字楼
        this.initLint(34,30,-16,0,20,20); //医院，行政大楼
        this.initLint(10,20,0,0,20,20); //学校，行政大楼
        this.initLint(20,40,40,0,20,20); //写字楼，行政大楼
      },
      initRunPoint(){
        var that = this;
        this.runPoint(40,12,40,34,30,-16); //居民楼，医院
        setTimeout(function(){
          that.runPoint(25,45,15,40,12,40); //商业楼，居民楼
        },250)
        setTimeout(function(){
          that.runPoint(25,45,15,34,30,-16); //商业楼，医院
        },500)
        setTimeout(function(){
          that.runPoint(0,20,20,25,45,15); //行政大楼,商业楼
        },1000)
        setTimeout(function(){
          that.runPoint(34,30,-16,20,40,40); //医院，写字楼
        },1500)
        setTimeout(function(){
          that.runPoint(34,30,-16,0,20,20); //医院，行政大楼
        },2000)
        setTimeout(function(){
          that.runPoint(10,20,0,0,20,20); //学校，行政大楼
        },2500)
        setTimeout(function(){
          that.runPoint(20,40,40,0,20,20); //写字楼，行政大楼
        },3000)
        
        // this.runPoint(25,45,15,20,40,40); //商业楼，写字楼
        // this.runPoint(25,45,15,10,20,0); //商业楼，学校
      },

    initColumn:function(a,b,c,d,x,y,z){ ///a高度，b上半径，c下半径，d柱体的边数，x,y,z位置信息
      var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", a, b, c, d, 1, this.scene, false);//高,上半径，下半径，
      cylinder.position.set(x,y,z);
      // cylinder.rotate.y=Math.IP/2;
      
      var myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
      var myTexture=new BABYLON.Texture(require("../../static/img/003.jpg"), this.scene);
      myTexture.uOffset=Math.PI/2
      myMaterial.diffuseTexture  = myTexture
      myMaterial.specularColor = new BABYLON.Color4(5/256, 39/256, 175/256,0.9);
      
      myMaterial.alpha = 0.9;
      cylinder.material=myMaterial;
    },
    initCube:function(a,b,c,x,y,z){
      var cube=BABYLON.MeshBuilder.CreateBox("box", {width: a, height: b, depth:c},this.scene)
      cube.position.set(x,y,z);
      var myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
      myMaterial.diffuseTexture  = new BABYLON.Texture(require("../../static/img/003.jpg"), this.scene);
      // myMaterial.diffuseColor = new BABYLON.Color3(7/256, 69/256, 90/256);
      myMaterial.specularColor = new BABYLON.Color4(5/256, 39/256, 175/256,0.9);
      // myMaterial.emissiveColor = new BABYLON.Color3(18/256, 237/256, 243/256);
      // myMaterial.ambientColor = new BABYLON.Color4(5/256, 39/256, 175/256,0.9);

      myMaterial.alpha = 0.9;
      cube.material=myMaterial;
    },
    initLint:function(a,b,c,x,y,z){///a,b,c为起点位置，x,y,z为终点位置
      var myPoints =[];
      var myColors =[];
      for(var i=0;i<=1.05;i+=0.05){
        myPoints.push(new BABYLON.Vector3(a+(x-a)*i,b+(y-b)*i+20*Math.sin(i*Math.PI),c+(z-c)*i));        
        myColors.push(new BABYLON.Color4(18/256, 237/256, 243/256,0.2))
      }
     console.log(myPoints);
      BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints,colors:myColors}, this.scene);
    },
    runPoint:function(a,b,c,x,y,z) { ///a,b,c为起点位置，x,y,z为终点位置

//  this.initLint(40,12,40,34,30,-16); //居民楼，医院
        var cube=new BABYLON.MeshBuilder.CreateBox("cube",{width:0.3,height:0.3,depth:0.3},this.scene);
        cube.position=new BABYLON.Vector3(a,b,c);
        var myMaterial=new BABYLON.StandardMaterial("myMaterial",this.scene);
        myMaterial.emissiveColor = new BABYLON.Color3(18/256, 237/256, 243/256);
        cube.material=myMaterial;
        var framePerSecond = 30;
        var totalFrames = 30;
        var animationLine = new BABYLON.Animation("myAnimation", "position", framePerSecond,
                BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keys = [];
        for(var i=0;i<=1.05;i+=0.05){
          
          // myColors2.push(new BABYLON.Color4(1,1,1,1))
          keys.push({
            frame: i*totalFrames,
            value: new BABYLON.Vector3(a+(x-a)*i,b+(y-b)*i+20*Math.sin(i*Math.PI),c+(z-c)*i)
          });
        }
        
        animationLine.setKeys(keys);
        cube.animations = [];
        cube.animations.push(animationLine);
        this.scene.beginAnimation(cube, 0, totalFrames, true);

    }
    

  },
  mounted() {
    var canvas = document.getElementById("renderCanvas"); // 得到canvas对象的引用
    
    // canvas.onclick = function() { alert("hello world");}
    var engine = new BABYLON.Engine(canvas, true); // 初始化 BABYLON 3D engine
    var that=this;
    /******* Add the create scene function ******/
    var createScene = function () {
      // 创建一个场景scene
      var scene = new BABYLON.Scene(engine);

      // 添加一个相机，并绑定鼠标事件
      var camera = new BABYLON.ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 2,
        2,
        new BABYLON.Vector3(0, 0, 5),
        scene
      );
      camera.setPosition(new BABYLON.Vector3(108.18467077596216,  97.0604140991207, 25.102051500928614));
      // camera.position.set(  108.18467077596216,  97.0604140991207, 25.102051500928614);
      camera.attachControl(canvas, true);
      // camera.lookAt(scene.position)
      // 添加一组灯光到场景
      // eslint-disable-next-line no-unused-vars
      var light1 = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(1, 1, 0),
        scene
      );
      // eslint-disable-next-line no-unused-vars
      var light2 = new BABYLON.PointLight(
        "light2",
        new BABYLON.Vector3(0, 1, -1),
        scene
      );

      // 添加一个球体到场景中
      // eslint-disable-next-line no-unused-vars
      that.initCity(scene);
      // BABYLON.MeshBuilder.CreateSphere(
      //   "sphere",
      //   { diameter: 2 }
      // );

      return scene;
    };
    /******* End of the create scene function ******/

    var scene = createScene(); //Call the createScene function
    //  setTimeout(function(){
    //     that.runPoint();
    // },1000);

    // 最后一步调用engine的runRenderLoop方案，执行scene.render()，让我们的3d场景渲染起来
    engine.runRenderLoop(function () {
      scene.render();
      that.ball.rotation.y += 0.05;
      // that.myTexture.uOffset-=0.1;

    });
    // console.log(that.myColors);
    // 监听浏览器改变大小的事件，通过调用engine.resize()来自适应窗口大小
    window.addEventListener("resize", function () {
      engine.resize();
    });
  },
};
</script>

<style>
html,body,#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#renderCanvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>
