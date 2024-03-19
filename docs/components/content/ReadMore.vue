
<script setup lang="ts">
import { splitByCase, upperFirst } from 'scule'

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: ''
  }
})

const createBreadcrumb = (link: string = 'Missing link') => {
  if (link.startsWith('http')) {
    return link
  }
  return link
    .split('/')
    .filter(Boolean)
    .map((part) =>
      splitByCase(part)
        .map((p) => upperFirst(p))
        .join(' ')
    )
    .join(' > ')
    .replace('Api', 'API')
}

const computedTitle = computed<string>(() => props.title || createBreadcrumb(props.to))
</script>

<template>
  <Callout icon="i-ph-bookmark-simple-duotone" :to="to">
    <MDCSlot unwrap="p">
      Read more in <span class="font-bold" v-html="computedTitle" />.
    </MDCSlot>
  </Callout>
</template>
