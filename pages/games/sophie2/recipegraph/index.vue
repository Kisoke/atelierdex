<template>
  <section>
    <h2 class="text-3xl">Recipe Graph</h2>
    <RecipeNetworkGraph :items="items" :recipes="recipes" class="w-1/2"/>
  </section>
</template>

<script>
export default {
  name: 'SophieRecipeGraphPage'
}
</script>

<script setup>
import items from '@/assets/databases/sophie2/items.json'
import recipes from '@/assets/databases/sophie2/recipes.json'
import RecipeNetworkGraph from '@/components/RecipeNetworkGraph.vue'
</script>