<template>
  <div style="position: relative;width: 100%;height: 100%;">
   <div id="container"></div>
   <div v-if="ifClick" class="panel">
        {{buildName}}
        
    
    </div>
  </div>
</template>


<script>
// import OrbitControls from '';
// import { OrbitControls } from "../js/OrbitControls.js";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

export default {
  name: 'City',
  data () {
    return {
      camera:null,
      scene:null,
      renderer: null,
      ball: null,  //景观台那个会动的球
      ball2:null,  //商业楼上的那颗会动的球
      light:null,
      selectObject:null, //被选中的建筑
      ifClick:false,  
      width:'',
      height:'',
      groupid:'',  //点击了的建筑的id
      buildName:null,  //点击了的建筑的名字
      textures:[],  //会动的线的贴图
      outObject:[], //外发光的建筑
      
   
    }
  },
  methods: {
    
      init() {
          this.initThree();
          this.initScene(); 
          this.initCamera(); 
          this.initLight();
          this.initPlant(); //创建地面
          // this.initRunLine();

          this.initViewBuild();//创建景观台
          this.initSchoolBuild();
          this.initAdministrationBuild();
          this.initOfficeBuild();
          this.initCommercialBuild();
          this.initHospitolBuild();
          this.initNeighbourhood();
          this.initLineObject();
          this.initRunLineObject();
          
          
          addEventListener('dblclick', this.onMouseDblclick, false);


          var axesHelper = new THREE.AxesHelper;
          this.scene.add(axesHelper);   
      },
      initThree:function(){
          
        let container = document.getElementById('container');
        this.width=container.clientWidth;
        this.height=container.clientHeight;
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(this.width, this.height)
        container.appendChild(this.renderer.domElement)
        
      },
      initScene:function(){
        this.scene = new THREE.Scene();
        
      },
      initLight:function(){
        // this.scene.add(new THREE.AmbientLight(0x3c3c3c));//环境光
        this.light = new THREE.PointLight( 0x0000ff, 1, 50 );
        this.light.position.set(0,10,0);
				this.scene.add( this.light );
        var light2 = new THREE.PointLight( 0x0000ff, 1, 50 );
        light2.position.set(44,10,16);
        this.scene.add( light2 );
      },
      initCamera:function(){
        this.camera = new THREE.PerspectiveCamera(45,this.width / this.height,0.25, 1000);
        this.camera.position.set(  108.18467077596216,  97.0604140991207, 25.102051500928614);

        //镜头移动
        var controls =  new OrbitControls(this.camera,this.renderer.domElement);
        controls.target.set(0,-0.2,-0.2);
        
        controls.update();
        
      },
      //插入地板
      initPlant:function(){
        var geometry1 = new THREE.BoxGeometry(80, 1, 80);
        var matarial1 = new THREE.MeshPhongMaterial( { 
          color: '#ffffff'
            // map: THREE.ImageUtils.loadTexture('img/3d66Model-593580-files-10.jpg') ,
            // emissive:'blue',
        } );
        var cube = new THREE.Mesh(geometry1, matarial1);
        cube.position.set(20,0,10);
        this.scene.add(cube);
        // var cubeGroup=new THREE.Group()
        // cubeGroup.add(cube)
        // this.outlineObj(cubeGroup.children)
      },
      initViewBuild:function(){
        var ViewBuild = new THREE.Group();
        var geometry2 = new THREE.OctahedronGeometry(5,1)
        var matarial2 = new THREE.MeshNormalMaterial({flatShading: true})
        matarial2.transparent = true;
        matarial2.opacity = 0.9;
        this.ball = new THREE.Mesh(geometry2, matarial2);
        this.ball.position.set(44,12.5,16);

        var column = this.initColumn(5,5,5,40,44,2.5,16);
        ViewBuild.add(this.ball);
        ViewBuild.add(column);
        ViewBuild.name="观景台"
        this.scene.add(ViewBuild);
        
        // ViewBuild.on("click", function(){ alert("Hello World!"); });
      },
      initSchoolBuild:function(){
        var SchoolBuild = new THREE.Group();
        
        SchoolBuild.add(this.initCube(6,20,6,0,10,0));
        SchoolBuild.add(this.initCube(6,20,10,0,10,8));
        SchoolBuild.add(this.initCube(14,20,6,10,10,0));
        SchoolBuild.add(this.initCube(3,20,6,20,10,0));
        SchoolBuild.name="学校"
        this.scene.add(SchoolBuild);
      },

      initAdministrationBuild:function(){
        var AdministrationBuild = new THREE.Group();
        AdministrationBuild.add(this.initCube(3, 20, 6,0,10,20));
        AdministrationBuild.add(this.initCube(8,20,3,2,10,27));
        AdministrationBuild.add(this.initCube(6, 14, 6,3,7,20));
        AdministrationBuild.name="行政大楼"
        this.scene.add(AdministrationBuild)

      },
      initOfficeBuild:function(){
        var OfficeBuild = new THREE.Group();
        OfficeBuild.add(this.initCube(10,40,6,0,20,40));
        OfficeBuild.add(this.initCube(10,3,3,10,35,40));
        OfficeBuild.add(this.initCube(10,3,3,10,30,40));
        OfficeBuild.add(this.initCube(10,3,3,10,20,40));
        OfficeBuild.add(this.initCube(10,40,6,20,20,40));
        OfficeBuild.name="写字楼"
        this.scene.add(OfficeBuild)

      },

      initCommercialBuild:function(){
        var CommercialBuild = new THREE.Group();
        CommercialBuild.add(this.initCube(3,20,3,20,10,10));
        CommercialBuild.add(this.initCube(3,20,3,20,10,20));
        CommercialBuild.add(this.initCube(12,30,12,25,15,15));
        CommercialBuild.add(this.initCube(3,20,3,30,10,10));
        CommercialBuild.add(this.initCube(3,20,3,30,10,20));
        CommercialBuild.add(this.initColumn(6,6,10,8,25,30,15));
        CommercialBuild.add(this.initColumn(0,5,10,8,25,40,15));

        var geometry2 = new THREE.OctahedronBufferGeometry(2,0)
        var matarial2 = new THREE.MeshNormalMaterial({flatShading: true})
        matarial2.transparent = true;
        matarial2.opacity = 0.9;
        this.ball2 = new THREE.Mesh(geometry2, matarial2);
        this.ball2.position.set(25,49,15);
        CommercialBuild.add(this.ball2);
        CommercialBuild.name="商业楼"
        this.scene.add(CommercialBuild)
        // var outObject=[];
        // outObject.push(this.ball2)
        // this.outlineObj(outObject)
      },

      initHospitolBuild:function(){
        var HospitolBuild = new THREE.Group();
        HospitolBuild.add(this.initCube(8,30,8,34,15,-16));
        HospitolBuild.add(this.initCube(8,4,6,27,20,-16));
        HospitolBuild.add(this.initCube(8,2,8,27,1,-16));
        HospitolBuild.add(this.initCube(8,30,8,20,15,-16));
        HospitolBuild.add(this.initCube(20,10,20,40,5,-10));
        HospitolBuild.name="医院"
        this.scene.add(HospitolBuild)
        // this.outlineObj(HospitolBuild.children)

      },

      initNeighbourhood:function(){
        var Neighbourhood = new THREE.Group();
        
        Neighbourhood.add(this.initCube(3,12,3,40,6,30));
        Neighbourhood.add(this.initCube(3,12,3,40,6,35));
        Neighbourhood.add(this.initCube(3,12,3,40,6,40));
        Neighbourhood.add(this.initCube(3,12,3,40,6,45));
        Neighbourhood.add(this.initCube(3,12,3,45,6,30));
        Neighbourhood.add(this.initCube(3,12,3,45,6,35));
        Neighbourhood.add(this.initCube(3,12,3,45,6,40));
        Neighbourhood.add(this.initCube(3,12,3,45,6,45));
        Neighbourhood.add(this.initCube(3,12,3,50,6,30));
        Neighbourhood.add(this.initCube(3,12,3,50,6,35));
        Neighbourhood.add(this.initCube(3,12,3,50,6,40));
        Neighbourhood.add(this.initCube(3,12,3,50,6,45));
        Neighbourhood.name="居民楼"
        this.scene.add(Neighbourhood)
        // this.outlineObj(Neighbourhood.children)

      },
      
      initLineObject(){
        var LineGroup = new THREE.Group();
        // this.initRunLine(40,12,40,34,30,-16);
        // LineGroup.add(this.initLint(40,12,40,34,30,-16)); //居民楼，医院
        // LineGroup.add(this.initLint(25,45,15,40,12,40)); //商业楼，居民楼
        LineGroup.add(this.initLint(25,45,15,34,30,-16)); //商业楼，医院
        LineGroup.add(this.initLint(25,45,15,20,40,40)); //商业楼，写字楼
        // LineGroup.add(this.initLint(25,45,15,0,20,20)); //商业楼，行政大楼
        LineGroup.add(this.initLint(25,45,15,10,20,0)); //商业楼，学校
        // LineGroup.add(this.initLint(34,30,-16,20,40,40)); //医院，写字楼
        LineGroup.add(this.initLint(34,30,-16,0,20,20)); //医院，行政大楼
        // LineGroup.add(this.initLint(10,20,0,0,20,20)); //学校，行政大楼
        LineGroup.add(this.initLint(20,40,40,0,20,20)); //写字楼，行政大楼
        this.scene.add(LineGroup);
        // var time = new Date().getTime() * 0.0005;
      },
      initRunLineObject:function(){
        var RunLineObject = new THREE.Group();
        RunLineObject.add(this.initRunLine(40,12,40,34,30,-16));//居民楼，医院
        RunLineObject.add(this.initRunLine(25,45,15,40,12,40)); //商业楼，居民楼
        // RunLineObject.add(this.initRunLine(25,45,15,34,30,-16)); //商业楼，医院
        // RunLineObject.add(this.initRunLine(25,45,15,20,40,40)); //商业楼，写字楼
        RunLineObject.add(this.initRunLine(25,45,15,0,20,20)); //商业楼，行政大楼
        // RunLineObject.add(this.initRunLine(25,45,15,10,20,0)); //商业楼，学校
        RunLineObject.add(this.initRunLine(34,30,-16,20,40,40)); //医院，写字楼
        // RunLineObject.add(this.initRunLine(34,30,-16,0,20,20)); //医院，行政大楼
        RunLineObject.add(this.initRunLine(10,20,0,0,20,20)); //学校，行政大楼
        // RunLineObject.add(this.initRunLine(20,40,40,0,20,20)); //写字楼，行政大楼
        this.scene.add(RunLineObject);
      },
      initRunLine:function(a,b,c,x,y,z){///a,b,c为起点位置，x,y,z为终点位置
        var curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3( a,b,c),
          new THREE.Vector3( (a+x)/2, (b+y)/2+20, (c+z)/2 ),
          new THREE.Vector3( x,y,z )
        ],false/*是否闭合*/);
        var tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.1, 50, false);
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load(require('../../static/img/run5.jpg'));
        this.textures.push(texture);
        // 设置阵列模式为 RepeatWrapping
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT=THREE.RepeatWrapping
        // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
        //等价texture.repeat= new THREE.Vector2(20,1)
        texture.repeat.x = 20;
        var tubeMaterial = new THREE.MeshPhongMaterial({
          
          alphaMap: texture,
          // map: texture,
          transparent: true,
          opacity : 0.7,
          emissive:0x87cefa
        });
        console.log("texturn=",this.texture);
        var tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        return tube;
        // this.scene.add(tube);

        // var tubeGeometry2 = new THREE.TubeGeometry(curve, 100, 2, 50, false);
        // var tubeMaterial2 = new THREE.MeshPhongMaterial({
        //   color: 0x4488ff,
        //   transparent: true,
        //   opacity: 0.3,
        // });
        // var tube2 = new THREE.Mesh(tubeGeometry2, tubeMaterial2);
        // this.scene.add(tube2)
        
        // this.scene.add(new THREE.AxesHelper(300))


      },
      

      initLint(a,b,c,x,y,z){///a,b,c为起点位置，x,y,z为终点位置
        var curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3( a,b,c),
        new THREE.Vector3( (a+x)/2, (b+y)/2+20, (c+z)/2 ),
        new THREE.Vector3( x,y,z )
        );

        var points = curve.getPoints( 50 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );

        var material = new THREE.LineBasicMaterial( { 
          color : 0x87cefa, 
          linewidth : 20,
          transparent:true,
          opacity:0.5
          } );

        // Create the final object to add to the scene
        var curveObject = new THREE.Line( geometry, material );
        return curveObject;
      },

      

      
      initCube(a,b,c,x,y,z){//a,b,c分别为x,y,z轴的方向长度，x,y,z位置信息
        //插入一个正方体
        var geometry2 = new THREE.BoxGeometry(a, b, c);
        // var matarial2 = new THREE.MeshLambertMaterial({
        //     emissive:'blue',
        // });
        var matarial2 = new THREE.MeshNormalMaterial({flatShading: true})
        matarial2.transparent = true;
        matarial2.opacity = 0.95;
        var cube2 = new THREE.Mesh(geometry2, matarial2);
        cube2.position.set(x,y,z);
        return cube2
      },

      initColumn:function(a,b,c,d,x,y,z){ ///a上半径，b下半径，c高度，d柱体的边数，x,y,z位置信息
        var geometry2 = new THREE.CylinderGeometry(a,b,c,d )
        // var matarial2 = new THREE.MeshLambertMaterial({
        //     emissive:'blue',
        // });
        var matarial2 = new THREE.MeshNormalMaterial({flatShading: true})
        // matarial2.transparent = true;
        // matarial2.opacity = 0.9;
        var column1 = new THREE.Mesh(geometry2, matarial2);
        column1.position.set(x,y,z);
        // this.scene.add(column1);
        return column1;
      },
      
      // 鼠标双击触发的方法
    onMouseDblclick(event) {
        var that=this;
        // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
        var group = this.getIntersects(event);
        //console.log("group=",group);
        
        this.buildName=group.name;
        if(group!=null){
          this.ifClick=true;
          
          this.outObject=group.children;
          this.outlineObj(this.outObject);
          //console.log("groupid=",this.groupid);
          if(this.groupid!=''){
            //console.log("groupid不空",that.scene.children)
            // var pre_group=this.scene.getObjectByProperty('id',this.groupid);
           
            // var pre_group=that.scene.getObjectById(that.groupid);
            for(var id=0;id<that.scene.children.length;id++){
              //console.log("进入修改回来")
              if(that.scene.children[id].id==that.groupid){
                var pre_group =that.scene.children[id];
                //console.log("pre_group=",pre_group);
               // this.scene.getObjectById(this.groupid).material = new THREE.MeshNormalMaterial({flatShading: true});
                for(var j=0;j<pre_group.children.length;j++){
                  //console.log("pre_group[j]=",pre_group.children[j])
                  pre_group.children[j].material=new THREE.MeshNormalMaterial({flatShading: true});
                }
                break;
              }
              else{
                //console.log(id,"空的时候:this.scene.children[id]=",that.scene.children[id]);
              }
            }

            
          }
          else{
            //console.log("groupid为空")
          }
          this.groupid=group.id;

          // this.outlineObj(group.children);
          for(var i=0;i<group.children.length;i++){
            this.selectObject = group.children[i];
            this.changeMaterial(this.selectObject);
          }
        }
    },

    // 获取与射线相交的对象数组
    getIntersects(event) {
        event.preventDefault();
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
        mouse.x = ((event.clientX-250) / this.width) * 2 - 1;
        mouse.y = -(event.clientY / this.height) * 2 + 1;
        console.log('event.clientX=',event.clientX)
        //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
        raycaster.setFromCamera(mouse, this.camera);

        // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
        var intersects;
        for(var i=0;i<this.scene.children.length;i++){
          if(this.scene.children[i].type=="Group"){
              intersects=raycaster.intersectObjects(this.scene.children[i].children);
              if (intersects.length != 0 && intersects[0].object instanceof THREE.Mesh){
                return this.scene.children[i]
              }
          }
        }
        //返回选中的对象
    },
    // 改变对象材质属性
    changeMaterial(object) {
        //console.log("object=",object);
        var material = new THREE.MeshLambertMaterial({
            // color: 0xffffff * Math.random(),
            // transparent: object.material.transparent ? false : true,
            transparent:true,
            emissive:'blue',
            opacity: 0.5,
            
        });
        object.material = material;
    },
  
      outlineObj( selectedObjects ){
        //console.log('selectedObjects=',selectedObjects)
				var composer = new EffectComposer( this.renderer ); // (效果组合器)对象
        
				var renderPass = new RenderPass( this.scene, this.camera );
				composer.addPass( renderPass ); // 特效渲染

				var outlinePass = new OutlinePass( new THREE.Vector2( this.width, this.height), this.scene, this.camera );
				composer.addPass( outlinePass ); // 加入高光特效

				outlinePass.pulsePeriod = 5; //数值越大，律动越慢
				outlinePass.visibleEdgeColor.set( 0x0000ff ); // 高光颜色
				outlinePass.hiddenEdgeColor.set( 0x000000 );// 阴影颜色
				outlinePass.usePatternTexture = false; // 使用纹理覆盖？
				outlinePass.edgeStrength = 5; // 高光边缘强度
				outlinePass.edgeGlow = 1; // 边缘微光强度
				outlinePass.edgeThickness = 1; // 高光厚度

				outlinePass.selectedObjects = selectedObjects; // 需要高光的obj
        //console.log('=',composer)
			},
    



      animate: function () {

        


        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate)
        this.ball2.rotation.y += 0.01
        this.ball.rotation.y += 0.02;
        for(var i=0;i<this.textures.length;i++){
          this.textures[i].offset.x -= 0.05;
        }
        if(this.composer!=null){
          this.composer.render();
        }
        
      }
   },
   mounted () {
      this.init()
      this.animate()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #container {
    height: 600px;
    /* width: 600px; */
  }
  .panel{
    position:absolute;
    color: #fff;
    top:10px;
    left: 10px;
    padding: 10px;
    background-color: rgba(119,136,153,0.8);
  }
</style>
