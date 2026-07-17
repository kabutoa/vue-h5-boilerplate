export const useConfigStore = defineStore('config', () => {
  const loading = ref({
    mask: true,
    text: 'Loading...',
    visible: true,
  })

  return { loading }
})
