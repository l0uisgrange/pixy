import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
const config = {
    sourceDir: path.resolve(__dirname, '../../icons'),
    componentsDir: path.resolve(__dirname, './src/lib/icons'),
    mainIndexFile: path.resolve(__dirname, './src/lib/index.ts'),
};

const main = () => {
    try {
        console.log('--- Starting icon component generation ---');
        ensureDirectoriesExist();

        const svgFiles = getSvgFiles();
        if (svgFiles.length === 0) {
            console.warn('Warning: No SVG files found. Generation stopped.');
            return;
        }

        generateComponentsAndIndex(svgFiles);

        console.log('\n--- Generation complete ---');
    } catch (error) {
        console.error('\nAn error occurred during generation:', error);
    }
};

const ensureDirectoriesExist = () => {
    if (!fs.existsSync(config.componentsDir)) {
        fs.mkdirSync(config.componentsDir, { recursive: true });
    }
};

const getSvgFiles = () => {
    console.log(`Searching for SVG files in: ${config.sourceDir}`);
    return fs.readdirSync(config.sourceDir).filter(file => file.endsWith('.svg'));
};

const generateComponentsAndIndex = (files: string[]) => {
    let indexContent = '';

    files.forEach((file, index) => {
        const iconName = path.parse(file).name;
        const componentName = `${iconName.charAt(0).toUpperCase() + iconName.slice(1)}`;
        const svgFileContent = fs.readFileSync(path.join(config.sourceDir, file), 'utf-8');

        const svgContentMatch = svgFileContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
        const svgContent = svgContentMatch ? svgContentMatch[1].trim() : '';

        const componentContent = `<script lang="ts">\n  import Icon from '../../Icon.svelte';\n</script>\n\n<Icon>${svgContent}</Icon>`;

        fs.writeFileSync(path.join(config.componentsDir, `${componentName}.svelte`), componentContent);

        const progress = `${index + 1}/${files.length}`;
        const percentage = ((index + 1) / files.length * 100).toFixed(0);
        console.log(`[${progress}, ${percentage}%] Generated: ${componentName}.svelte`);

        indexContent += `export { default as ${componentName} } from './icons/${componentName}.svelte';\n`;
    });

    fs.writeFileSync(config.mainIndexFile, indexContent);
    console.log('\nGenerated: index.ts');
};

main();