<template>
  <section>
    <h2 class="text-3xl">Recipe Graph</h2>
    <div class="h-full">
      <RecipeNetworkGraph :items="items.items" :recipes="recipes.items" class="w-3/4" />
    </div>
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
