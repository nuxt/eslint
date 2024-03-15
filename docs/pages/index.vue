<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
definePageMeta({
  colorMode: 'dark',
})
const title = 'Nuxt ESLint'
const description = 'Collection of ESLint-related packages for Nuxt'

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: 'https://eslint.nuxt.com/social-card.png',
  twitterImage: 'https://eslint.nuxt.com/social-card.png',
})

const { data: page } = await useAsyncData('landing', () => {
  return queryContent('/').findOne()
})

const intervalId = ref()
const currentStep = ref(0)
const projectsSectionVisible = ref(false)
const nuxtProjectsSection = ref(null)

useIntersectionObserver(
  nuxtProjectsSection,
  ([{ isIntersecting }]) => {
    projectsSectionVisible.value = isIntersecting
  },
)

watch(projectsSectionVisible, () => {
  if (projectsSectionVisible.value) {
    intervalId.value = setInterval(() => {
      if (currentStep.value < 2)
        currentStep.value += 1
      else
        currentStep.value = 0
    }, 4000)
  }
})
</script>

<template>
  <div>
    <span class="gradient" />
    <ULandingHero
      orientation="horizontal"
      :ui="{ container: 'flex lg:gap-12' }"
    >
      <Illustration class="mx-auto hidden h-64 lg:block" />
      <template #title>
        <span v-html="page.hero?.title" />
      </template>
      <template #description>
        {{ page.hero?.description }}
      </template>
      <template #links>
        <UButton
          to="/guide/getting-started"
          icon="i-ph-rocket-launch-duotone"
          size="xl"
        >
          {{ page.hero?.button }}
        </UButton>
      </template>
    </ULandingHero>

    <ULandingSection
      v-for="(section, index) of page.sections"
      :key="index"
      v-bind="section"
    >
      <template
        v-if="section.title"
        #title
      >
        <span v-html="section?.title" />
      </template>

      <template
        v-if="section.description"
        #description
      >
        <span v-html="section.description" />
      </template>

      <template #tools>
        <UPageGrid>
          <ULandingCard
            v-for="card in section.toolsCards"
            :key="card.title"
            :to="card.to"
            :icon="card.icon"
            :title="card.title"
            :description="card.description"
            :ui="{
              to: 'hover:ring-2 dark:hover:ring-gray-500 hover:ring-gray-500 hover:bg-gray-100/50',
              icon: { base: 'w-10 h-10 flex-shrink-0 text-gray-100' },
              body: { base: 'h-full', background: 'bg-gradient-to-b from-gray-900 to-gray-950' }
            }"
          />
        </UPageGrid>
      </template>
    </ULandingSection>
  </div>
</template>

<style scoped lang="postcss">
.gradient {
  position: fixed;
  top: 25vh;
  width: 100%;
  height: 30vh;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #00dc82 0%,
    rgba(0, 220, 130, 0) 100%
  );
  filter: blur(180px);
  opacity: 0.6;
  z-index: -1;
}

.prose {
  @apply text-white;

  :where(:deep(code)) {
    @apply text-gray-200;
  }
}
</style>
