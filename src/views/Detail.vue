<template>
    <div class="p-5 border w-96 mx-auto mt-10 shadow-lg rounded-md bg-white" v-if="character">
        <router-link to="/" class="absolute top-5 left-5 bg-slate-800 text-white p-2 rounded-md">< Retour</router-link>
        <div class="mt-3 text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ character.name }}
            </h3>
            <div class="mt-2 px-7 py-3">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Name: {{ character.name }}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Status: {{ character.status }}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Species: {{ character.species }}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Type: {{ character.type }}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Gender: {{ character.gender }}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <img :src="character.image" alt="Character Image">
                </p>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRoute } from 'vue-router';

const route = useRoute();
const character: any = ref(null);

const GET_CHARACTER_DETAILS = gql`
    query Character($id: ID!) {
        character(id: $id) {
            id
            name
            status
            species
            type
            gender
            image
        }
    }
`;

const { onResult } = useQuery(GET_CHARACTER_DETAILS, {
    id: route.params.id,
});

onResult(({ data }) => {
    character.value = data.character;
});
</script>