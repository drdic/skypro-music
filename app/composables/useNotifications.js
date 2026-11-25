import { readonly, ref } from 'vue'

const items = ref([])
let counter = 0

export function useNotifications() {
  function notify(message, type = 'error') {
    counter += 1
    const id = counter
    items.value = [...items.value, { id, message, type }]

    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        dismiss(id)
      }, 4000)
    }

    return id
  }

  function dismiss(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  return {
    items: readonly(items),
    notify,
    dismiss,
  }
}
