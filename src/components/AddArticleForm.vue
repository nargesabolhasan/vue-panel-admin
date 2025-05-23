<template>
  <div>
    <div class="form-group">
      <label for="title">Title *</label>
      <input
        id="title"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        type="text"
        @blur="titleBlur"
        :class="{ invalid: titleError }"
        aria-describedby="title-error"
      />
      <p id="title-error" v-if="titleError" class="error">{{ titleError }}</p>
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <input
        id="description"
        :value="description"
        @input="$emit('update:description', $event.target.value)"
        type="text"
        @blur="descriptionBlur"
        :class="{ invalid: descriptionError }"
        aria-describedby="description-error"
      />
      <p id="description-error" v-if="descriptionError" class="error">{{ descriptionError }}</p>
    </div>

    <div class="form-group">
      <label for="body">Body</label>
      <textarea
        id="body"
        :value="body"
        @input="$emit('update:body', $event.target.value)"
        rows="5"
        @blur="bodyBlur"
        :class="{ invalid: bodyError }"
        aria-describedby="body-error"
      />
      <p id="body-error" v-if="bodyError" class="error">{{ bodyError }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps<{
  title?: string
  titleError?: string
  titleBlur?: () => void
  description?: string
  descriptionError?: string
  descriptionBlur?: () => void
  body?: string
  bodyError?: string
  bodyBlur?: () => void
}>()

defineEmits<{
  (e: 'update:title', value: string): void
  (e: 'update:description', value: string): void
  (e: 'update:body', value: string): void
}>()
</script>
