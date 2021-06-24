import {AnimationLoop, Model, CubeGeometry,SphereGeometry} from '@luma.gl/engine';
import {Texture2D, clear} from '@luma.gl/webgl';
import {setParameters} from '@luma.gl/gltools';
import {Matrix4,Vector3} from '@math.gl/core';
import {getRandom} from '../../static/js/random.js';
//建筑物、地面和会动球的vs
const vs = `\
  attribute vec3 positions;
  attribute vec2 texCoords;

  uniform mat4 uMVP;

  varying vec2 vUV;

  void main(void) {
    gl_Position = uMVP * vec4(positions, 1.0);
    vUV = texCoords;
  }
`;
//建筑物、地面的fs
const fs = `\
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec3 uEyePosition;
  
  varying vec2 vUV;

  void main(void) {
    gl_FragColor = texture2D(uTexture, vec2(vUV.x, 1.0 - vUV.y));
  }
`;

//会动球的fs
const SPHERE_FS = `\
precision highp float;

uniform vec3 uColor;
void main(void) {

  
  gl_FragColor = vec4(uColor, 0.6);
}
`;
const random = getRandom(); //创建随机数，用于变换球的位置
let sphereModel,cubeModel; //会动的球，建筑物
const ELECTRON_COUNT = 64; //会动球的个数
const ePos = []; //会动的球的位置
const eRot = []; //会动的球的位置变化
// const nPos = [];

// let mainFramebuffer;
export const loop = new AnimationLoop({
  onInitialize({gl}) {
    setParameters(gl, {
      depthTest: true,
      depthFunc: gl.LEQUAL
    });
    //最高楼和地面的贴图
    const texture = new Texture2D(gl, {
      data: require('../../static/img/006.jpg'),
      // x:1,
      // y:1,
    });
    //一群小楼的贴图
    const texture2 = new Texture2D(gl, {
      data: require('../../static/img/005.jpg'),
      
    });
    
    const eyePosition = [0, 2,5];//摄像机的位置
    const viewMatrix = new Matrix4().lookAt({eye: eyePosition});
    const mvpMatrix = new Matrix4(); //存储几何体的信息
    const cube_size=16; //cube_size*cube_size是小楼的个数
    const cubes= new Array(cube_size); //存储小楼
    const planeAndBuild = new Array(2); //存储高楼和地板
    const translations=[[0,-1.4,0],[0,0,0]]; //地板的位置，高楼的位置
       
    const scales=[[2.1,0.01,2.1],[0.2,1.4,0.2],[0.08,0.2,0.08]]; //地板大小，高楼大小，小楼大小

//创建高楼和地板信息
    for(let i=0;i<2;i++){
      planeAndBuild[i]={
        translation:translations[i],
        scale:scales[i],
        model:new Model(gl,{
          vs,
          fs,
          geometry:new CubeGeometry(),
          // uniforms:{
          //   uTexture:texture
          // }
        })
      }
    }

//一众小楼的信息
    cubeModel=new Model(gl,{
      vs,
      fs,
      geometry:new CubeGeometry(),
      uniforms:{
        uTexture:texture2
      }
    });
    for(let i=0;i<4;i+=0.25){
      cubes[i*4]= new Array(cube_size)
      
      for(let j=0;j<4;j+=0.25){
        if(i>=1.5&&i<=2.25&&j>=1.5&&j<=2.25) continue;
        cubes[i*4][j*4]={
          translation:[-1.85+i,-1.2,-1.85+j],
          scale:scales[2],
        }
        // console.log(cubes[i*4][j*4])
      }
    }


//会动的球
    sphereModel = new Model(gl, {
      vs, 
      fs:SPHERE_FS,
      geometry: new SphereGeometry({
        nlat: 20,
        nlong: 50 // To test that sphere generation is working properly.
      }),
      uniforms:{
        uColor: [0.0, 0.5, 1],
        uLighting: 0
      }
    });
    const dt = 0.05;
    for (let i = 0; i < ELECTRON_COUNT; i++) {
      const pos = new Vector3(random() - 0.5, random() - 0.8, random() - 0.5);

      const distanceFromCenter = random() + 2.0;
      pos.normalize().scale(distanceFromCenter);
      const s = 0.5;
      pos.scale(s);
      ePos.push(pos);
      const q = new Vector3(random() - 0.5, random() - 0.2, random() - 0.5);
      const axis = pos
        .clone()
        .cross(q)
        .normalize();
      const theta = (4 / distanceFromCenter) * dt;
      const rot = new Matrix4().rotateAxis(theta, axis);
      eRot.push(rot);
    }

    return {
      planeAndBuild,
      texture,
      cubes,
      cube_size,
      viewMatrix,
      mvpMatrix
    };
  },

  onRender({gl, aspect , planeAndBuild,texture,cubes,cube_size,mvpMatrix, viewMatrix}) {
    clear(gl, {color: [0, 0, 0, 1]});

//地板和高楼
    for(let i=0;i<2;i++){
        const cube =planeAndBuild[i];
        mvpMatrix
          .perspective({fov:Math.PI/3,aspect})
          .multiplyRight(viewMatrix)
          .translate(cube.translation)
          .scale(cube.scale);
        cube.model.draw({
          uniforms: {
            uTexture:texture,
            uMVP: mvpMatrix
          }
        });
    }

//一众小楼
    for(let i=0;i<cube_size;i++){
      for(let j=0;j<cube_size;j++){
        if(i>=6&&i<=9&&j>=6&&j<=9) continue;
        const cube =cubes[i][j];
        mvpMatrix
          .perspective({fov:Math.PI/3,aspect})
          .multiplyRight(viewMatrix)
          .translate(cube.translation)
          .scale(cube.scale);
          cubeModel.setUniforms({uMVP: mvpMatrix}).draw();
      }
      
    }

//会动的球  
    for (let i = 0; i < ELECTRON_COUNT; i++) {
      ePos[i] = eRot[i].transformVector(ePos[i]);
      mvpMatrix
          .perspective({fov:Math.PI/3,aspect})
          .multiplyRight(viewMatrix)
          .translate(ePos[i]).scale([0.015, 0.015, 0.015])
      sphereModel.setUniforms({uMVP: mvpMatrix}).draw();
    }
  }
});
