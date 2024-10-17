<template>
  <h1>Przestawianie liter w środku wyrazów</h1>
  <form @submit.prevent="processFile">
    <input type="file" @change="handleFileUpload" accept=".txt" />
    <button type="submit">Wyślij plik</button>
  </form>

  <div v-if="outputText">
    <h2>Przetworzony tekst:</h2>
    {{ outputText }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileContent = ref('');
const outputText = ref('');

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      fileContent.value = e.target.result;
    };
    reader.readAsText(file, 'UTF-8');
  }
};

const processFile = () => {
  if (fileContent.value) {
    const lines = fileContent.value.split('\n');
    const processedLines = lines.map((line) => processLine(line));
    outputText.value = processedLines.join('\n');
  }
};

const processLine = (line) => {
  const words = line.split(/(\s+)/);
  return words
    .map((word) => scrambleWord(word))
    .join('');
};

const scrambleWord = (word) => {
  if (word.length <= 3 || !/[\p{L}]/u.test(word)) {
    return word;
  }

  const firstChar = word[0];
  const lastChar = word[word.length - 1];
  const middleChars = word.slice(1, -1).split('');

  for (let i = middleChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [middleChars[i], middleChars[j]] = [middleChars[j], middleChars[i]];
  }

  const scrambledMiddle = middleChars.join('');
  return `${firstChar}${scrambledMiddle}${lastChar}`;
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
form {
  margin-bottom: 20px;
}
pre {
  text-align: left;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
}
</style>
