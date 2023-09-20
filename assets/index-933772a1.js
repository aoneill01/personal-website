var x=Object.defineProperty;var g=(o,e,t)=>e in o?x(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var n=(o,e,t)=>(g(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const d=28*8,u=36*8;class w{constructor(){n(this,"tickCount",0);n(this,"player",new E);n(this,"controls",new _);n(this,"bullets",[]);n(this,"enemyBullets",[]);n(this,"enemies",I());n(this,"stars",[]);n(this,"particles",[]);for(let e=0;e<100;e++)this.stars.push(new T)}tick(){this.tickCount++,this.controls.left&&this.player.mode!=="dead"&&(this.player.x-=2,this.player.x<0&&(this.player.x=0)),this.controls.right&&this.player.mode!=="dead"&&(this.player.x+=2,this.player.x>d-16&&(this.player.x=d-16)),this.controls.fire&&this.player.mode==="alive"&&this.bullets.push(new m(this.player.x+7,this.player.y)),this.controls.fire=!1,this.player.tick(this.tickCount),this.enemies.forEach(e=>{e.tick(this.tickCount),e.fireCountdown===0&&this.enemyBullets.push(new m(e.x+3,e.y+8,2)),e.mode==="dive"&&this.player.isHit(e.x+4,e.y+4)&&this.player.kill(this.tickCount)&&this.createExplosion2(this.player.x+8,this.player.y+4)}),this.enemies=this.enemies.filter(e=>e.isLive()),this.bullets.forEach(e=>{e.tick();const t=this.enemies.find(r=>r.isHit(e.x,e.y));t&&(e.dead=!0,this.enemies=this.enemies.filter(r=>r!==t),this.createExplosion1(t.x+4,t.y+4,t.spriteX),this.player.score+=10)}),this.bullets=this.bullets.filter(e=>e.isLive()),this.enemyBullets.forEach(e=>{e.tick(),this.player.isHit(e.x,e.y)&&this.player.kill(this.tickCount)&&(e.dead=!0,this.createExplosion2(this.player.x+8,this.player.y+4))}),this.enemyBullets=this.enemyBullets.filter(e=>e.isLive()),this.particles.forEach(e=>e.tick()),this.particles=this.particles.filter(e=>!e.dead)}createExplosion1(e,t,r){for(let i=0;i<8;i++){const s=Math.PI/3*Math.random()-Math.PI/1.5,c=Math.random()/2+1;this.particles.push(new p(e+Math.random()*2,t+Math.random()*2,c*Math.cos(s),c*Math.sin(s),r))}}createExplosion2(e,t){for(let r=0;r<16;r++){const i=2*Math.PI*Math.random(),s=Math.random()/2+1;this.particles.push(new p(e+Math.random()*2,t+Math.random()*2,s*Math.cos(i),s*Math.sin(i),0))}}}class f{constructor(e=0,t=0){n(this,"x");n(this,"y");this.x=e,this.y=t}}class E extends f{constructor(){super(13*8,33*8);n(this,"lives",5);n(this,"mode","alive");n(this,"deathTickCount");n(this,"score",0)}tick(t){switch(this.mode){case"dead":this.deathTickCount+60<=t&&(this.mode="iframe"),this.lives===0&&(this.lives=5,this.score=0);break;case"iframe":this.deathTickCount+60+120<=t&&(this.mode="alive");break}}kill(t){return this.mode!=="alive"?!1:(this.mode="dead",this.lives--,this.deathTickCount=t,!0)}isHit(t,r){return t>=this.x&&t<this.x+16&&r>=this.y&&r<this.y+8}}class v extends f{constructor(t,r,i,s){super(u,d);n(this,"row");n(this,"column");n(this,"spriteY");n(this,"spriteX");n(this,"fireCountdown",1);n(this,"mode","waiting");n(this,"targetY");n(this,"targetX");n(this,"startY");n(this,"startX");n(this,"startTickCount");this.row=t,this.column=r,this.spriteY=i,this.spriteX=s}tick(t){const c={x:this.row%2===0?-8:d,y:32},a={x:this.row%2===0?d:0,y:0};let l;switch(this.mode!=="waiting"&&((this.fireCountdown??-1)<0&&(this.fireCountdown=Math.floor(Math.random()*60*15)+60*5),this.fireCountdown--),this.mode){case"waiting":this.calculateY(t)<184&&(this.targetY=this.calculateY(t+100+this.column*8),this.targetX=this.calculateX(t+100+this.column*8),this.startTickCount=t+this.column*8,this.mode="flyIn");break;case"flyIn":l=(t-this.startTickCount)/100,this.y=(1-l)**2*c.y+2*(1-l)*l*a.y+l**2*this.targetY,this.x=(1-l)**2*c.x+2*(1-l)*l*a.x+l**2*this.targetX,l>=1&&(this.mode="group");break;case"group":this.y=this.calculateY(t),this.x=this.calculateX(t),this.y-this.column<=8&&(this.mode="dive",this.startTickCount=t,this.startX=this.x,this.startY=this.y,this.targetX=Math.random()*d,this.targetY=u);break;case"dive":l=(t-this.startTickCount)/200,this.y=(1-l)**2*this.startY+2*(1-l)*l*c.y+l**2*this.targetY,this.x=(1-l)**2*this.startX+2*(1-l)*l*c.x+l**2*this.targetX,l>1&&(this.mode="dead");break}}isHit(t,r){return t>=this.x&&t<this.x+8&&r>=this.y&&r<this.y+8}calculateY(t){const r=Math.floor(t/16);return 20*8-r+16*this.row}calculateX(t){const i=Math.floor(t/4)%64;return(i<32?i:64-i)-16+8*this.column}isLive(){return this.mode!=="dead"}}class m extends f{constructor(t,r,i=-5){super(t,r);n(this,"dead",!1);n(this,"velocity");this.velocity=i}tick(){this.y+=this.velocity}isLive(){return this.y>0&&this.y<u&&!this.dead}}class T extends f{constructor(){super(Math.floor(Math.random()*d),Math.floor(Math.random()*u));n(this,"depth");this.depth=Math.floor(Math.random()*3)}}class p extends f{constructor(t,r,i,s,c){super(t,r);n(this,"vx");n(this,"vy");n(this,"color");n(this,"dead",!1);this.vx=i,this.vy=s,this.color=c}tick(){this.x+=this.vx,this.y+=this.vy,this.dead=this.x<0||this.x>d||this.y<0||this.y>u}}class _{constructor(){n(this,"left",!1);n(this,"right",!1);n(this,"fire",!1)}}function I(){const o=[],t=`Welcome My name is
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
electronics
origami

I worked at
*Scratch*`.toUpperCase().split(`
`);for(let r=0;r<t.length;r++){const i=t[r].split("*");let s=0;const c=[];for(const a of i)c.push({text:a,color:s}),s=(s+1)%2;o.push(...A(c,r))}return o}function A(o,e){const t=[],r=o.reduce((s,c)=>s+c.text.length,0);let i=Math.floor((28-r)/2);for(const s of o)for(const c of s.text){if(c===" "){i++;continue}const a=c.charCodeAt(0)-"A".charCodeAt(0);t.push(new v(e,i,a,s.color)),i++}return t}const C=""+new URL("sprites-88a49a94.png",import.meta.url).href,h=new Image;h.src=C;function b(o){const e=o.getContext("2d");return function(r){e.fillStyle="black",e.fillRect(0,0,d,u);const i=["#887722","#776611","#665500"];for(const a of r.stars)e.fillStyle=i[a.depth],e.fillRect(a.x,Math.floor((a.y+r.tickCount*(.2-.05*a.depth))%u),1,1);e.fillStyle="red";for(const a of r.bullets)e.fillRect(Math.round(a.x),Math.round(a.y),2,6);e.fillStyle="#FF9F07";for(const a of r.enemyBullets)e.fillRect(Math.round(a.x),Math.round(a.y),2,-6);for(const a of r.particles)e.fillStyle=["white","#07FFFF"][a.color],e.fillRect(Math.round(a.x)-1,Math.round(a.y)-1,2,2);for(const a of r.enemies)e.drawImage(h,a.spriteX*8,a.spriteY*8,8,8,Math.round(a.x),Math.round(a.y),8,8);(r.player.mode==="alive"||r.player.mode==="iframe"&&Math.floor(r.tickCount/4)%2===0)&&e.drawImage(h,0,37*8,16,8,Math.round(r.player.x),Math.round(r.player.y),16,8);for(let a=0;a<r.player.lives-1;a++)e.drawImage(h,0,38*8,8,8,16+a*10,35*8,8,8);Math.floor(r.tickCount/32)%2===0&&(e.drawImage(h,8,5*8,8,8,10*8-4,35*8-4,8,8),e.drawImage(h,8,17*8,8,8,11*8-4,35*8-4,8,8),e.drawImage(h,8,4*8,8,8,12*8-4,35*8-4,8,8),e.drawImage(h,8,4*8,8,8,13*8-4,35*8-4,8,8),e.drawImage(h,8,15*8,8,8,15*8-4,35*8-4,8,8),e.drawImage(h,8,11*8,8,8,16*8-4,35*8-4,8,8),e.drawImage(h,8,0*8,8,8,17*8-4,35*8-4,8,8),e.drawImage(h,8,24*8,8,8,18*8-4,35*8-4,8,8));let s=r.player.score,c=0;for(;c===0||s!==0;){const a=s%10;e.drawImage(h,8,(27+a)*8,8,8,d-24-8*c,4,8,8),s=Math.floor(s/10),c++}}}const M=`
attribute vec4 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

void main() {
  gl_Position = a_position;

  v_texcoord = a_texcoord;
}
`,S=`
precision highp float;
uniform vec2 u_resolution;

varying vec2 v_texcoord;

uniform sampler2D u_texture;

vec3 scanline(vec2 coord, vec3 screen)
{
	screen.rgb -= sin(2.0 * 3.1415 * (coord.y + 0.25)) * 0.15;
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
	vec3 frag;
	frag.r = texture2D(tex, vec2(coord.x - 0.015 * (coord.x - 0.5), coord.y)).r;
	frag.g = texture2D(tex, vec2(coord.x, coord.y)).g;
	frag.b = texture2D(tex, vec2(coord.x + 0.015 * (coord.x - 0.5), coord.y)).b;
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
`;function R(o,e){const t=o.getContext("webgl"),r=L(t),i=t.getAttribLocation(r,"a_position");var s=t.getAttribLocation(r,"a_texcoord");const c=t.getUniformLocation(r,"u_resolution"),a=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,a),t.enableVertexAttribArray(s),t.vertexAttribPointer(s,2,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);const l=t.createTexture();return t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.bindTexture(t.TEXTURE_2D,l),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),function(){t.bindTexture(t.TEXTURE_2D,l),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),D(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.useProgram(r),t.enableVertexAttribArray(i),t.bindBuffer(t.ARRAY_BUFFER,a),t.vertexAttribPointer(i,2,t.FLOAT,!1,0,0),t.uniform2f(c,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6)}}function y(o,e,t){const r=o.createShader(t);if(o.shaderSource(r,e),o.compileShader(r),!o.getShaderParameter(r,o.COMPILE_STATUS)){const s=o.getShaderInfoLog(r);throw o.deleteShader(r),new Error("*** Error compiling shader '"+r+"':"+s+`
`+e.split(`
`).map((c,a)=>`${a+1}: ${c}`).join(`
`))}return r}function k(o,e){const t=o.createProgram();if(e.forEach(function(i){o.attachShader(t,i)}),o.linkProgram(t),!o.getProgramParameter(t,o.LINK_STATUS)){const i=o.getProgramInfoLog(t);throw o.deleteProgram(t),new Error("Error in program linking:"+i)}return t}function L(o){const e=[y(o,M,o.VERTEX_SHADER),y(o,S,o.FRAGMENT_SHADER)];return k(o,e)}function D(o){const e=o.clientWidth|0,t=o.clientHeight|0;return o.width!==e||o.height!==t?(o.width=e,o.height=t,!0):!1}function P(){const o=new w;document.addEventListener("keydown",c=>{switch(c.key){case"ArrowLeft":o.controls.left=!0;break;case"ArrowRight":o.controls.right=!0;break;case" ":c.repeat||(o.controls.fire=!0);break}}),document.addEventListener("keyup",c=>{switch(c.key){case"ArrowLeft":o.controls.left=!1;break;case"ArrowRight":o.controls.right=!1;break}});const e=document.getElementById("texture"),t=document.getElementById("screen"),r=b(e),i=R(t,e);setInterval(s,1e3/60);function s(){o.tick(),r(o),i()}}P();
