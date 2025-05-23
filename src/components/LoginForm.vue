<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  onsubmit: {
    type: Function,
    required: true,
  },
})

const loading = ref(false)

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

const { handleSubmit, resetForm, meta } = useForm({
  validationSchema: schema,
})

const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField('email')
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField('password')

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
  <form @submit.prevent="onSubmit" novalidate class="login-form">
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" @blur="emailBlur" />
      <p class="error" v-if="emailError">{{ emailError }}</p>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" @blur="passwordBlur" />
      <p class="error" v-if="passwordError">{{ passwordError }}</p>
    </div>

    <button
      type="submit"
      class="btn-submit"
      :disabled="loading || !meta.valid"
    >
      <span v-if="loading">Loading...</span>
      <span v-else>Login</span>
    </button>
  </form>
</template>

<style lang="scss" scoped>
.login-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background: #f7f9fc;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
    }

    input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1.5px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 5px rgba(59, 130, 246, 0.4);
      }
    }

    .error {
      margin-top: 0.25rem;
      color: #e02424;
      font-size: 0.875rem;
      font-weight: 500;
    }
  }

  .btn-submit {
    width: 100%;
    padding: 0.75rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover:not(:disabled) {
      background-color: #2563eb;
    }

    &:disabled {
      background-color: #94a3b8;
      cursor: not-allowed;
    }
  }
}
</style>
