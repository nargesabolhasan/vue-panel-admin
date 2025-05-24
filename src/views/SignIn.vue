<script setup>
import SignUpForm from '@/components/SignInForm.vue'

async function handleSignUpSubmit(formData) {
  console.log('SignUp form submitted:', formData)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  alert('User signed up successfully!')
}
</script>

<template>
  <div class="signin-page">
    <h1>Sign Up</h1>
    <SignUpForm :onSubmit="handleSignUpSubmit" />
  </div>
</template>

<style scoped>
.signin-page {
  max-width: 500px;
  margin: 3rem auto;
  padding: 1rem;
  text-align: center;
}
</style>
