<script lang="ts">
	import GUIReviewAcademicListPage from '@gui/GUIReviewAcademicListPage.svelte';

	export let data;
</script>

<svelte:head>
	<title>Listado de Académicos - ProTrack</title>
</svelte:head>

<GUIReviewAcademicListPage academicList={data.academicList} />