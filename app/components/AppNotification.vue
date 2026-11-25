<script setup>
import { useNotifications } from '~/composables/useNotifications.js'

const { items, dismiss } = useNotifications()
</script>

<template>
  <Teleport to="body">
    <Transition name="notification">
      <div v-if="items.length" class="notification__stack">
        <div
          v-for="item in items"
          :key="item.id"
          class="notification"
          :class="`notification_${item.type}`"
        >
          <span class="notification__text">{{ item.message }}</span>
          <button
            class="notification__close"
            type="button"
            aria-label="Закрыть уведомление"
            @click="dismiss(item.id)"
          >
            ×
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.notification__stack {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 360px;
}

.notification {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: #1f1f1f;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.notification_error {
  border-color: #a53939;
}

.notification_success {
  border-color: #2f7d4f;
}

.notification_info {
  border-color: var(--color-accent);
}

.notification__text {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
}

.notification__close {
  padding: 0;
  background-color: transparent;
  border: none;
  font-size: 18px;
  line-height: 18px;
  color: #9a9a9a;
}

.notification__close:hover {
  color: #ffffff;
}

.notification-enter-active,
.notification-leave-active {
  transition:
    opacity 0.25s ease-in-out,
    transform 0.25s ease-in-out;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
