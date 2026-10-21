import {defineConfig} from 'vite';
export default defineConfig({define:{"process.env.NODE_ENV":"\"production\""},esbuild:{jsx:'automatic'},build:{minify:true,target:'es2022',outDir:'../public/assets/modern',emptyOutDir:true,lib:{entry:'main.tsx',formats:['es'],fileName:()=> 'munshi.js',cssFileName:'munshi'},rollupOptions:{output:{codeSplitting:false}}}});
