<template>
  <div class="h-full w-full bg-slate-800 text-center text-white ">
    <h1 class="text-center text-4xl mb-4">Characters from Rick and Morty</h1>
    <div class="mx-auto w-11/12">
      <div class="grid grid-cols-5 gap-4" v-if="!loading">
        <div v-for="(character, index) in characters" :key="`first-${character.id}`">
          <router-link :to="{name: 'Detail', params: { id: character.id }}" class="bg-slate-700 rounded-lg mx-auto flex flex-col justify-center" @click="openDetail(character.id)">
            <img :src="character.image" :alt="character.name" class="character-image" />
            <div class="character-details">
              <h2>{{ character.name }}</h2>
            </div>
          </router-link>
        </div>
      </div>

      <div class="pagination flex flex-row justify-between mt-2 py-2 text-lg">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';


const currentPage = ref(1);
const characters: any = ref([]);
const totalPages = ref(0);
const selectedId: any = ref(null);
const showModal = ref(false);

const GET_CHARACTERS = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
      info {
        pages
        next
        prev
      }
      results {
        id
        image
        name
      }
    }
  }
`;

const { onResult, loading, refetch } = useQuery(GET_CHARACTERS, {
  page: currentPage.value,
});

onResult(({ data }) => {
  loading.value = false;
  characters.value = data.characters.results;
  totalPages.value = data.characters.info.pages;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    refetch({ page: currentPage.value });
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    refetch({ page: currentPage.value });
  }
};

const openModal = (id: string) => {
  selectedId.value = id;
  showModal.value = true;
  console.log('selectedId', selectedId.value);
};
</script>