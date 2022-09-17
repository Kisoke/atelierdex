<template>
  <article>
    <div class="plot-div" ref="graphContainer"></div>
  </article>
</template>

<script setup>
import uniqueId from 'lodash.uniqueid'
import makeD3Graph from '@/utils/makeD3Graph'

const props = defineProps({
  items: {
    type: Object,
    required: true,
    default() {
      return {}
    },
  },
  recipes: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  },
  displayCategories: {
    type: Boolean,
    default: false
  },
  hideItemsWithNoLinks: {
    type: Boolean,
    default: true
  }
},
)

const itemsArray = computed(() => {
  return Object.keys(props.items).map(itemId => {
    const item = props.items[itemId]

    return { ...item, id: itemId }
  })
})

const linksArray = computed(() => {
  return Object.keys(props.recipes).flatMap(createdItemId => {
    const recipe = props.recipes[createdItemId]

    let links = []

    Object.keys(recipe.items).forEach(materialItem => {
      links.push({
        source: materialItem,
        target: createdItemId
      })
    })

    return links
  })
})

const filteredItemsArray = computed(() => {
  let filtered = itemsArray.value

  if (props.hideItemsWithNoLinks) {
    filtered = filtered.filter(item => {
      return linksArray.value.find(link => link.source == item.id || link.target == item.id)
    })
  }

  return filtered
})

const graphContainer = ref(null)

function setupGraph() {
  makeD3Graph(graphContainer.value.id, filteredItemsArray.value, linksArray.value)
}

onMounted(() => {
  graphContainer.value.id = `recipegraph-${uniqueId()}`

  setupGraph()
})
</script>

<style>
.plot-div {
  width: 100%;
  display: block;
  margin: auto;
}
</style>