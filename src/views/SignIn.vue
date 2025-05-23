<script setup>
import SignUpForm from '@/components/SignIn.vue' // adjust the path as needed

// This function receives form data from SignUpForm on submit
async function handleSignUpSubmit(formData) {
  // formData = { username, email, password }
  console.log('SignUp form submitted:', formData)

  // Here you could call your API to register the user:
  // await api.registerUser(formData)

  // For demo: simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000))

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
