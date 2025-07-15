<script>
  import GUISignInPage from '@gui/GUISignInPage.svelte';

  export let data;
</script>

<svelte:head>
	<title>Iniciar Sesión - ProTrack</title>
</svelte:head>

<GUISignInPage data={data.form} />