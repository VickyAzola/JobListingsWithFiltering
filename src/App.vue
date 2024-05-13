<script setup>
import { ref } from '@vue/reactivity'
import Data from '/src/data.json'

const filterBox = ref(false)
const filtersArr = ref([])

// Función para filtrar los trabajos
function filterJob(event) {
  filterBox.value = true
  let text = event.target.innerText

  //revisa cada elemento y si este es igual a text, si encuantra uno lo devuelve y guarda en item
  let item = filtersArr.value.find((element) => element == text)
  
  //si item no existe se agrega al array
  if (!item) {
    filtersArr.value.push(text)
  }
}

// Función para verificar si un trabajo pasa los filtros aplicados
const passFilter = (jobData) => {
  if (filtersArr.value.length === 0) {
    return true; // Si no hay filtros, mostrar todos los trabajos
  }
  // Verificar si algún filtro coincide con los datos del trabajo
  return filtersArr.value.every(filter => {
    return (
      jobData.role === filter ||
      jobData.level === filter ||
      jobData.languages.includes(filter) ||
      jobData.tools.includes(filter)
    )
  })
}

// Función para eliminar un filtro específico del array de filtros 
function DeleteFilter(index) {
  //eliminar 1 solo elemento en la posición index
  filtersArr.value.splice(index, 1)
  
  if (filtersArr.value.length == 0) {
    filterBox.value = false
  }
}

// Función para eliminar todos los filtros
function DeleteAllFilters() {
  filtersArr.value = []
  filterBox.value = false
}

const filterStyle = 'bg-cyan-400/10 px-3 py-1 rounded hover:bg-DesaturatedDarkCyan hover:text-white'

</script>

<template>
  <main class="bg-Background min-h-screen pb-6 lg:pb-16">
<!-- Header background image -->
    <header class="bg_header"></header>

<!-- filterBox -->
    <div v-show="filterBox == true" class="mt-[-2rem] mx-6 lg:mx-24">
      <section class="bg-white py-5 pl-5 lg:pl-8 lg:pr-2 shadow-xl shadow-DesaturatedDarkCyan/10 rounded flex justify-between pr-4 lg:grid lg:grid-cols-12">
        <div class="flex flex-row gap-y-2 gap-x-4 flex-wrap col-span-11">
          <div v-for="(filter, index) in filtersArr" class="flex items-center">
            <p class="bg-cyan-400/10 rounded px-2 py-1 text-DesaturatedDarkCyan font-semibold">
              {{ filter }}
            </p>
            <button 
              @click="DeleteFilter(index)"
              class="bg-DesaturatedDarkCyan hover:bg-VeryDarkGrayishCyan rounded-r p-2">
              <svg class="fill-white"
                xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <path fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/>
              </svg>
            </button>
          </div>
        </div>
        <button 
          @click="DeleteAllFilters"
          class="lg:col-start-12 text-DarkGrayishCyan font-semibold hover:text-DesaturatedDarkCyan hover:underline">
            Clear
        </button>
      </section>
    </div>
<!-- End filterBox -->

<!-- Job listing -->
    <section class="mx-6 lg:mx-24 mt-14">
      <div v-for="jobData in Data" class="mb-12 lg:mb-6">
        <div 
          v-if="passFilter(jobData)"
          class="rounded relative bg-white px-5 lg:px-8 lg:py-6 pb-4 pt-10 shadow-lg shadow-DesaturatedDarkCyan/20
          lg:flex lg:items-center lg:justify-between lg:gap-x-10"
          :class="[jobData.featured == true ? 'border-l-4 border-DesaturatedDarkCyan' : 'border-l-4 border-white']"
        >
          <div class="lg:flex lg:items-center lg:gap-x-6">
          <img :src=jobData.logo class="w-14 lg:w-[5rem] absolute lg:static top-[-1.7rem] left-5" alt="logo" />
          <div class="min-w-max">
            <div class="flex items-center">
              <p class="text-DesaturatedDarkCyan font-bold mr-4">{{ jobData.company }}</p>
              <div class="bg-DesaturatedDarkCyan rounded-full text-white px-2 mr-2" v-if="jobData.new == true">
                <p class="text-sm mt-0.5">NEW!</p>
              </div>
              <div class="bg-VeryDarkGrayishCyan rounded-full text-white px-2" v-if="jobData.featured == true">
                <p class="text-sm mt-0.5">FEATURED</p>
              </div>
            </div>
            
            <h2 class="text-VeryDarkGrayishCyan font-bold lg:text-lg my-2 lg:my-1 hover:text-DesaturatedDarkCyan hover:cursor-pointer">
              {{ jobData.position }}
            </h2>
            
            <div class="text-DarkGrayishCyan">
              <p>{{ jobData.postedAt }}
                <span class="inline-block h-1 w-1 bg-DarkGrayishCyan/50 rounded-full mb-1 mx-2"></span> 
                {{ jobData.contract }} 
                <span class="inline-block h-1 w-1 bg-DarkGrayishCyan/50 rounded-full mb-1 mx-2"></span> 
                {{ jobData.location }}
              </p>
            </div>
          </div>
          </div>
          
          <hr class="my-4 bg-DarkGrayishCyan lg:hidden" />
  <!-- buttons to filter -->
          <div class="flex flex-wrap lg:justify-end gap-x-5 gap-y-4 text-DesaturatedDarkCyan font-semibold">
            <button 
              :class=filterStyle
              @click="filterJob">
              {{ jobData.role }}
            </button>
            <button 
              :class=filterStyle
              @click="filterJob">
              {{ jobData.level }}
            </button>
            <button 
              v-for="language in jobData.languages" 
              :class=filterStyle
              @click="filterJob">
              {{ language }}
            </button>
            <button 
              v-for="tool in jobData.tools"
              :class=filterStyle
              @click="filterJob">
              {{ tool }}
            </button>
          </div>
        </div>        
      </div>
    </section>
<!-- End Job listing -->
  </main>

  <footer class="bg-Background pb-4">
    <p class=" text-xs text-center text-gray-400">
        Challenge by 
        <a 
            href="https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt" 
            target="_blank" 
            aria-label="Go to fronted mentor"
            class="hover:text-DesaturatedDarkCyan hover:cursor-pointer font-bold"
        >
            Frontend Mentor
        </a> 
        Coded by 
        <a 
            href="https://github.com/VickyAzola/JobListingsWithFiltering" 
            target="_blank" 
            aria-label="Go to Victoria's Github"
            class=" hover:text-DesaturatedDarkCyan hover:cursor-pointer font-bold"
        >
            Victoria Azola
        </a>
    </p>
  </footer>
</template>

