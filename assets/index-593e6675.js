var X=Object.defineProperty;var G=(n,t,e)=>t in n?X(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var s=(n,t,e)=>(G(n,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const H=""+new URL("explosion-7516296b.wav",import.meta.url).href,x="data:audio/wav;base64,UklGRiENAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0Yf0MAABWX2hweYGJkZmhqauknpiRi4V/eXNuaGNdWFNaYmtze4OLk5ujq6mjnJaQioR/eXNtaGJdWFRaYmtze4OLk5uiqaqknZeRi4WAenVvamRfWVRYYGlxeYGIkJifp6umoJqUjoiDfXdybGdiXVhVW2RsdHuDi5KaoaiqpJ6Yk42Hgnx3cWxnYl1YVVxka3N7g4qRmaCnqqWfmZSOiYN+eHNuaWNeWVVZYWhweH+HjpWco6qoopyXkYyHgXx3cWxnYl1YVVtjanJ5gYiPlp2kqqeinJaRjIaBfHdybWhjXllWWmJpcXh/ho2Um6KpqaOdmJONiIN+eXRvamVgXFhXXmZtdHuCiZCXnaSqpqGclpGMh4J9eHNuaWVgXFdYX2ZudXyDiZCXnaSppqGcl5KNiIN+eXRva2ZiXVlXXWVsc3mAh46Um6GnqKOemZSPioWAe3dybmlkYFxXWWBnbnV8gomPlpyiqKeinZiTjomFgHt3cm1pZGFcWFlfZm10eoGHjpSaoKaoo5+alZCLhoJ9eHRwa2djXlpXXGNqcHd9g4qQlpyiqKeinZiTj4qFgXx4c29rZ2NfWldcY2pwdn2DiY+Vm6Gnp6KemZSQi4aCfnl1cW1oZGBdWVlgZm1zeX+Fi5GXnaOopaGcmJOOioaBfXl1cWxoZGBcWVpgZmxzeX+FipCWnKGnpqGdmZSQi4eDfnp2cm5qZmJeW1hdY2lvdXuBh42SmJ2jp6SgnJeTj4qGgn56dnJuamZiX1tZXWNpb3V7gIaMkZecoaeloZ2YlJCLh4N/e3h0cGxoZGFdWlpgZmxyeH2DiI6TmJ6jp6Sfm5eTj4uHg397d3NvbGhlYV5aW2FmbHJ3fYKIjZKXnKGmpKCcmJSQjIiEgHx5dXFuamdjYF1aXWNobnN5foOJjpOYnaKmpJ+bl5OPjIiEgH15dXJua2dkYV1aXWJobXN4fYKHjJGWm6ClpaGdmZWRjYmGgn97d3RwbWlnY2BdWl5kaW50eX6DiI2SlpugpKSgnZmVkY2KhoN/fHh1cW5raGRhXltdYmdscXZ7gIWKj5OYnaGlo5+bl5SQjImFgn97eHRxbmtoZWFeW11iZ2xxdnuAhYmOkpecoKSjoJyYlZGOioeDgH15dnNwbWpnY2BdW15jaG1yd3yAhYqOk5eboKSjn5yYlZGOi4eEgX16d3RxbmtoZWJfXF1iZ2twdXp+g4eMkJSZnaGkop6bl5SQjYqHg4B9end0cW5raGViYF1dYWZrcHR5fYGGio6Tl5ufo6OfnJmVko+LiIWCf3x5dnNwbWpoZWJfXV5iZ2twdHl9gYaKjpKWmp6io6CcmZaTj4yJhoOAfXp3dHJvbGlnZGFfXWBkaW1xdnp+goeLjpKWmp6iop+cmZaSj4yJhoOAfnt4dXNwbWpoZWNgXl5jZ2twdHh8gISIjJCUmJufoqGem5iVko+MiYaDgH17eHVzcG5raGZjYV9eYmZqb3N3e3+DhoqOkpWZnaCin5yZlpORjouIhYKAfXp4dXNwbmtpZmRhX15iZmpucnZ6foGFiY2QlJebnqGhnpuYlZKPjIqHhIF/fHp3dXJwbmtpZmRiYF9iZmpucnZ5fYGEiIyPk5aZnaChnpuZlpOQjouIhoOBfnt5d3RycG1raWdkYmBfY2dqbnJ2eX2BhIiLj5KVmJyfoZ+cmZaUkY6MiYeEgn99enh2c3FvbWtoZmRiYGBkZ2tvcnZ5fYCEh4uOkZSXm56hn5yal5SSj42KiIWDgH58end1c3FvbGpoZmRiYGFkaGxvc3Z6fYCDh4qNkJOWmZyfn5yal5WSkI2LiYaEgoB9e3l3dXNxbmxraWdlY2FiZWlsb3N2eXyAg4aJjI+SlZianZ+dmpiWk5GOjIqIhYOBf317eXd1c3FvbWtpZ2ZkYmJlaWxvcnV5fH+ChYiKjZCTlpibnp6bmZeUkpCOi4mHhYOBf317eXd1c3FvbmxqaGdlY2JlaGtvcnV4e32Ag4aJi46Rk5aZm52cmpiVk5GPjYuJh4WDgX99e3l3dnRycG9ta2poZmVjZWhrbnFzdnl8f4GEh4mMjpGTlpibnZuZl5WTkY+Ni4mHhYOBf358enh2dXNxcG5ta2poZmVkZmlsb3F0d3p8f4GEhomLjpCSlZeZm5uZl5WTkY+Ni4mHhoSCgH99e3p4dnVzcnBvbWxqaWdmZWdqbG9ydHd5fH6Bg4WIioyPkZOVl5mbmZeVk5GQjoyKiYeFg4KAfn17enh3dXRycW9ubWtqaWdmZ2lsbnFzdnh7fX+ChIaIioyPkZOVl5mamJaUk5GPjYyKiIeFhIKBf358e3l4dnVzcnFwbm1samloZ2hqbW9ydHZ4e31/gYOFh4mLjY+Rk5WXmZiWlZORkI6Mi4mIhoWDgoB/fXx7eXh3dXRzcnBvbm1samloaGpsb3FzdXd5e36AgoSFh4mLjY+Rk5SWmJeWlJKRj46Mi4mIh4WEgoGAfn18e3l4d3Z0c3JxcG9ubGtqaWlrbW9xc3V3eXt9f4GDhIaIiouNj5GSlJWXlpSTkZCPjYyKiYiGhYSCgYB/fnx7enl4d3V0c3JxcG9ubWxrampsbnBydHV3eXt9f4CChIWHiYqMjo+RkpSVlpSTkpCPjoyLioiHhoWDgoGAf359fHp5eHd2dXRzcnFwb29ubWxra21vcXN0dnh6e31/gIKDhYaIiouMjo+RkpOVlJOSkI+OjIuKiYiHhYSDgoGAf359fHt6eXh3dnV0c3JycXBvbm1tbG1vcHJ0dXd5enx9f4CCg4WGh4mKjI2Oj5GSk5SSkZCPjoyLiomIh4aFhIOCgYB/fn18e3p5eHh3dnV0c3NycXBwb25tbW5wcnN1dnh5enx9f4CBg4SFh4iJioyNjo+QkZKSkZCPjoyLiomIh4aFhISDgoGAf359fXx7enl4eHd2dXV0c3JycXBwb25ub3FydHV2eHl6fH1+gIGCg4SGh4iJiouMjY6PkJGRkI+OjYyLiomIh4aFhISDgoGAf39+fXx8e3p5eXh3d3Z1dXRzc3JycXBwb3Bxc3R1d3h5ent9fn+AgYKDhIWGh4iJiouMjY6PkJCPjo2Mi4qKiYiHhoWFhIOCgoGAf39+fX18e3t6eXl4d3d2dnV1dHNzcnJxcXBxc3R1dnd4eXp8fX5/gIGCg4SFhYaHiImKi4yNjY6Pjo6NjIuKiomIh4eGhYSEg4KCgYCAf39+fX18e3t6enl5eHh3d3Z2dXV0dHNzcnJyc3R1dnd4eXp7fH1+f4CBgYKDhIWGhoeIiYqKi4yMjY6NjIuLiomJiIeHhoWFhIODgoKBgIB/f35+fX18fHt7enp5eXh4d3d3dnZ1dXR0dHNzdHV2d3d4eXp7fH19fn+AgYGCg4SEhYaGh4iIiYqKi4uMjIuLiomJiIiHhoaFhYSEg4OCgoGBgIB/f35+fX18fHt7e3p6eXl5eHh4d3d2dnZ1dXV0dXV2d3h5eXp7e3x9fn5/gICBgoKDhISFhYaGh4iIiYmKiouKiomJiIiHh4aGhYWEhIODgoKCgYGAgH9/f35+fX19fHx8e3t7enp6eXl5eHh4eHd3d3Z2dnZ3d3h5eXp7e3x8fX5+f3+AgIGCgoODhISFhYaGhoeHiIiJiYmJiIiHh4aGhoWFhISEg4OCgoKBgYGAgIB/f39+fn59fX18fHx8e3t7enp6enl5eXl5eHh4eHd3eHh5eXp6e3t8fH19fn5/f4CAgYGCgoKDg4SEhIWFhYaGh4eHiIiHh4eGhoWFhYSEhIODg4KCgoKBgYGAgICAf39/fn5+fn59fX19fHx8fHx7e3t7e3p6enp6enl5eXl5eXp6e3t7fHx9fX1+fn9/f4CAgIGBgYKCgoODg4SEhISFhYWFhoaGhoaFhYWEhISEg4ODg4KCgoKBgYGBgICAgIB/f39/f35+fn5+fn19fX19fXx8fHx8fHx7e3t7e3t7e3p6ent7e3x8fH19fX5+fn5/f39/gICAgIGBgYGCgoKCgoODg4ODhISEhISEhISEhIODg4ODgoKCgoKBgYGBgYGAgICAgICAf39/f39/f35+fn5+fn5+fn59fX19fX19fX19fXx8fHx8fHx8fHx8fX19fX5+fn5+fn9/f39/gICAgICAgIGBgYGBgYGCgoKCgoKCgoKDg4OCgoKCgoKCgoGBgYGBgYGBgYCAgICAgICAgICAf39/f39/f39/f39/f39/fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn9/f39/f39/f39/gICAgICAgICAgICAgICAgICAgYGBgYGBgYGBgYGBgYCAgICAgICAgICAgICAgICAgICAgICAgIB/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+A",C="data:audio/wav;base64,UklGRlgGAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YTQGAACkoqCenJqYlpSSkI6MioiHhYOBgH58enl3dnRycW9ubGtpaGZlZGJhYF5dd6SioJ6cmpiWlZORj46MiomHhYSCgX9+fHt5eHZ1dHJxcG5tbGppaGdlZGNiYV9eeKOhoJ6cm5mXlpSTkZCOjYuKiIeFhIOBgH99fHt5eHd2dHNycXBvbWxramloZ2ZlZGNiYWBwo6Ggnp2bmpiXlZSTkZCPjYyLiYiHhoSDgoGAf358e3p5eHd2dXRzcnFwb25tbGtqamloZ2ZlZWRjYmGKoaCfnZybmpiXlpWTkpGQj46Mi4qJiIeGhYSDgoGAf359fHt6enl4d3Z1dHRzcnFwcG9ubW1sa2tqaWhoZ2ZmZWVkY4qgn56dnJuamZeWlZSTkpGQj46NjYyLiomIh4aFhYSDgoGAgH9+fX18e3p6eXh4d3Z2dXR0c3JycXFwb29ubm1tbGxramppaWhoaGdnZmZ7n56dnZybmpmYl5aVlJSTkpGQj4+OjYyMi4qJiYiHhoaFhISDgoKBgYB/f35+fXx8e3t6enl5eHd3dnZ1dXV0dHNzcnJxcXFwcG9vb25ubW1tbGxsa2trampqaWlpaG+enZycm5qZmZiXlpaVlJSTkpKRkJCPjo6NjYyLi4qKiYiIh4eGhoWFhISDg4KCgYGAgH9/f35+fX18fHx7e3p6enl5eXh4eHd3d3Z2dnV1dXR0dHNzc3NycnJycXFxcXBwcHBvb29vb25ubm5ubW1tbW1sbGxsbGyQm5uampmYmJeXlpaVlZSTk5KSkZGQkI+Pjo6OjY2MjIuLioqKiYmIiIiHh4aGhoWFhYSEhIODg4KCgoGBgYCAgH9/f39+fn59fX19fHx8fHt7e3t6enp6enl5eXl5eHh4eHh3d3d3d3d2dnZ2dnZ1dXV1dXV1dHR0dHR0dHRzc3Nzc3Nzc3NycnJycnJycnJycnFxcXFxcXFxcXFxcXFxcXBwcHB6mZiYl5eXlpaVlZWUlJOTk5KSkpGRkJCQj4+Pjo6OjY2NjIyMjIuLi4qKioqJiYmIiIiIh4eHh4aGhoaGhYWFhYSEhISEg4ODg4OCgoKCgoGBgYGBgYCAgICAgIB/f39/f39+fn5+fn5+fn19fX19fX19fXx8fHx8fHx8fHt7e3t7e3t7e3t7e3p6enp6enp6enp6enp6enl5eXl5eXl5eXl5eXl5eXl5eXl5eXh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eIKTk5OSkpKSkZGRkZCQkJCPj4+Pj46Ojo6OjY2NjY2MjIyMjIyLi4uLi4qKioqKioqJiYmJiYmIiIiIiIiIh4eHh4eHh4eGhoaGhoaGhoaFhYWFhYWFhYWEhISEhISEhISEhIODg4ODg4ODg4ODg4OCgoKCgoKCgoKCgoKCgoKBgYGBgYGBgYGBgYGBgYGBgYGAgICAgICAgICAgICAgICAgICAgICAgICAgH9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+A",l=28*8,d=36*8,A=new Audio(H),Z=new Audio(x),S=new Audio(C);class W{constructor(){s(this,"tickCount",0);s(this,"player",new b);s(this,"controls",new B);s(this,"bullets",[]);s(this,"enemyBullets",[]);s(this,"enemies",[]);s(this,"enemyGenerator");s(this,"stars",[]);s(this,"particles",[]);this.enemyGenerator=w(),this.enemies.push(...this.enemyGenerator.next().value),this.enemies.push(...this.enemyGenerator.next().value);for(let t=0;t<100;t++)this.stars.push(new k)}tick(){this.tickCount++,this.tickCount%(16*8)===0&&this.enemies.push(...this.enemyGenerator.next().value),this.controls.left&&this.player.mode!=="dead"&&(this.player.x-=2,this.player.x<0&&(this.player.x=0)),this.controls.right&&this.player.mode!=="dead"&&(this.player.x+=2,this.player.x>l-16&&(this.player.x=l-16)),this.controls.fire&&this.player.mode==="alive"&&(this.bullets.push(new p(this.player.x+7,this.player.y)),Z.play()),this.controls.fire=!1,this.player.tick(this.tickCount),this.enemies.forEach(t=>{t.tick(this.tickCount),t.fireCountdown===0&&this.enemyBullets.length<8&&this.enemyBullets.push(new p(t.x+3,t.y+8,2)),t.mode==="dive"&&this.player.isHit(t.x+4,t.y+4)&&this.player.kill(this.tickCount)&&this.createExplosion2(this.player.x+8,this.player.y+4)}),this.enemies=this.enemies.filter(t=>t.isLive()),this.bullets.forEach(t=>{t.tick();const e=this.enemies.find(o=>o.isHit(t.x,t.y));e&&(t.dead=!0,this.enemies=this.enemies.filter(o=>o!==e),this.createExplosion1(e.x+4,e.y+4,e.spriteX),this.player.score+=10,S.play())}),this.bullets=this.bullets.filter(t=>t.isLive()),this.enemyBullets.forEach(t=>{t.tick(),this.player.isHit(t.x,t.y)&&this.player.kill(this.tickCount)&&(t.dead=!0,this.createExplosion2(this.player.x+8,this.player.y+4))}),this.enemyBullets=this.enemyBullets.filter(t=>t.isLive()),this.particles.forEach(t=>t.tick()),this.particles=this.particles.filter(t=>!t.dead)}createExplosion1(t,e,o){for(let i=0;i<8;i++){const r=Math.PI/3*Math.random()-Math.PI/1.5,a=Math.random()/2+1;this.particles.push(new I(t+Math.random()*2,e+Math.random()*2,a*Math.cos(r),a*Math.sin(r),o))}}createExplosion2(t,e){for(let o=0;o<16;o++){const i=2*Math.PI*Math.random(),r=Math.random()/2+1;this.particles.push(new I(t+Math.random()*2,e+Math.random()*2,r*Math.cos(i),r*Math.sin(i),0))}}}class m{constructor(t=0,e=0){s(this,"x");s(this,"y");this.x=t,this.y=e}}class b extends m{constructor(){super(13*8,33*8);s(this,"lives",5);s(this,"mode","alive");s(this,"deathTickCount");s(this,"score",0)}tick(e){switch(this.mode){case"dead":this.deathTickCount+60<=e&&(this.mode="iframe"),this.lives===0&&(this.lives=5,this.score=0);break;case"iframe":this.deathTickCount+60+120<=e&&(this.mode="alive");break}}kill(e){return this.mode!=="alive"?!1:(this.mode="dead",this.lives--,this.deathTickCount=e,A.play(),!0)}isHit(e,o){return e>=this.x&&e<this.x+16&&o>=this.y&&o<this.y+8}}class g extends m{constructor(e,o,i,r){super(d,l);s(this,"row");s(this,"column");s(this,"spriteY");s(this,"spriteX");s(this,"fireCountdown",1);s(this,"mode","waiting");s(this,"targetY");s(this,"targetX");s(this,"startY");s(this,"startX");s(this,"startTickCount");this.row=e,this.column=o,this.spriteY=i,this.spriteX=r}tick(e){const a={x:this.row%2===0?-8:l,y:32},f={x:this.row%2===0?l:0,y:0};let h;switch(this.mode!=="waiting"&&((this.fireCountdown??-1)<0&&(this.fireCountdown=Math.floor(Math.random()*60*15)+60*5),this.fireCountdown--),this.mode){case"waiting":this.calculateY(e)<184&&(this.targetY=this.calculateY(e+100+this.column*8),this.targetX=this.calculateX(e+100+this.column*8),this.startTickCount=e+this.column*8,this.mode="flyIn");break;case"flyIn":h=(e-this.startTickCount)/100,this.y=(1-h)**2*a.y+2*(1-h)*h*f.y+h**2*this.targetY,this.x=(1-h)**2*a.x+2*(1-h)*h*f.x+h**2*this.targetX,h>=1&&(this.mode="group");break;case"group":this.y=this.calculateY(e),this.x=this.calculateX(e),this.y-this.column<=8&&(this.mode="dive",this.startTickCount=e,this.startX=this.x,this.startY=this.y,this.targetX=Math.random()*l,this.targetY=d);break;case"dive":h=(e-this.startTickCount)/200,this.y=(1-h)**2*this.startY+2*(1-h)*h*a.y+h**2*this.targetY,this.x=(1-h)**2*this.startX+2*(1-h)*h*a.x+h**2*this.targetX,h>1&&(this.mode="dead");break}}isHit(e,o){return this.mode==="flyIn"?!1:e>=this.x&&e<this.x+8&&o>=this.y&&o<this.y+8}calculateY(e){const o=Math.floor(e/16);return 20*8-o+16*this.row}calculateX(e){const i=Math.floor(e/4)%64;return(i<32?i:64-i)-16+8*this.column}isLive(){return this.mode!=="dead"}}class p extends m{constructor(e,o,i=-5){super(e,o);s(this,"dead",!1);s(this,"velocity");this.velocity=i}tick(){this.y+=this.velocity}isLive(){return this.y>0&&this.y<d&&!this.dead}}class k extends m{constructor(){super(Math.floor(Math.random()*l),Math.floor(Math.random()*d));s(this,"depth");this.depth=Math.floor(Math.random()*3)}}class I extends m{constructor(e,o,i,r,a){super(e,o);s(this,"vx");s(this,"vy");s(this,"color");s(this,"dead",!1);this.vx=i,this.vy=r,this.color=a}tick(){this.x+=this.vx,this.y+=this.vy,this.dead=this.x<0||this.x>l||this.y<0||this.y>d}}class B{constructor(){s(this,"left",!1);s(this,"right",!1);s(this,"fire",!1)}}function*w(){const t=`My name is
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
`);for(let e=0;e<t.length;e++){const o=t[e].split("*");let i=0;const r=[];for(const a of o)r.push({text:a,color:i}),i=(i+1)%2;yield F(r,e)}for(let e=t.length;;e+=2){let o=[];for(let i=2;i<24;i+=4)o.push(new g(e,i,39,0)),o.push(new g(e,i+2,39,1));yield o,o=[];for(let i=3;i<24;i+=4)o.push(new g(e+1,i,39,0)),o.push(new g(e+1,i+2,39,1));yield o}}function F(n,t){const e=[],o=n.reduce((r,a)=>r+a.text.length,0);let i=Math.floor((28-o)/2);for(const r of n)for(const a of r.text){if(a===" "){i++;continue}const f=a.charCodeAt(0)-"A".charCodeAt(0);e.push(new g(t,i,f,r.color)),i++}return e}const E=""+new URL("sprites-88a49a94.png",import.meta.url).href,c=new Image;c.src=E;function R(n){const t=n.getContext("2d");return function(o){t.fillStyle="black",t.fillRect(0,0,l,d);const i=["#887722","#776611","#665500"];for(const f of o.stars)t.fillStyle=i[f.depth],t.fillRect(f.x,Math.floor((f.y+o.tickCount*(.2-.05*f.depth))%d),1,1);t.fillStyle="red";for(const f of o.bullets)t.fillRect(Math.round(f.x),Math.round(f.y),2,6);t.fillStyle="#FF9F07";for(const f of o.enemyBullets)t.fillRect(Math.round(f.x),Math.round(f.y),2,-6);for(const f of o.particles)t.fillStyle=["white","#07FFFF"][f.color],t.fillRect(Math.round(f.x)-1,Math.round(f.y)-1,2,2);for(const f of o.enemies)t.drawImage(c,f.spriteX*8,f.spriteY*8,8,8,Math.round(f.x),Math.round(f.y),8,8);(o.player.mode==="alive"||o.player.mode==="iframe"&&Math.floor(o.tickCount/4)%2===0)&&t.drawImage(c,0,37*8,16,8,Math.round(o.player.x),Math.round(o.player.y),16,8);for(let f=0;f<o.player.lives-1;f++)t.drawImage(c,0,38*8,8,8,16+f*10,35*8,8,8);Math.floor(o.tickCount/32)%2===0&&(t.drawImage(c,8,5*8,8,8,10*8-4,35*8-4,8,8),t.drawImage(c,8,17*8,8,8,11*8-4,35*8-4,8,8),t.drawImage(c,8,4*8,8,8,12*8-4,35*8-4,8,8),t.drawImage(c,8,4*8,8,8,13*8-4,35*8-4,8,8),t.drawImage(c,8,15*8,8,8,15*8-4,35*8-4,8,8),t.drawImage(c,8,11*8,8,8,16*8-4,35*8-4,8,8),t.drawImage(c,8,0*8,8,8,17*8-4,35*8-4,8,8),t.drawImage(c,8,24*8,8,8,18*8-4,35*8-4,8,8));let r=o.player.score,a=0;for(;a===0||r!==0;){const f=r%10;t.drawImage(c,8,(27+f)*8,8,8,l-24-8*a,4,8,8),r=Math.floor(r/10),a++}}}const v=`
attribute vec4 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

void main() {
  gl_Position = a_position;

  v_texcoord = a_texcoord;
}
`,K=`
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

  vec2 screenSpace = crtCoords * ${d}.0;
  gl_FragColor.rgb = scanline(screenSpace, gl_FragColor.rgb);
}
`;function j(n,t){const e=n.getContext("webgl"),o=J(e),i=e.getAttribLocation(o,"a_position");var r=e.getAttribLocation(o,"a_texcoord");const a=e.getUniformLocation(o,"u_resolution"),f=e.getUniformLocation(o,"u_tickcount"),h=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,h),e.enableVertexAttribArray(r),e.vertexAttribPointer(r,2,e.FLOAT,!1,0,0),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);const u=e.createTexture();return e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.bindTexture(e.TEXTURE_2D,u),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),function(Y){e.bindTexture(e.TEXTURE_2D,u),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),O(e.canvas),e.viewport(0,0,e.canvas.width,e.canvas.height),e.useProgram(o),e.enableVertexAttribArray(i),e.bindBuffer(e.ARRAY_BUFFER,h),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0),e.uniform2f(a,e.canvas.width,e.canvas.height),e.uniform1f(f,Y.tickCount),e.drawArrays(e.TRIANGLES,0,6)}}function y(n,t,e){const o=n.createShader(e);if(n.shaderSource(o,t),n.compileShader(o),!n.getShaderParameter(o,n.COMPILE_STATUS)){const r=n.getShaderInfoLog(o);throw n.deleteShader(o),new Error("*** Error compiling shader '"+o+"':"+r+`
`+t.split(`
`).map((a,f)=>`${f+1}: ${a}`).join(`
`))}return o}function T(n,t){const e=n.createProgram();if(t.forEach(function(i){n.attachShader(e,i)}),n.linkProgram(e),!n.getProgramParameter(e,n.LINK_STATUS)){const i=n.getProgramInfoLog(e);throw n.deleteProgram(e),new Error("Error in program linking:"+i)}return e}function J(n){const t=[y(n,v,n.VERTEX_SHADER),y(n,K,n.FRAGMENT_SHADER)];return T(n,t)}function O(n){const t=n.clientWidth|0,e=n.clientHeight|0;return n.width!==t||n.height!==e?(n.width=t,n.height=e,!0):!1}function D(){const n=new W;document.addEventListener("keydown",a=>{switch(a.key){case"ArrowLeft":n.controls.left=!0;break;case"ArrowRight":n.controls.right=!0;break;case" ":a.preventDefault(),a.repeat||(n.controls.fire=!0);break}}),document.addEventListener("keyup",a=>{switch(a.key){case"ArrowLeft":n.controls.left=!1;break;case"ArrowRight":n.controls.right=!1;break}});const t=document.getElementById("texture"),e=document.getElementById("screen"),o=R(t),i=j(e,t);setInterval(r,1e3/60);function r(){n.tick(),o(n),i(n)}}D();
