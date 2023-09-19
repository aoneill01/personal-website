var p=Object.defineProperty;var x=(e,r,t)=>r in e?p(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var c=(e,r,t)=>(x(e,typeof r!="symbol"?r+"":r,t),t);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const l=28*8,a=36*8;class m{constructor(){c(this,"tickCount",0);c(this,"player",new E);c(this,"controls",new w);c(this,"bullets",[]);c(this,"enemies",C([{text:"PRESS ",color:0},{text:"SPACE ",color:1},{text:"TO FIRE",color:0}]));c(this,"stars",[]);c(this,"particles",[]);for(let r=0;r<100;r++)this.stars.push(new T)}tick(){this.tickCount++,this.controls.left&&(this.player.x-=2,this.player.x<0&&(this.player.x=0)),this.controls.right&&(this.player.x+=2,this.player.x>l-16&&(this.player.x=l-16)),this.controls.fire&&(this.controls.fire=!1,this.bullets.push(new y(this.player.x+7,this.player.y)));const r=this.tickCount%256;let t=(r<128?r:256-r)/4-16;this.enemies.forEach(o=>o.updatePosition(t)),this.bullets.forEach(o=>{o.tick();const i=this.enemies.find(s=>s.isHit(o.x,o.y));i&&(o.dead=!0,this.enemies=this.enemies.filter(s=>s!==i),this.createExplosion(i.x+4,i.y+4,i.spriteX))}),this.bullets=this.bullets.filter(o=>o.isLive()),this.particles.forEach(o=>o.tick()),this.particles=this.particles.filter(o=>!o.dead)}createExplosion(r,t,o){for(let i=0;i<8;i++){const s=Math.PI/3*Math.random()-Math.PI/1.5,n=Math.random()/2+.5;this.particles.push(new v(r+Math.random()*2,t+Math.random()*2,n*Math.cos(s),n*Math.sin(s),o))}}}class d{constructor(r=0,t=0){c(this,"x");c(this,"y");this.x=r,this.y=t}}class E extends d{constructor(){super(13*8,34*8)}}class g extends d{constructor(t,o,i){super(0,16*8);c(this,"column");c(this,"spriteY");c(this,"spriteX");this.column=t,this.spriteY=o,this.spriteX=i}updatePosition(t){this.x=t+8*this.column}isHit(t,o){return t>=this.x&&t<this.x+8&&o>=this.y&&o<this.y+8}}class y extends d{constructor(t,o){super(t,o);c(this,"dead",!1)}tick(){this.y-=5}isLive(){return this.y>0&&this.y<a&&!this.dead}}class T extends d{constructor(){super(Math.floor(Math.random()*l),Math.floor(Math.random()*a));c(this,"depth");this.depth=Math.floor(Math.random()*3)}}class v extends d{constructor(t,o,i,s,n){super(t,o);c(this,"vx");c(this,"vy");c(this,"color");c(this,"dead",!1);this.vx=i,this.vy=s,this.color=n}tick(){this.x+=this.vx,this.y+=this.vy,this.dead=this.x<0||this.x>l||this.y<0||this.y>a}}class w{constructor(){c(this,"left",!1);c(this,"right",!1);c(this,"fire",!1)}}function C(e){const r=[],t=e.reduce((i,s)=>i+s.text.length,0);let o=Math.floor((28-t)/2);for(const i of e)for(const s of i.text){if(s===" "){o++;continue}const n=s.charCodeAt(0)-"A".charCodeAt(0);r.push(new g(o,n,i.color)),o++}return r}const b="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAEwCAYAAAC+KPHjAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kTtIw0Acxr+mig+qgnYQUchQneziC8dahSJUCLVCqw4ml76gSUOS4uIouBYcfCxWHVycdXVwFQTBB4iri5Oii5T4v6TQItaD4358d9/H3XeAUC0yzWqLAJpum4lYVEylV8WOV3ShH72YxojMLGNOkuJoOb7u4ePrXZhntT735+hRMxYDfCJxhBmmTbxBPLNpG5z3iYMsL6vE58TjJl2Q+JHrisdvnHMuCzwzaCYT88RBYjHXxEoTs7ypEU8Rh1RNp3wh5bHKeYuzViyz+j35CwMZfWWZ6zSHEcMiliBBhIIyCijCRphWnRQLCdqPtvAPuX6JXAq5CmDkWEAJGmTXD/4Hv7u1spMTXlIgCrS/OM7HKNCxC9QqjvN97Di1E8D/DFzpDX+pCsx+kl5paKEjoG8buLhuaMoecLkDDD4Zsim7kp+mkM0C72f0TWlg4BboXvN6q+/j9AFIUlfxG+DgEBjLUfZ6i3d3Nvf275l6fz/OiXLLQR8oAQAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+cJEg8YLmUErlQAAAMjSURBVHja7VzLcsMgDDSMZ5z//4H+ZnJSDw0dQiTx0BIwsU91XWEjpNVKiG6b8XLxDRHR/wPnXPrHR/T88XzuU+EgGA8WCwfBcO844fR3qXA8gLfqYJd0wF0H8/xlAG4K8dVlChvEDqS5u2TJuCmNX8ZrCu8ei8MDDhPSL3lISuPuJTz4F9Y88SAiSQ/mVfAwJbbqwLwK/fDAMXbPvd2nQlJcCEKpDrzmA5TxgYOIxtsBOwAHMFKcNK/CBjflWlTatU8vgTHfdQolipx8CiWr0JcfpLExawe1CpwjuI6fwiQ80eJQkBBvEt41VC5JfdTIVGIPvjaU9VsFiDMN4cpX2jcVHsAiU61rT0rzxiYcY/iBhe5ey/gcwBLazFR30rhQkzN5i7DIE2uSbp8jGLkA4+GBpWUQzNVqzhcerJc3mvEgCEnTCUIqP6ilethlDDqQ0CjoQAWUjxcgJrWDGrbexw4gsN5cP4DYQcuXjCvGLZB4Th4XPs8TW4pxC9jBAgXJCw/QhShIZIr1wNlFrIeHlhs45xwRkWSNj0zV/+vxoGYp8Xuu58sbVUssTcDfks70Pk064/vdypEwkGaupS1QR4JmrlddecAAk9YTr2U8db6wgB20VLKwgaWl2ddEb1bFg1odmFtp8FMw1ZFaKpqT1hPP5Y3mL/Dam4mZc6rISeyAs4XSVtuJgqs57Tkv1e1bPygBVZcLbzmvdBbhfnhQE9qdlReYV2GDOlPLdPq5c/WJKkuEHsfQ5ng7jupqdaRUOAZWr8E5F1zT6DQRKnP1NC2gZM+xNCcc8KlUxUbzvvM5u8ZX6k8cts+EJRiQo3m1JHMlfgC1xI+eZcDZgWSN37S/AOGJprhQ25/6MkCrcD9vrLGLBc69m3swMDvfZnc284OF8AC699w1FuANafz/PxhvB13OuZraJ4YZVZPwyufazFig9aGIztRCMHB0XzqqGnxBOqrK7jNpESv+PxCTxYXz9ieaUx4zwTADC8YbW78Esgq79vZb9LOkzD+S9XNU58ZBprg/kXIEI3SFFllf1EGqB9fbUwv3uziQCChpw6sENL+XH9MKgdHSOAAAAABJRU5ErkJggg==",u=new Image;u.src=b;function S(e){const r=e.getContext("2d");return function(o){r.fillStyle="black",r.fillRect(0,0,l,a);const i=["#887722","#776611","#665500"];for(const s of o.stars)r.fillStyle=i[s.depth],r.fillRect(s.x,Math.floor((s.y+o.tickCount*(.2-.05*s.depth))%a),1,1);r.fillStyle="red";for(const s of o.bullets)r.fillRect(Math.round(s.x),Math.round(s.y),2,6);for(const s of o.particles)r.fillStyle=["white","#07FFFF"][s.color],r.fillRect(Math.round(s.x)-1,Math.round(s.y)-1,2,2);for(const s of o.enemies)r.drawImage(u,s.spriteX*8,s.spriteY*8,8,8,Math.round(s.x),Math.round(s.y),8,8);r.drawImage(u,0,37*8,16,8,Math.round(o.player.x),Math.round(o.player.y),16,8)}}const R=`
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

  vec2 screenSpace = crtCoords * ${a}.0;
  gl_FragColor.rgb = scanline(screenSpace, gl_FragColor.rgb);
}
`;function L(e,r){const t=e.getContext("webgl"),o=B(t),i=t.getAttribLocation(o,"a_position");var s=t.getAttribLocation(o,"a_texcoord");const n=t.getUniformLocation(o,"u_resolution"),h=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,h),t.enableVertexAttribArray(s),t.vertexAttribPointer(s,2,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);const f=t.createTexture();return t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),function(){t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r),M(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.useProgram(o),t.enableVertexAttribArray(i),t.bindBuffer(t.ARRAY_BUFFER,h),t.vertexAttribPointer(i,2,t.FLOAT,!1,0,0),t.uniform2f(n,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6)}}function A(e,r,t){const o=e.createShader(t);if(e.shaderSource(o,r),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS)){const s=e.getShaderInfoLog(o);throw e.deleteShader(o),new Error("*** Error compiling shader '"+o+"':"+s+`
`+r.split(`
`).map((n,h)=>`${h+1}: ${n}`).join(`
`))}return o}function P(e,r){const t=e.createProgram();if(r.forEach(function(i){e.attachShader(t,i)}),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){const i=e.getProgramInfoLog(t);throw e.deleteProgram(t),new Error("Error in program linking:"+i)}return t}function B(e){const r=[A(e,R,e.VERTEX_SHADER),A(e,D,e.FRAGMENT_SHADER)];return P(e,r)}function M(e){const r=e.clientWidth|0,t=e.clientHeight|0;return e.width!==r||e.height!==t?(e.width=r,e.height=t,!0):!1}function _(){const e=new m;document.addEventListener("keydown",n=>{switch(n.key){case"ArrowLeft":e.controls.left=!0;break;case"ArrowRight":e.controls.right=!0;break;case" ":n.repeat||(e.controls.fire=!0);break}}),document.addEventListener("keyup",n=>{switch(n.key){case"ArrowLeft":e.controls.left=!1;break;case"ArrowRight":e.controls.right=!1;break}});const r=document.getElementById("texture"),t=document.getElementById("screen"),o=S(r),i=L(t,r);setInterval(s,1e3/60);function s(){e.tick(),o(e),i()}}_();
