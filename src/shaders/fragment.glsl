precision highp float;

uniform vec2 u_resolution;
uniform float u_tickcount;
uniform vec2 u_dimensions;

varying vec2 v_texcoord;

uniform sampler2D u_texture;

vec3 scanline(vec2 coord, vec3 screen)
{
    float intensity = 0.4 * (.75 + 0.25 * sin((coord.y + 2.0 * u_tickcount) / 30.0)) * 
      (1.0 + 0.1 *sin(2.0 * 3.1415 * (coord.x + 0.25)));
	screen.rgb -= (0.3 + sin(2.0 * 3.1415 * (coord.y + 0.25))) * intensity;
	return screen;
}

vec2 crt(vec2 coord, float bend)
{
	// put in symmetrical coords
	coord = (coord - 0.5) * 2.0;

	coord *= 1.02;	

	// deform coords
	coord.x *= 1.0 + pow((abs(coord.y) / bend), 2.0);
	coord.y *= 1.0 + pow((abs(coord.x) / bend), 2.0);

	// transform back to 0.0 - 1.0 space
	coord  = (coord / 2.0) + 0.5;

	return coord;
}

vec3 sampleSplit(sampler2D tex, vec2 coord)
{
    float intensity = 0.012 * (.8 + 0.2 * sin((coord.y + 2.0 * u_tickcount) / 30.0));
	vec3 frag;
	frag.r = texture2D(tex, vec2(coord.x - intensity * (0.5) + intensity, coord.y)).r;
	frag.g = texture2D(tex, vec2(coord.x + intensity, coord.y)).g;
	frag.b = texture2D(tex, vec2(coord.x + intensity * (0.5) + intensity, coord.y)).b;
	return frag;
}

void main() {
  vec2 uv = 0.5 * v_texcoord + 0.5;
  vec2 crtCoords = crt(uv, 3.2);

  if (crtCoords.x < 0.0 || crtCoords.x > 1.0 || crtCoords.y < 0.0 || crtCoords.y > 1.0)
		discard;

  gl_FragColor.a = 1.0;// = vec4(0.0, 0.0, 0.0, 1.0);
  gl_FragColor.rgb = sampleSplit(u_texture, crtCoords);

  vec2 screenSpace = crtCoords * u_dimensions;
  gl_FragColor.rgb = scanline(screenSpace, gl_FragColor.rgb);
}
