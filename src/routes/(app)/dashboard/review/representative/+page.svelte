<script lang="ts">
	import GUIReviewRepresentativeListPage from '@gui/GUIReviewRepresentativeListPage.svelte';

	export let data;
</script>

<svelte:head>
	<title>Listado de Representantes - ProTrack</title>
</svelte:head>

<GUIReviewRepresentativeListPage representativeList={data.representativeList} />
