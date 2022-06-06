import App from './App.svelte';

const app = new App({
	target: document.querySelector('#cash-machine-ui') as Element,
});

export default app;