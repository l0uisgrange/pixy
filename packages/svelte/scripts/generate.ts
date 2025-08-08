import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    sourceDir: path.resolve(__dirname, '../../../icons'),
    componentsDir: path.resolve(__dirname, './../src/lib/icons'),
    mainIndexFile: path.resolve(__dirname, './../src/lib/index.ts'),
    preprocessSourceFile: path.resolve(__dirname, './preprocess.ts'),
    preprocessDestFile: path.resolve(__dirname, './../src/lib/preprocess.ts')
};

const main = async () => {
    try {
        console.log('——— Starting Svelte components generation');
        fs.mkdirSync(config.componentsDir, { recursive: true });
        fs.copyFileSync(config.preprocessSourceFile, config.preprocessDestFile);
        const svgFiles = fs.readdirSync(config.sourceDir).filter(file => file.endsWith('.svg'));
        let indexContent = `// @ts-nocheck\n export { pixy } from './preprocess.js';\n\n`;
        for (const file of svgFiles) {
            const index = svgFiles.indexOf(file);
            const iconName = path.parse(file).name;
            const componentName = `${iconName.charAt(0).toUpperCase() + iconName.slice(1)}`;
            const svgFileContent = fs.readFileSync(path.join(config.sourceDir, file), 'utf-8');

            const svgContentMatch = svgFileContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
            const svgContent = svgContentMatch ? svgContentMatch[1].trim() : '';

            const componentContent = `<script lang="ts">
    import Icon from '../../Icon.svelte';
    import type { SVGAttributes } from 'svelte/elements';

    let rest: SVGAttributes<SVGElement> = $props();
</script>

<Icon {...rest}>
    ${svgContent}
</Icon>`;

            fs.writeFileSync(path.join(config.componentsDir, `${componentName}.svelte`), componentContent);

            const progress = `${index + 1}/${svgFiles.length}`;
            const percentage = ((index + 1) / svgFiles.length * 100).toFixed(0);
            console.log(`[${progress}, ${percentage}%] Generated: ${componentName}.svelte`);

            indexContent += `export { default as ${componentName} } from './icons/${componentName}.svelte';\n`;
        }

        fs.writeFileSync(config.mainIndexFile, indexContent);
        console.log('\n Generated: index.ts');
        console.log('\n——— Generation complete');
    } catch (error) {
        console.error('\nAn error occurred during generation:', error);
    }
};

await main();