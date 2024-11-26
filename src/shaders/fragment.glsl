uniform sampler2D uTexture;
uniform float u_tickcount;
varying vec2 vUv;

vec3 scanline(vec2 coord, vec3 screen)
{
	float intensity = 0.25 * (.75 + 0.25 * sin((coord.y + 200.0 * u_tickcount) / 30.0)) * 
		(1.0 + 0.1 *sin(2.0 * 3.1415 * (coord.x + 0.25)));
	screen.rgb -= (0.3 + sin(2.0 * 3.1415 * (coord.y + 0.25))) * intensity;
	return screen;
}

vec3 sampleSplit(sampler2D tex, vec2 coord)
{
	float intensity = 0.003 * sin(5.0 * coord.y + 5.0 * u_tickcount);
	vec3 frag;
	frag.r = texture2D(tex, vec2(coord.x - intensity, coord.y)).r;
	frag.g = texture2D(tex, coord).g;
	frag.b = texture2D(tex, vec2(coord.x + intensity, coord.y)).b;
	return frag;
}

void main() {
	gl_FragColor.a = 1.0;
	gl_FragColor.rgb = sampleSplit(uTexture, vUv);

	vec2 screenSpace = vUv * vec2(224.0, 288.0);
	gl_FragColor.rgb = scanline(screenSpace, gl_FragColor.rgb);
}