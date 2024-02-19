<template>
  <div>
    <h1>Characters from Rick and Morty</h1>
    <ul>
      <li v-for="character in characters" :key="character.id">
        <div class="character-card">
          <img :src="character.image" :alt="character.name" class="character-image" />
          <div class="character-details">
            <h2>{{ character.name }}</h2>
            <p>Status: {{ character.status }}</p>
            <p>Species: {{ character.species }}</p>
          </div>
        </div>
      </li>
    </ul>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useQuery, useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const GET_CHARACTERS = gql`
  query GetAllPerso($page: String!) {
    characters(page: $page) {
      info {
        pages
      }
      results {
        image
        name
        status
        species
      }
    }
  }
`;

export default defineComponent({
  setup() {
    const currentPage = ref(1);
    const apolloClient = useApolloClient();

    const { result, refetch } = useQuery(GET_CHARACTERS, {
      page: currentPage.value,
      client: apolloClient,
    });

    const characters: any = ref([]);
    const totalPages = ref(0);

    watch(result, () => {
      console.log(flatted.stringify(result.value)); // Utilisez flatted pour la sérialisation
      if (result.value && result.value.characters) {
        characters.value = result.value.characters.results;
        totalPages.value = result.value.characters.info.pages;
      }
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
        refetch({ page: currentPage.value, client: apolloClient });
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
        refetch({ page: currentPage.value, client: apolloClient });
      }
    };

    return { characters, nextPage, prevPage, currentPage, totalPages };
  },
});
</script>

<style scoped>
.character-card {
  display: flex;
  margin-bottom: 20px;
}

.character-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.character-details {
  display: flex;
  flex-direction: column;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  cursor: pointer;
}
</style>
