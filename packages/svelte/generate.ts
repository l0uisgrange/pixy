import * as fs from 'fs';
import * as path from 'path';

const srcDir = '../../icons';
const componentsDir = './src/icons';
const indexFile = './src/index.ts';

if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.svg'));
let indexContent = '';

files.forEach(file => {
    const iconName = path.parse(file).name;
    const componentName = `${iconName.charAt(0).toUpperCase() + iconName.slice(1)}`;
    const svgFileContent = fs.readFileSync(path.join(srcDir, file), 'utf-8');

    const svgContentMatch = svgFileContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
    const svgContent = svgContentMatch ? svgContentMatch[1].trim() : '';

    const componentContent = `<script lang="ts">\n  import Icon from '../../Icon.svelte';\n</script>\n\n<Icon src={\`${svgContent}\`} />`;

    fs.writeFileSync(path.join(componentsDir, `${componentName}.svelte`), componentContent);
    console.log(`Généré : ${componentName}.svelte`);

    indexContent += `export { default as ${componentName} } from './icons/${componentName}.svelte';\n`;
});

fs.writeFileSync(indexFile, indexContent);
console.log('Fichier index.ts généré.');

console.log('Génération terminée.');