var y=Object.defineProperty;var C=(e,s,o)=>s in e?y(e,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[s]=o;var c=(e,s,o)=>(C(e,typeof s!="symbol"?s+"":s,o),o);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const t of i)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(i){const t={};return i.integrity&&(t.integrity=i.integrity),i.referrerPolicy&&(t.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?t.credentials="include":i.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(i){if(i.ep)return;i.ep=!0;const t=o(i);fetch(i.href,t)}})();const T="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAEwCAYAAAC+KPHjAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kTtIw0Acxr+mig+qgnYQUchQneziC8dahSJUCLVCqw4ml76gSUOS4uIouBYcfCxWHVycdXVwFQTBB4iri5Oii5T4v6TQItaD4358d9/H3XeAUC0yzWqLAJpum4lYVEylV8WOV3ShH72YxojMLGNOkuJoOb7u4ePrXZhntT735+hRMxYDfCJxhBmmTbxBPLNpG5z3iYMsL6vE58TjJl2Q+JHrisdvnHMuCzwzaCYT88RBYjHXxEoTs7ypEU8Rh1RNp3wh5bHKeYuzViyz+j35CwMZfWWZ6zSHEcMiliBBhIIyCijCRphWnRQLCdqPtvAPuX6JXAq5CmDkWEAJGmTXD/4Hv7u1spMTXlIgCrS/OM7HKNCxC9QqjvN97Di1E8D/DFzpDX+pCsx+kl5paKEjoG8buLhuaMoecLkDDD4Zsim7kp+mkM0C72f0TWlg4BboXvN6q+/j9AFIUlfxG+DgEBjLUfZ6i3d3Nvf275l6fz/OiXLLQR8oAQAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+cJEg8YLmUErlQAAAMjSURBVHja7VzLcsMgDDSMZ5z//4H+ZnJSDw0dQiTx0BIwsU91XWEjpNVKiG6b8XLxDRHR/wPnXPrHR/T88XzuU+EgGA8WCwfBcO844fR3qXA8gLfqYJd0wF0H8/xlAG4K8dVlChvEDqS5u2TJuCmNX8ZrCu8ei8MDDhPSL3lISuPuJTz4F9Y88SAiSQ/mVfAwJbbqwLwK/fDAMXbPvd2nQlJcCEKpDrzmA5TxgYOIxtsBOwAHMFKcNK/CBjflWlTatU8vgTHfdQolipx8CiWr0JcfpLExawe1CpwjuI6fwiQ80eJQkBBvEt41VC5JfdTIVGIPvjaU9VsFiDMN4cpX2jcVHsAiU61rT0rzxiYcY/iBhe5ey/gcwBLazFR30rhQkzN5i7DIE2uSbp8jGLkA4+GBpWUQzNVqzhcerJc3mvEgCEnTCUIqP6ilethlDDqQ0CjoQAWUjxcgJrWDGrbexw4gsN5cP4DYQcuXjCvGLZB4Th4XPs8TW4pxC9jBAgXJCw/QhShIZIr1wNlFrIeHlhs45xwRkWSNj0zV/+vxoGYp8Xuu58sbVUssTcDfks70Pk064/vdypEwkGaupS1QR4JmrlddecAAk9YTr2U8db6wgB20VLKwgaWl2ddEb1bFg1odmFtp8FMw1ZFaKpqT1hPP5Y3mL/Dam4mZc6rISeyAs4XSVtuJgqs57Tkv1e1bPygBVZcLbzmvdBbhfnhQE9qdlReYV2GDOlPLdPq5c/WJKkuEHsfQ5ng7jupqdaRUOAZWr8E5F1zT6DQRKnP1NC2gZM+xNCcc8KlUxUbzvvM5u8ZX6k8cts+EJRiQo3m1JHMlfgC1xI+eZcDZgWSN37S/AOGJprhQ25/6MkCrcD9vrLGLBc69m3swMDvfZnc284OF8AC699w1FuANafz/PxhvB13OuZraJ4YZVZPwyufazFig9aGIztRCMHB0XzqqGnxBOqrK7jNpESv+PxCTxYXz9ieaUx4zwTADC8YbW78Esgq79vZb9LOkzD+S9XNU58ZBprg/kXIEI3SFFllf1EGqB9fbUwv3uziQCChpw6sENL+XH9MKgdHSOAAAAABJRU5ErkJggg==",d=28*8,u=36*8,b=`
// an attribute will receive data from a buffer
attribute vec4 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

// all shaders have a main function
void main() {

  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;

  v_texcoord = a_texcoord;
}
`,w=`
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
  // gl_FragColor is a special variable a fragment shader
  // is responsible for setting

  // gl_FragColor = vec4(fract(gl_FragCoord.xy / u_resolution), 0, 1);
  vec2 uv = 0.5 * v_texcoord + 0.5;
  vec2 crtCoords = crt(uv, 3.2);
//   uv.y = 0.5 * uv.y;
if (crtCoords.x < 0.0 || crtCoords.x > 1.0 || crtCoords.y < 0.0 || crtCoords.y > 1.0)
		discard;

  //gl_FragColor = texture2D(u_texture, crtCoords);
  gl_FragColor.a = 1.0;// = vec4(0.0, 0.0, 0.0, 1.0);
  gl_FragColor.rgb = sampleSplit(u_texture, crtCoords);

  vec2 screenSpace = crtCoords * 288.0;
  gl_FragColor.rgb = scanline(screenSpace, gl_FragColor.rgb);
}
`;class S{constructor(){c(this,"tickCount",0);c(this,"player",new D);c(this,"controls",new B);c(this,"bullets",[]);c(this,"enemies",G([{text:"PRESS ",color:0},{text:"SPACE ",color:1},{text:"TO FIRE",color:0}]));c(this,"stars",[]);c(this,"particles",[]);for(let s=0;s<100;s++)this.stars.push(new P)}tick(){this.tickCount++,this.controls.left&&(this.player.x-=2,this.player.x<0&&(this.player.x=0)),this.controls.right&&(this.player.x+=2,this.player.x>d-16&&(this.player.x=d-16)),this.controls.fire&&(this.controls.fire=!1,this.bullets.push(new L(this.player.x+7,this.player.y)));const s=this.tickCount%256;let o=(s<128?s:256-s)/4-16;this.enemies.forEach(r=>r.updatePosition(o)),this.bullets.forEach(r=>{r.tick();const i=this.enemies.find(t=>t.isHit(r.x,r.y));i&&(r.dead=!0,this.enemies=this.enemies.filter(t=>t!==i),this.createExplosion(i.x+4,i.y+4,i.spriteX))}),this.bullets=this.bullets.filter(r=>r.isLive()),this.particles.forEach(r=>r.tick()),this.particles=this.particles.filter(r=>!r.dead)}createExplosion(s,o,r){for(let i=0;i<8;i++){const t=Math.PI/3*Math.random()-Math.PI/1.5,a=Math.random()/2+.5;this.particles.push(new _(s+Math.random()*2,o+Math.random()*2,a*Math.cos(t),a*Math.sin(t),r))}}}class h{constructor(s=0,o=0){c(this,"x");c(this,"y");this.x=s,this.y=o}}class D extends h{constructor(){super(13*8,34*8)}}class R extends h{constructor(o,r,i){super(0,16*8);c(this,"column");c(this,"spriteY");c(this,"spriteX");this.column=o,this.spriteY=r,this.spriteX=i}updatePosition(o){this.x=o+8*this.column}isHit(o,r){return o>=this.x&&o<this.x+8&&r>=this.y&&r<this.y+8}}class L extends h{constructor(o,r){super(o,r);c(this,"dead",!1)}tick(){this.y-=5}isLive(){return this.y>0&&this.y<u&&!this.dead}}class P extends h{constructor(){super(Math.floor(Math.random()*d),Math.floor(Math.random()*u));c(this,"depth");this.depth=Math.floor(Math.random()*3)}}class _ extends h{constructor(o,r,i,t,a){super(o,r);c(this,"vx");c(this,"vy");c(this,"color");c(this,"dead",!1);this.vx=i,this.vy=t,this.color=a}tick(){this.x+=this.vx,this.y+=this.vy,this.dead=this.x<0||this.x>d||this.y<0||this.y>u}}class B{constructor(){c(this,"left",!1);c(this,"right",!1);c(this,"fire",!1)}}function M(){const e=new S,s=new Image;s.src=T,document.addEventListener("keydown",l=>{switch(l.key){case"ArrowLeft":e.controls.left=!0;break;case"ArrowRight":e.controls.right=!0;break;case" ":l.repeat||(e.controls.fire=!0);break}}),document.addEventListener("keyup",l=>{switch(l.key){case"ArrowLeft":e.controls.left=!1;break;case"ArrowRight":e.controls.right=!1;break}});const o=document.getElementById("texture"),r=o.getContext("2d"),t=document.getElementById("screen").getContext("webgl"),a=X(t,[b,w]),f=t.getAttribLocation(a,"a_position");var A=t.getAttribLocation(a,"a_texcoord");const x=t.getUniformLocation(a,"u_resolution"),p=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,p),t.enableVertexAttribArray(A),t.vertexAttribPointer(A,2,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);const g=t.createTexture();t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.bindTexture(t.TEXTURE_2D,g),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,o),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);function m(){t.bindTexture(t.TEXTURE_2D,g),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,o),k(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.useProgram(a),t.enableVertexAttribArray(f),t.bindBuffer(t.ARRAY_BUFFER,p),t.vertexAttribPointer(f,2,t.FLOAT,!1,0,0),t.uniform2f(x,t.canvas.width,t.canvas.height),t.drawArrays(t.TRIANGLES,0,6)}setInterval(E,1e3/60);function E(){e.tick(),v(),m()}function v(){r.fillStyle="black",r.fillRect(0,0,d,u);const l=["#887722","#776611","#665500"];for(const n of e.stars)r.fillStyle=l[n.depth],r.fillRect(n.x,Math.floor((n.y+e.tickCount*(.2-.05*n.depth))%u),1,1);r.drawImage(s,0,37*8,16,8,Math.round(e.player.x),Math.round(e.player.y),16,8),r.fillStyle="red";for(const n of e.bullets)r.fillRect(Math.round(n.x),Math.round(n.y),2,6);for(const n of e.particles)r.fillStyle=["white","#07FFFF"][n.color],r.fillRect(Math.round(n.x)-1,Math.round(n.y)-1,2,2);for(const n of e.enemies)r.drawImage(s,n.spriteX*8,n.spriteY*8,8,8,Math.round(n.x),Math.round(n.y),8,8)}}const F=["VERTEX_SHADER","FRAGMENT_SHADER"];function I(e,s,o){const r=e.createShader(o);if(e.shaderSource(r,s),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){const t=e.getShaderInfoLog(r);return console.error("*** Error compiling shader '"+r+"':"+t+`
`+s.split(`
`).map((a,f)=>`${f+1}: ${a}`).join(`
`)),e.deleteShader(r),null}return r}function U(e,s){const o=e.createProgram();if(s.forEach(function(i){i&&e.attachShader(o,i)}),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)){const i=e.getProgramInfoLog(o);return console.error("Error in program linking:"+i),e.deleteProgram(o),null}return o}function X(e,s){const o=[];for(let r=0;r<s.length;++r)o.push(I(e,s[r],e[F[r]]));return U(e,o)}function k(e,s=1){const o=e.clientWidth*s|0,r=e.clientHeight*s|0;return e.width!==o||e.height!==r?(e.width=o,e.height=r,!0):!1}function G(e){const s=[],o=e.reduce((i,t)=>i+t.text.length,0);let r=Math.floor((28-o)/2);for(const i of e)for(const t of i.text){if(t===" "){r++;continue}const a=t.charCodeAt(0)-"A".charCodeAt(0);s.push(new R(r,a,i.color)),r++}return s}M();
