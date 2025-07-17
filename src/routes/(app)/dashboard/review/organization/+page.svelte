<script lang="ts">
	import GUIReviewOrganizationListPage from '@gui/GUIReviewOrganizationListPage.svelte';

	export let data;
</script>

<svelte:head>
	<title>Listado de Organizaciones - ProTrack</title>
</svelte:head>

<GUIReviewOrganizationListPage organizationList={data.organizationList} />
