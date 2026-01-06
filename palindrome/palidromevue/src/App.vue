<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../styles/palindrome.css" />
    <title>Palindrome Checker</title>
  </head>
  <body>
    <div>
      <PalindromeChecker
        title="Is It a Palindrome?"
        inputLabel="Enter in text to check for a palindrome:"
        placeholder="Insert Here"
        buttonLabel="Check"
        noteText="A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing."
      />

      <PalindromeChecker
        title="¿Es un palíndromo?"
        inputLabel="Ingresa texto para verificar si es un palíndromo:"
        placeholder="Escribe aquí"
        buttonLabel="Verificar"
        noteText="Un palíndromo es una palabra o frase que se escribe igual hacia adelante que hacia atrás, ignorando puntuación, mayúsculas y espacios."
      />
    </div>
  </body>
</template>

<script setup>
import PalindromeChecker from "./components/PalindromeProject.vue";
</script>

<style lang="scss">
  div{
    display:flex;
    flex-direction: column;
    gap: 10px;
    @media(min-width: 768px){
      display: flex;
      flex-direction: row;
    }
  }
</style>
