import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    iconDir: path.resolve(__dirname, '../Icon.tsx'),
    iconFinalDir: path.resolve(__dirname, './../src/Icon.tsx'),
    sourceDir: path.resolve(__dirname, '../../static/icons'),
    componentsDir: path.resolve(__dirname, './../src/icons'),
    mainIndexFile: path.resolve(__dirname, './../src/index.ts'),
};

const toPascalCase = (str: string): string => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};

const main = async () => {
    try {
        console.log('——— Starting React components generation');
        fs.mkdirSync(config.componentsDir, { recursive: true });
        fs.copyFileSync(config.iconDir, config.iconFinalDir);
        const svgFiles = fs.readdirSync(config.sourceDir).filter(file => file.endsWith('.svg'));
        let indexContent = ``;
        for (const file of svgFiles) {
            const index = svgFiles.indexOf(file);
            const componentName = toPascalCase(path.parse(file).name);
            const svgFileContent = fs.readFileSync(path.join(config.sourceDir, file), 'utf-8');

            const svgContentMatch = svgFileContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
            const svgContent = svgContentMatch ? svgContentMatch[1].trim() : '';

            const componentContent = `import * as React from 'react';
import Icon from './../Icon';

export default function ${componentName}(props: React.ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            ${svgContent}
        </Icon>
    );
}`;

            fs.writeFileSync(path.join(config.componentsDir, `${componentName}.tsx`), componentContent);

            const progress = `${index + 1}/${svgFiles.length}`;
            const percentage = ((index + 1) / svgFiles.length * 100).toFixed(0);
            console.log(`[${progress}, ${percentage}%] Generated: ${componentName}.tsx`);

            indexContent += `export { default as ${componentName} } from './icons/${componentName}.js';\n`;
        }

        fs.writeFileSync(config.mainIndexFile, indexContent);
        console.log('\n Generated: index.ts');
        console.log('\n——— Generation complete');
    } catch (error) {
        console.error('\nAn error occurred during generation:', error);
    }
};

// @ts-ignore
await main();