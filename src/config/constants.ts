export const vertexShader =
  '\t\t\tvarying vec2 vUv;\n' +
  '\n' +
  '\t\t\tvoid main() {\n' +
  '\n' +
  '\t\t\t\tvUv = uv;\n' +
  '\n' +
  '\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n' +
  '\n' +
  '\t\t\t}';

export const fragmentShader =
  '\t\t\tuniform sampler2D baseTexture;\n' +
  '\t\t\tuniform sampler2D bloomTexture;\n' +
  '\n' +
  '\t\t\tvarying vec2 vUv;\n' +
  '\n' +
  '\t\t\tvoid main() {\n' +
  '\n' +
  '\t\t\t\tgl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );\n' +
  '\n' +
  '\t\t\t}';
