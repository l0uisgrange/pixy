<script lang="ts">
	import '../app.css';
	import github from '$lib/github-mark.svg';
	import npm from '$lib/npm.svg?raw';
	import githublight from '$lib/github-light.svg';

	let { children } = $props();
</script>

<div class="dark:gray-dark dark:border-neutral-border hidden sticky top-0 left-0 z-10 border-b border-neutral-200 bg-white py-3 dark:bg-neutral-900">
	<div class="mx-auto flex items-center gap-5 px-5 py-2.5">
		<a href="/" class="flex items-center gap-2 text-lg font-medium mr-auto italic font-stretch-110%">Pixy</a>
		<a class="mt-1.5 ml-auto opacity-50 *:w-14 *:h-4 *:dark:fill-white *:fill-current transition hover:opacity-75" href="https://www.npmjs.com/package/@pixy/js" target="_blank">
			{@html npm}
		</a>
		<a class="opacity-50 transition hover:opacity-75" href="https://github.com/l0uisgrange/pixy" target="_blank">
			<img src={github} alt="github" class="size-7 dark:hidden" />
			<img src={githublight} alt="github" class="hidden size-7 dark:block" />
		</a>
	</div>
</div>
{@render children()}
<div class="dark:border-neutral-border flex hidden flex-col border-t border-neutral-200 px-5 py-5 md:flex-row md:items-center md:justify-between">
	<span>A project by <a href="https://github.com/l0uisgrange" class="font-medium">@l0uisgrange</a></span>
	<span class="text-gray-500">Project under MIT license</span>
</div>
