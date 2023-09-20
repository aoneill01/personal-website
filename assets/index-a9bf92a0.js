var p=Object.defineProperty;var x=(r,e,t)=>e in r?p(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var n=(r,e,t)=>(x(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const l=28*8,h=36*8;class m{constructor(){n(this,"tickCount",0);n(this,"player",new g);n(this,"controls",new v);n(this,"bullets",[]);n(this,"enemies",C());n(this,"stars",[]);n(this,"particles",[]);for(let e=0;e<100;e++)this.stars.push(new w)}tick(){this.tickCount++,this.controls.left&&(this.player.x-=2,this.player.x<0&&(this.player.x=0)),this.controls.right&&(this.player.x+=2,this.player.x>l-16&&(this.player.x=l-16)),this.controls.fire&&(this.controls.fire=!1,this.bullets.push(new y(this.player.x+7,this.player.y))),this.enemies.forEach(e=>e.tick(this.tickCount)),this.bullets.forEach(e=>{e.tick();const t=this.enemies.find(s=>s.isHit(e.x,e.y));t&&(e.dead=!0,this.enemies=this.enemies.filter(s=>s!==t),this.createExplosion(t.x+4,t.y+4,t.spriteX))}),this.bullets=this.bullets.filter(e=>e.isLive()),this.particles.forEach(e=>e.tick()),this.particles=this.particles.filter(e=>!e.dead)}createExplosion(e,t,s){for(let i=0;i<8;i++){const o=Math.PI/3*Math.random()-Math.PI/1.5,c=Math.random()/2+1;this.particles.push(new T(e+Math.random()*2,t+Math.random()*2,c*Math.cos(o),c*Math.sin(o),s))}}}class d{constructor(e=0,t=0){n(this,"x");n(this,"y");this.x=e,this.y=t}}class g extends d{constructor(){super(13*8,34*8)}}class E extends d{constructor(t,s,i,o){super(h,l);n(this,"row");n(this,"column");n(this,"spriteY");n(this,"spriteX");n(this,"mode","waiting");n(this,"targetY");n(this,"targetX");n(this,"startTickCount");this.row=t,this.column=s,this.spriteY=i,this.spriteX=o}tick(t){const o={x:this.row%2===0?-8:l,y:32},c={x:this.row%2===0?l:0,y:0};switch(this.mode){case"waiting":this.calculateY(t)<184&&(this.targetY=this.calculateY(t+100+this.column*8),this.targetX=this.calculateX(t+100+this.column*8),this.startTickCount=t+this.column*8,this.mode="flyIn");break;case"flyIn":const a=(t-this.startTickCount)/100;this.y=(1-a)**2*o.y+2*(1-a)*a*c.y+a**2*this.targetY,this.x=(1-a)**2*o.x+2*(1-a)*a*c.x+a**2*this.targetX,a>=1&&(this.mode="group");break;case"group":this.y=this.calculateY(t),this.x=this.calculateX(t);break}}isHit(t,s){return t>=this.x&&t<this.x+8&&s>=this.y&&s<this.y+8}calculateY(t){const s=Math.floor(t/16);return 20*8-s+16*this.row}calculateX(t){const i=Math.floor(t/4)%64;return(i<32?i:64-i)-16+8*this.column}}class y extends d{constructor(t,s){super(t,s);n(this,"dead",!1)}tick(){this.y-=5}isLive(){return this.y>0&&this.y<h&&!this.dead}}class w extends d{constructor(){super(Math.floor(Math.random()*l),Math.floor(Math.random()*h));n(this,"depth");this.depth=Math.floor(Math.random()*3)}}class T extends d{constructor(t,s,i,o,c){super(t,s);n(this,"vx");n(this,"vy");n(this,"color");n(this,"dead",!1);this.vx=i,this.vy=o,this.color=c}tick(){this.x+=this.vx,this.y+=this.vy,this.dead=this.x<0||this.x>l||this.y<0||this.y>h}}class v{constructor(){n(this,"left",!1);n(this,"right",!1);n(this,"fire",!1)}}function C(){const r=[],t=`Welcome My name is
*Andy ONeill*

*Space* to fire
*x* and *x* to move

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
`);for(let s=0;s<t.length;s++){const i=t[s].split("*");let o=0;const c=[];for(const a of i)c.push({text:a,color:o}),o=(o+1)%2;r.push(...b(c,s))}return r}function b(r,e){const t=[],s=r.reduce((o,c)=>o+c.text.length,0);let i=Math.floor((28-s)/2);for(const o of r)for(const c of o.text){if(c===" "){i++;continue}const a=c.charCodeAt(0)-"A".charCodeAt(0);t.push(new E(e,i,a,o.color)),i++}return t}const S="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAEwCAYAAAC+KPHjAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kTtIw0Acxr+mig+qgnYQUchQneziC8dahSJUCLVCqw4ml76gSUOS4uIouBYcfCxWHVycdXVwFQTBB4iri5Oii5T4v6TQItaD4358d9/H3XeAUC0yzWqLAJpum4lYVEylV8WOV3ShH72YxojMLGNOkuJoOb7u4ePrXZhntT735+hRMxYDfCJxhBmmTbxBPLNpG5z3iYMsL6vE58TjJl2Q+JHrisdvnHMuCzwzaCYT88RBYjHXxEoTs7ypEU8Rh1RNp3wh5bHKeYuzViyz+j35CwMZfWWZ6zSHEcMiliBBhIIyCijCRphWnRQLCdqPtvAPuX6JXAq5CmDkWEAJGmTXD/4Hv7u1spMTXlIgCrS/OM7HKNCxC9QqjvN97Di1E8D/DFzpDX+pCsx+kl5paKEjoG8buLhuaMoecLkDDD4Zsim7kp+mkM0C72f0TWlg4BboXvN6q+/j9AFIUlfxG+DgEBjLUfZ6i3d3Nvf275l6fz/OiXLLQR8oAQAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+cJEg8YLmUErlQAAAMjSURBVHja7VzLcsMgDDSMZ5z//4H+ZnJSDw0dQiTx0BIwsU91XWEjpNVKiG6b8XLxDRHR/wPnXPrHR/T88XzuU+EgGA8WCwfBcO844fR3qXA8gLfqYJd0wF0H8/xlAG4K8dVlChvEDqS5u2TJuCmNX8ZrCu8ei8MDDhPSL3lISuPuJTz4F9Y88SAiSQ/mVfAwJbbqwLwK/fDAMXbPvd2nQlJcCEKpDrzmA5TxgYOIxtsBOwAHMFKcNK/CBjflWlTatU8vgTHfdQolipx8CiWr0JcfpLExawe1CpwjuI6fwiQ80eJQkBBvEt41VC5JfdTIVGIPvjaU9VsFiDMN4cpX2jcVHsAiU61rT0rzxiYcY/iBhe5ey/gcwBLazFR30rhQkzN5i7DIE2uSbp8jGLkA4+GBpWUQzNVqzhcerJc3mvEgCEnTCUIqP6ilethlDDqQ0CjoQAWUjxcgJrWDGrbexw4gsN5cP4DYQcuXjCvGLZB4Th4XPs8TW4pxC9jBAgXJCw/QhShIZIr1wNlFrIeHlhs45xwRkWSNj0zV/+vxoGYp8Xuu58sbVUssTcDfks70Pk064/vdypEwkGaupS1QR4JmrlddecAAk9YTr2U8db6wgB20VLKwgaWl2ddEb1bFg1odmFtp8FMw1ZFaKpqT1hPP5Y3mL/Dam4mZc6rISeyAs4XSVtuJgqs57Tkv1e1bPygBVZcLbzmvdBbhfnhQE9qdlReYV2GDOlPLdPq5c/WJKkuEHsfQ5ng7jupqdaRUOAZWr8E5F1zT6DQRKnP1NC2gZM+xNCcc8KlUxUbzvvM5u8ZX6k8cts+EJRiQo3m1JHMlfgC1xI+eZcDZgWSN37S/AOGJprhQ25/6MkCrcD9vrLGLBc69m3swMDvfZnc284OF8AC699w1FuANafz/PxhvB13OuZraJ4YZVZPwyufazFig9aGIztRCMHB0XzqqGnxBOqrK7jNpESv+PxCTxYXz9ieaUx4zwTADC8YbW78Esgq79vZb9LOkzD+S9XNU58ZBprg/kXIEI3SFFllf1EGqB9fbUwv3uziQCChpw6sENL+XH9MKgdHSOAAAAABJRU5ErkJggg==",u=new Image;u.src=S;function L(r){const e=r.getContext("2d");return function(s){e.fillStyle="black",e.fillRect(0,0,l,h);const i=["#887722","#776611","#665500"];for(const o of s.stars)e.fillStyle=i[o.depth],e.fillRect(o.x,Math.floor((o.y+s.tickCount*(.2-.05*o.depth))%h),1,1);e.fillStyle="red";for(const o of s.bullets)e.fillRect(Math.round(o.x),Math.round(o.y),2,6);for(const o of s.particles)e.fillStyle=["white","#07FFFF"][o.color],e.fillRect(Math.round(o.x)-1,Math.round(o.y)-1,2,2);for(const o of s.enemies)e.drawImage(u,o.spriteX*8,o.spriteY*8,8,8,Math.round(o.x),Math.round(o.y),8,8);e.drawImage(u,0,37*8,16,8,Math.round(s.player.x),Math.round(s.player.y),16,8)}}const R=`
attribute vec4 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

void main() {
  gl_Position = a_position;

  v_texcoord = a_texcoord;
}
`,D=`
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

  vec2 screenSpace = crtCoords * ${h}.0;
  gl_FragColor.rgb = scanline(screenSpace, gl_FragColor.rgb);
}
`;function I(r,e){const t=r.getContext("webgl"),s=M(t),i=t.getAttribLocation(s,"a_position");var o=t.getAttribLocation(s,"a_texcoord");const c=t.getUniformLocation(s,"u_resolution"),a=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,a),t.enableVertexAttribArray(o),t.vertexAttribPointer(o,2,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);const f=t.createTexture();return t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),function(){t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),B(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.useProgram(s),t.enableVertexAttribArray(i),t.bindBuffer(t.ARRAY_BUFFER,a),t.vertexAttribPointer(i,2,t.FLOAT,!1,0,0),t.uniform2f(c,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6)}}function A(r,e,t){const s=r.createShader(t);if(r.shaderSource(s,e),r.compileShader(s),!r.getShaderParameter(s,r.COMPILE_STATUS)){const o=r.getShaderInfoLog(s);throw r.deleteShader(s),new Error("*** Error compiling shader '"+s+"':"+o+`
`+e.split(`
`).map((c,a)=>`${a+1}: ${c}`).join(`
`))}return s}function _(r,e){const t=r.createProgram();if(e.forEach(function(i){r.attachShader(t,i)}),r.linkProgram(t),!r.getProgramParameter(t,r.LINK_STATUS)){const i=r.getProgramInfoLog(t);throw r.deleteProgram(t),new Error("Error in program linking:"+i)}return t}function M(r){const e=[A(r,R,r.VERTEX_SHADER),A(r,D,r.FRAGMENT_SHADER)];return _(r,e)}function B(r){const e=r.clientWidth|0,t=r.clientHeight|0;return r.width!==e||r.height!==t?(r.width=e,r.height=t,!0):!1}function P(){const r=new m;document.addEventListener("keydown",c=>{switch(c.key){case"ArrowLeft":r.controls.left=!0;break;case"ArrowRight":r.controls.right=!0;break;case" ":c.repeat||(r.controls.fire=!0);break}}),document.addEventListener("keyup",c=>{switch(c.key){case"ArrowLeft":r.controls.left=!1;break;case"ArrowRight":r.controls.right=!1;break}});const e=document.getElementById("texture"),t=document.getElementById("screen"),s=L(e),i=I(t,e);setInterval(o,1e3/60);function o(){r.tick(),s(r),i()}}P();
