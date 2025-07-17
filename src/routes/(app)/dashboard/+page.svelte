<script>
	import GUIDashboardPage from '@gui/GUIDashboardPage.svelte';

	export let data;
</script>

<svelte:head>
	<title>Dashboard - ProTrack</title>
</svelte:head>

<GUIDashboardPage {data} />

