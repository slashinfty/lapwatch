import typescript from '@rollup/plugin-typescript';

const config = {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'es',
        name: 'lapwatch',
        entryFileNames: '[name].module.js',
    },
    plugins: [
        typescript()
    ]
};

export default config;