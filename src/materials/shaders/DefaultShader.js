
export default class Default {

    getVertexShader () {

        return `attribute vec3 a_position;
        attribute vec3 a_normal;
        attribute vec2 a_uv;
        uniform mat4 proj;
        uniform mat4 model;
        uniform mat4 tmodel;
        varying highp vec2 vTextureCoord;
        varying vec3 v_normal;
        void main() {
        
            mat4 modelProjection = proj * model;
            vTextureCoord = a_uv;
            vec4 position = modelProjection * vec4(a_position.x, a_position.y, a_position.z, 1.0);
            gl_Position = position;
        
            v_normal = mat3(tmodel) * a_normal; 
        }`
    }

    getFragmentShader () {

        return `
        precision mediump float;
        uniform vec3 lPos;
        uniform sampler2D uSampler;
        varying highp vec2 vTextureCoord;
        varying vec3 v_normal;
        void main() {
        
            vec3 reverseLight = -lPos;
            vec3 normal = normalize(v_normal);
            float light = dot(normal, lPos);
        
            gl_FragColor = texture2D(uSampler, vTextureCoord);
            // gl_FragColor = vec4(normal.x,0,0,1);
            gl_FragColor.rgb *= light;
        }`
    }

}