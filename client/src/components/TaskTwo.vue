<template>
  <div>
    <h1>Walidacja numeru PESEL</h1>
    <form @submit.prevent="validatePesel">
      <input v-model="pesel" placeholder="Wprowadź numer PESEL" maxlength="11" />
      <button type="submit">Sprawdź PESEL</button>
    </form>

    <div v-if="validationMessage">
      <p :class="{'valid': isValidPesel, 'invalid': !isValidPesel}">
        {{ validationMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pesel = ref('');
const isValidPesel = ref(false);
const validationMessage = ref('');

const validatePesel = () => {
  if (pesel.value.length !== 11 || !/^\d{11}$/.test(pesel.value)) {
    validationMessage.value = 'Numer PESEL musi zawierać dokładnie 11 cyfr.';
    isValidPesel.value = false;
    return;
  }

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const digits = pesel.value.split('').map(Number);

  const checksum = digits
    .slice(0, 10)
    .reduce((sum, digit, index) => sum + digit * weights[index], 0);

  const controlDigit = (10 - (checksum % 10)) % 10;

  if (controlDigit === digits[10]) {
    validationMessage.value = 'Numer PESEL jest prawidłowy.';
    isValidPesel.value = true;
  } else {
    validationMessage.value = 'Numer PESEL jest nieprawidłowy.';
    isValidPesel.value = false;
  }
};
</script>

<style scoped>
.valid {
  color: green;
}
.invalid {
  color: red;
}
</style>
