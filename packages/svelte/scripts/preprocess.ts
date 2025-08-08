export const pixy = () => {
    return {
        name: 'pixy',
        apply: 'build',
        transform: ({ content }) => {
            let changed = false;

            const newContent = content.replace(
                /import\s+{\s*([^}]+?)\s*}\s*from\s*['"]@pixy\/svelte['"]/g,
                (match, p1) => {
                    const icons = p1.split(',').map(s => s.trim()).filter(Boolean);
                    if (icons.length > 0) {
                        changed = true;
                        return icons
                            .map(icon => `import ${icon} from '@pixy/svelte/dist/icons/${icon}.svelte';`)
                            .join('\n');
                    }
                    return match;
                }
            );

            if (changed) {
                return { code: newContent };
            }
            return null;
        }
    };
};