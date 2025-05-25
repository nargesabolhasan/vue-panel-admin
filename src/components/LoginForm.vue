<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import Button from '@/components/buttons/Button.vue'
import TextField from '@/components/inputs/textField/TextField.vue'

const props = defineProps({
  onsubmit: {
    type: Function,
    required: true,
  },
})

const loading = ref(false)

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const { handleSubmit, resetForm, meta } = useForm({
  validationSchema: schema,
})

const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField('email')
const {
  value: password,
  errorMessage: passwordError,
  handleBlur: passwordBlur,
} = useField('password')

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  try {
    await props.onsubmit(values)
    resetForm()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" novalidate class="form-wrapper">
    <TextField
      id="email"
      v-model="email"
      type="email"
      @blur="emailBlur"
      :error="emailError"
      title="Email"
      placeholder="Enter email"
    />
    <TextField
      id="password"
      v-model="password"
      type="password"
      @blur="passwordBlur"
      :error="passwordError"
      title="Password"
      placeholder="Enter Password"
    />
    <Button
      title="Save"
      :disabled="loading || !meta.valid"
      color="primary"
      :loading="loading"
      type="submit"
      spinnerColor="gray"
      spinnerSize="sm"
      class="w-full"
    />
  </form>
</template>
