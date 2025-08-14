import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { optimize, type Plugin } from 'svgo';

const dir = resolve(process.argv[2] || './dist');

(async () => {
    const files = (await readdir(dir)).filter(f => f.toLowerCase().endsWith('.svg'));
    await Promise.all(files.map(async f => {
        const p = join(dir, f);
        const raw = await readFile(p, 'utf8');
        const { data, error } = optimize(raw, {
            path: p,
            multipass: true,
            plugins: [
                'removeDoctype',
                'removeComments',
                'cleanupAttrs',
                'removeMetadata',
                'convertColors',
                'removeUselessDefs',
                'collapseGroups',
                'removeEmptyAttrs',
                'removeEmptyContainers',
                {
                    name: "removeAttrs",
                    params: {
                        attrs: ['stroke', 'stroke-width'],
                        elemSeparator: ":",
                        preserveCurrentColor: false
                    }
                }
            ]
        }) as any;
        if (error) throw new Error(error);
        await writeFile(p, data, 'utf8');
        console.log('Optimized', f);
    }));
    console.log('Done.');
})().catch(e => {
    console.error('Error:', e);
    process.exit(1);
});