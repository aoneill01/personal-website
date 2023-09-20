var v=Object.defineProperty;var E=(i,e,t)=>e in i?v(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var n=(i,e,t)=>(E(i,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const d=28*8,u=36*8;class T{constructor(){n(this,"tickCount",0);n(this,"player",new _);n(this,"controls",new A);n(this,"bullets",[]);n(this,"enemyBullets",[]);n(this,"enemies",[]);n(this,"enemyGenerator");n(this,"stars",[]);n(this,"particles",[]);this.enemyGenerator=C(),this.enemies.push(...this.enemyGenerator.next().value),this.enemies.push(...this.enemyGenerator.next().value);for(let e=0;e<100;e++)this.stars.push(new I)}tick(){this.tickCount++,this.tickCount%(16*8)===0&&this.enemies.push(...this.enemyGenerator.next().value),this.controls.left&&this.player.mode!=="dead"&&(this.player.x-=2,this.player.x<0&&(this.player.x=0)),this.controls.right&&this.player.mode!=="dead"&&(this.player.x+=2,this.player.x>d-16&&(this.player.x=d-16)),this.controls.fire&&this.player.mode==="alive"&&this.bullets.push(new y(this.player.x+7,this.player.y)),this.controls.fire=!1,this.player.tick(this.tickCount),this.enemies.forEach(e=>{e.tick(this.tickCount),e.fireCountdown===0&&this.enemyBullets.length<8&&this.enemyBullets.push(new y(e.x+3,e.y+8,2)),e.mode==="dive"&&this.player.isHit(e.x+4,e.y+4)&&this.player.kill(this.tickCount)&&this.createExplosion2(this.player.x+8,this.player.y+4)}),this.enemies=this.enemies.filter(e=>e.isLive()),this.bullets.forEach(e=>{e.tick();const t=this.enemies.find(r=>r.isHit(e.x,e.y));t&&(e.dead=!0,this.enemies=this.enemies.filter(r=>r!==t),this.createExplosion1(t.x+4,t.y+4,t.spriteX),this.player.score+=10)}),this.bullets=this.bullets.filter(e=>e.isLive()),this.enemyBullets.forEach(e=>{e.tick(),this.player.isHit(e.x,e.y)&&this.player.kill(this.tickCount)&&(e.dead=!0,this.createExplosion2(this.player.x+8,this.player.y+4))}),this.enemyBullets=this.enemyBullets.filter(e=>e.isLive()),this.particles.forEach(e=>e.tick()),this.particles=this.particles.filter(e=>!e.dead)}createExplosion1(e,t,r){for(let o=0;o<8;o++){const s=Math.PI/3*Math.random()-Math.PI/1.5,c=Math.random()/2+1;this.particles.push(new x(e+Math.random()*2,t+Math.random()*2,c*Math.cos(s),c*Math.sin(s),r))}}createExplosion2(e,t){for(let r=0;r<16;r++){const o=2*Math.PI*Math.random(),s=Math.random()/2+1;this.particles.push(new x(e+Math.random()*2,t+Math.random()*2,s*Math.cos(o),s*Math.sin(o),0))}}}class m{constructor(e=0,t=0){n(this,"x");n(this,"y");this.x=e,this.y=t}}class _ extends m{constructor(){super(13*8,33*8);n(this,"lives",5);n(this,"mode","alive");n(this,"deathTickCount");n(this,"score",0)}tick(t){switch(this.mode){case"dead":this.deathTickCount+60<=t&&(this.mode="iframe"),this.lives===0&&(this.lives=5,this.score=0);break;case"iframe":this.deathTickCount+60+120<=t&&(this.mode="alive");break}}kill(t){return this.mode!=="alive"?!1:(this.mode="dead",this.lives--,this.deathTickCount=t,!0)}isHit(t,r){return t>=this.x&&t<this.x+16&&r>=this.y&&r<this.y+8}}class f extends m{constructor(t,r,o,s){super(u,d);n(this,"row");n(this,"column");n(this,"spriteY");n(this,"spriteX");n(this,"fireCountdown",1);n(this,"mode","waiting");n(this,"targetY");n(this,"targetX");n(this,"startY");n(this,"startX");n(this,"startTickCount");this.row=t,this.column=r,this.spriteY=o,this.spriteX=s}tick(t){const c={x:this.row%2===0?-8:d,y:32},a={x:this.row%2===0?d:0,y:0};let l;switch(this.mode!=="waiting"&&((this.fireCountdown??-1)<0&&(this.fireCountdown=Math.floor(Math.random()*60*15)+60*5),this.fireCountdown--),this.mode){case"waiting":this.calculateY(t)<184&&(this.targetY=this.calculateY(t+100+this.column*8),this.targetX=this.calculateX(t+100+this.column*8),this.startTickCount=t+this.column*8,this.mode="flyIn");break;case"flyIn":l=(t-this.startTickCount)/100,this.y=(1-l)**2*c.y+2*(1-l)*l*a.y+l**2*this.targetY,this.x=(1-l)**2*c.x+2*(1-l)*l*a.x+l**2*this.targetX,l>=1&&(this.mode="group");break;case"group":this.y=this.calculateY(t),this.x=this.calculateX(t),this.y-this.column<=8&&(this.mode="dive",this.startTickCount=t,this.startX=this.x,this.startY=this.y,this.targetX=Math.random()*d,this.targetY=u);break;case"dive":l=(t-this.startTickCount)/200,this.y=(1-l)**2*this.startY+2*(1-l)*l*c.y+l**2*this.targetY,this.x=(1-l)**2*this.startX+2*(1-l)*l*c.x+l**2*this.targetX,l>1&&(this.mode="dead");break}}isHit(t,r){return t>=this.x&&t<this.x+8&&r>=this.y&&r<this.y+8}calculateY(t){const r=Math.floor(t/16);return 20*8-r+16*this.row}calculateX(t){const o=Math.floor(t/4)%64;return(o<32?o:64-o)-16+8*this.column}isLive(){return this.mode!=="dead"}}class y extends m{constructor(t,r,o=-5){super(t,r);n(this,"dead",!1);n(this,"velocity");this.velocity=o}tick(){this.y+=this.velocity}isLive(){return this.y>0&&this.y<u&&!this.dead}}class I extends m{constructor(){super(Math.floor(Math.random()*d),Math.floor(Math.random()*u));n(this,"depth");this.depth=Math.floor(Math.random()*3)}}class x extends m{constructor(t,r,o,s,c){super(t,r);n(this,"vx");n(this,"vy");n(this,"color");n(this,"dead",!1);this.vx=o,this.vy=s,this.color=c}tick(){this.x+=this.vx,this.y+=this.vy,this.dead=this.x<0||this.x>d||this.y<0||this.y>u}}class A{constructor(){n(this,"left",!1);n(this,"right",!1);n(this,"fire",!1)}}function*C(){const e=`My name is
*Andy ONeill*

*Space* to fire
*Arrows* to move

I am a
software engineer

Check out my code
on *Github*

Find more info
on *LinkedIn*

I enjoy
retro gaming
mechanical keyboards
*programming*
origami
`.toUpperCase().split(`
`);for(let t=0;t<e.length;t++){const r=e[t].split("*");let o=0;const s=[];for(const c of r)s.push({text:c,color:o}),o=(o+1)%2;yield b(s,t)}for(let t=e.length;;t+=2){let r=[];for(let o=2;o<24;o+=4)r.push(new f(t,o,39,0)),r.push(new f(t,o+2,39,1));yield r,r=[];for(let o=3;o<24;o+=4)r.push(new f(t+1,o,39,0)),r.push(new f(t+1,o+2,39,1));yield r}}function b(i,e){const t=[],r=i.reduce((s,c)=>s+c.text.length,0);let o=Math.floor((28-r)/2);for(const s of i)for(const c of s.text){if(c===" "){o++;continue}const a=c.charCodeAt(0)-"A".charCodeAt(0);t.push(new f(e,o,a,s.color)),o++}return t}const k=""+new URL("sprites-88a49a94.png",import.meta.url).href,h=new Image;h.src=k;function M(i){const e=i.getContext("2d");return function(r){e.fillStyle="black",e.fillRect(0,0,d,u);const o=["#887722","#776611","#665500"];for(const a of r.stars)e.fillStyle=o[a.depth],e.fillRect(a.x,Math.floor((a.y+r.tickCount*(.2-.05*a.depth))%u),1,1);e.fillStyle="red";for(const a of r.bullets)e.fillRect(Math.round(a.x),Math.round(a.y),2,6);e.fillStyle="#FF9F07";for(const a of r.enemyBullets)e.fillRect(Math.round(a.x),Math.round(a.y),2,-6);for(const a of r.particles)e.fillStyle=["white","#07FFFF"][a.color],e.fillRect(Math.round(a.x)-1,Math.round(a.y)-1,2,2);for(const a of r.enemies)e.drawImage(h,a.spriteX*8,a.spriteY*8,8,8,Math.round(a.x),Math.round(a.y),8,8);(r.player.mode==="alive"||r.player.mode==="iframe"&&Math.floor(r.tickCount/4)%2===0)&&e.drawImage(h,0,37*8,16,8,Math.round(r.player.x),Math.round(r.player.y),16,8);for(let a=0;a<r.player.lives-1;a++)e.drawImage(h,0,38*8,8,8,16+a*10,35*8,8,8);Math.floor(r.tickCount/32)%2===0&&(e.drawImage(h,8,5*8,8,8,10*8-4,35*8-4,8,8),e.drawImage(h,8,17*8,8,8,11*8-4,35*8-4,8,8),e.drawImage(h,8,4*8,8,8,12*8-4,35*8-4,8,8),e.drawImage(h,8,4*8,8,8,13*8-4,35*8-4,8,8),e.drawImage(h,8,15*8,8,8,15*8-4,35*8-4,8,8),e.drawImage(h,8,11*8,8,8,16*8-4,35*8-4,8,8),e.drawImage(h,8,0*8,8,8,17*8-4,35*8-4,8,8),e.drawImage(h,8,24*8,8,8,18*8-4,35*8-4,8,8));let s=r.player.score,c=0;for(;c===0||s!==0;){const a=s%10;e.drawImage(h,8,(27+a)*8,8,8,d-24-8*c,4,8,8),s=Math.floor(s/10),c++}}}const S=`
attribute vec4 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

void main() {
  gl_Position = a_position;

  v_texcoord = a_texcoord;
}
`,R=`
precision highp float;
uniform vec2 u_resolution;
uniform float u_tickcount;

varying vec2 v_texcoord;

uniform sampler2D u_texture;

vec3 scanline(vec2 coord, vec3 screen)
{
    float intensity = 0.2 * (.75 + 0.25 * sin((coord.y + 2.0 * u_tickcount) / 30.0));
	screen.rgb -= sin(2.0 * 3.1415 * (coord.y + 0.25)) * intensity;
	return screen;
}

vec2 crt(vec2 coord, float bend)
{
	// put in symmetrical coords
	coord = (coord - 0.5) * 2.0;

	coord *= 1.1;	

	// deform coords
	coord.x *= 1.0 + pow((abs(coord.y) / bend), 2.0);
	coord.y *= 1.0 + pow((abs(coord.x) / bend), 2.0);

	// transform back to 0.0 - 1.0 space
	coord  = (coord / 2.0) + 0.5;

	return coord;
}

vec3 sampleSplit(sampler2D tex, vec2 coord)
{
    float intensity = 0.015 * (.75 + 0.25 * sin((coord.y + 2.0 * u_tickcount) / 30.0));
	vec3 frag;
	frag.r = texture2D(tex, vec2(coord.x - intensity * (coord.x - 0.5), coord.y)).r;
	frag.g = texture2D(tex, vec2(coord.x, coord.y)).g;
	frag.b = texture2D(tex, vec2(coord.x + intensity * (coord.x - 0.5), coord.y)).b;
	return frag;
}

void main() {
  vec2 uv = 0.5 * v_texcoord + 0.5;
  vec2 crtCoords = crt(uv, 3.2);

  if (crtCoords.x < 0.0 || crtCoords.x > 1.0 || crtCoords.y < 0.0 || crtCoords.y > 1.0)
		discard;

  gl_FragColor.a = 1.0;// = vec4(0.0, 0.0, 0.0, 1.0);
  gl_FragColor.rgb = sampleSplit(u_texture, crtCoords);

  vec2 screenSpace = crtCoords * ${u}.0;
  gl_FragColor.rgb = scanline(screenSpace, gl_FragColor.rgb);
}
`;function L(i,e){const t=i.getContext("webgl"),r=P(t),o=t.getAttribLocation(r,"a_position");var s=t.getAttribLocation(r,"a_texcoord");const c=t.getUniformLocation(r,"u_resolution"),a=t.getUniformLocation(r,"u_tickcount"),l=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,l),t.enableVertexAttribArray(s),t.vertexAttribPointer(s,2,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);const p=t.createTexture();return t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.bindTexture(t.TEXTURE_2D,p),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),function(w){t.bindTexture(t.TEXTURE_2D,p),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),F(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.useProgram(r),t.enableVertexAttribArray(o),t.bindBuffer(t.ARRAY_BUFFER,l),t.vertexAttribPointer(o,2,t.FLOAT,!1,0,0),t.uniform2f(c,t.canvas.width,t.canvas.height),t.uniform1f(a,w.tickCount),t.drawArrays(t.TRIANGLES,0,6)}}function g(i,e,t){const r=i.createShader(t);if(i.shaderSource(r,e),i.compileShader(r),!i.getShaderParameter(r,i.COMPILE_STATUS)){const s=i.getShaderInfoLog(r);throw i.deleteShader(r),new Error("*** Error compiling shader '"+r+"':"+s+`
`+e.split(`
`).map((c,a)=>`${a+1}: ${c}`).join(`
`))}return r}function D(i,e){const t=i.createProgram();if(e.forEach(function(o){i.attachShader(t,o)}),i.linkProgram(t),!i.getProgramParameter(t,i.LINK_STATUS)){const o=i.getProgramInfoLog(t);throw i.deleteProgram(t),new Error("Error in program linking:"+o)}return t}function P(i){const e=[g(i,S,i.VERTEX_SHADER),g(i,R,i.FRAGMENT_SHADER)];return D(i,e)}function F(i){const e=i.clientWidth|0,t=i.clientHeight|0;return i.width!==e||i.height!==t?(i.width=e,i.height=t,!0):!1}function Y(){const i=new T;document.addEventListener("keydown",c=>{switch(c.key){case"ArrowLeft":i.controls.left=!0;break;case"ArrowRight":i.controls.right=!0;break;case" ":c.repeat||(i.controls.fire=!0);break}}),document.addEventListener("keyup",c=>{switch(c.key){case"ArrowLeft":i.controls.left=!1;break;case"ArrowRight":i.controls.right=!1;break}});const e=document.getElementById("texture"),t=document.getElementById("screen"),r=M(e),o=L(t,e);setInterval(s,1e3/60);function s(){i.tick(),r(i),o(i)}}Y();
