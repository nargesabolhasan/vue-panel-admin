<script setup lang="ts">
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import TextField from '@/components/inputs/textField/TextField.vue'
import Button from '@/components/buttons/Button.vue'
import { useFetch } from '@/composables/useFetch'
import { showToast } from '@/components/toast/ShowToast.ts'
import { USER_API } from '@/constants/constant.ts'
import { DASHBOARD_ROUTES_NAME, ROUTES } from '@/constants/routes.ts'
import { useRouter } from 'vue-router'

const loading = ref(false)
const { run, error } = useFetch<any>() // Adjust <any> if your API returns typed data

const router = useRouter()

const schema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const { handleSubmit, resetForm, meta } = useForm({
  validationSchema: schema,
})

const {
  value: username,
  errorMessage: usernameError,
  handleBlur: usernameBlur,
} = useField('username')
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField('email')
const {
  value: password,
  errorMessage: passwordError,
  handleBlur: passwordBlur,
} = useField('password')

const onSubmit = handleSubmit(async (values) => {
  loading.value = true

  try {
    const response = await run(USER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (response) {
      showToast('success', 'Account Created', 'You have signed up successfully.')
      resetForm()
      router.push(ROUTES.LOGIN)
    } else {
      showToast('danger', 'Signup Failed', error || 'Unknown error')
    }
  } catch (err) {
    showToast('danger', 'Error', 'Something went wrong. Please try again.')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" novalidate class="form-wrapper w-full">
    <TextField
      id="username"
      v-model="username"
      type="text"
      @blur="usernameBlur"
      title="Username"
      :error="usernameError"
    />
    <TextField
      id="email"
      v-model="email"
      type="email"
      @blur="emailBlur"
      title="Email"
      :error="emailError"
    />
    <TextField
      id="password"
      v-model="password"
      type="password"
      @blur="passwordBlur"
      title="Password"
      :error="passwordError"
    />
    <Button
      type="submit"
      :disabled="loading || !meta.valid"
      title="Sign Up"
      color="primary"
      :loading="loading"
      spinnerColor="gray"
      spinnerSize="sm"
      class="w-full"
    />
  </form>
</template>

<style lang="scss" scoped></style>
