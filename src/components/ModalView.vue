<template>
    <div v-if="props.showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" v-if="character">
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
                        Origin: {{ character.origin.name }}
                    </p>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Location: {{ character.location.name }}
                    </p>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <img :src="character.image" alt="Character Image">
                    </p>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Episodes: {{ character.episode.length }}
                    </p>
                </div>
                <div class="items-center px-4 py-3">
                    <button @click="showModal = false"
                        class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';


const props = defineProps({
    showModal: Boolean,
    id: String,
});
console.log(props);

const showModal = ref(false);
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

const { onResult, loading } = useQuery(GET_CHARACTER_DETAILS, {
    id: props.id,
});

onResult(({ data }) => {
    console.log(data.character)
    loading.value = false;
    character.value = data.character;
});

</script>