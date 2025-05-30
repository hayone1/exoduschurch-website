<script setup lang="ts">
import { CalendarDate, DateFormatter, parseDate, getLocalTimeZone } from '@internationalized/date';
import type { DropdownMenuItem } from '@nuxt/ui';
import { motion } from 'motion-v';
import type { ButtonContent, ImageContent } from '~/types';

const viewport = useViewport();
const {
    defaultStartDate = '2019-05-05',
    data = []
} = defineProps<{
    defaultStartDate?: string,
    data: {
        id: string
        author: string,
        showCardTitle?: boolean
        title: string,
        date: string,
        body: string,
        bodyButtons: ButtonContent[]
        image?: ImageContent
        event: string
    }[]
}>();

const formatter = new DateFormatter('en-US', {
    dateStyle: 'medium'
});

const dateFilter = shallowRef({
    start: parseDate(defaultStartDate),
    end: getCalenderDate(new Date()), //today
});
const dateSort = ref(true);
const names = ref([...new Set(data.map(cardData => cardData.author))]);
const events = ref([...new Set(data.map(cardData => cardData.event))]);
const titles = ref([...new Set(data.map(cardData => cardData.title))]);
const nameFilters: globalThis.Ref<string[], string[]> = ref([]);
const eventFilters: globalThis.Ref<string[], string[]> = ref([]);
const titleFilters: globalThis.Ref<string[], string[]> = ref([]);
const authorSort = ref(false);
const eventSort = ref(false);
const titleSort = ref(false);


const sortAscending = ref(false);
const sortData = computed(() => [
    {
        label: 'date',
        type: 'checkbox' as const,
        checked: dateSort.value,
        onUpdateChecked(checked: boolean) {
            dateSort.value = checked
        },
    },
    {
        label: 'title',
        type: 'checkbox' as const,
        checked: titleSort.value,
        onUpdateChecked(checked: boolean) {
            titleSort.value = checked
        },
    },
    {
        label: 'author',
        type: 'checkbox' as const,
        checked: authorSort.value,
        onUpdateChecked(checked: boolean) {
            authorSort.value = checked
        },
    },
    {
        label: 'event',
        type: 'checkbox' as const,
        checked: eventSort.value,
        onUpdateChecked(checked: boolean) {
            eventSort.value = checked
        },
    },
    {
        type: 'separator' as const
    },
    {
        label: 'Ascending',
        type: 'checkbox' as const,
        icon: 'i-fluent-text-sort-ascending-20-regular',
        checked: sortAscending.value,
        onUpdateChecked(checked: boolean) {
            sortAscending.value = checked
        },
    },
    {
        label: 'Descending',
        type: 'checkbox' as const,
        icon: 'i-fluent-text-sort-descending-20-regular',
        checked: !sortAscending.value,
        onUpdateChecked(checked: boolean) {
            sortAscending.value = !checked
        },
    },

] satisfies DropdownMenuItem[])

const transformedData = computed(() => {
    const filteredData = data.filter(cardData => {
        const parsedDate = parseDate(cardData.date);
        return dateFilter.value.start.compare(parsedDate) <= 0 &&
            dateFilter.value.end.compare(parsedDate) >= 0 &&
            (nameFilters.value.length === 0 || nameFilters.value.some(author =>
                cardData.author.includes(author)
            )) &&
            (eventFilters.value.length === 0 || eventFilters.value.some(event =>
                cardData.event.includes(event)
            )) &&
            (titleFilters.value.length === 0 || titleFilters.value.some(title =>
                cardData.title.includes(title)
            ))
    });
    const dateSortedData = dateSort.value === false ? filteredData :
        filteredData.sort((data1, data2) => {
        const comparison = parseDate(data1.date).compare(parseDate(data2.date));
        return sortAscending.value ? comparison : -(comparison)
    });
    const titleSortedData = titleSort.value === false ? dateSortedData :
        dateSortedData.sort((data1, data2) => {
        const comparison = data1.title.localeCompare(data2.title);
        return sortAscending.value ? comparison : -(comparison)
    });
    const authorSortedData = authorSort.value === false ? titleSortedData :
        titleSortedData.sort((data1, data2) => {
        const comparison = data1.author.localeCompare(data2.author);
        return sortAscending.value ? comparison : -(comparison)
    });
    const eventSortedData = eventSort.value === false ? authorSortedData :
        authorSortedData.sort((data1, data2) => {
        const comparison = data1.event.localeCompare(data2.event);
        return sortAscending.value ? comparison : -(comparison)
    });
    return eventSortedData;
}

);


const currentPageNumber = ref(1);
const cardsPerPage = ref(10);
const pageSiblingCount = ref(2);
watch(viewport.breakpoint, () => {
  viewport.isLessOrEquals('mobileWide') ?
  pageSiblingCount.value = 1 :
  pageSiblingCount.value = 5
}, { immediate: true })

const totaltransformedCards = computed(() => transformedData.value.length);
// console.log("FilteredData: ", JSON.stringify(transformedData.value));
const paginatedData = computed(() => paginateArray(
    transformedData.value, currentPageNumber.value, cardsPerPage.value
))

</script>
<template>
    <ClientOnly>
        <UCard>
            <div class="flex flex-wrap justify-items-stretch gap-2">
                <UPopover>
                    <UButton icon="i-fluent-calendar-20-regular" color="neutral" variant="subtle">
                        <p>Date:</p>
                        <template v-if="dateFilter.start">
                            <template v-if="dateFilter.end">
                                {{
                                    formatter.format(dateFilter.start.toDate(getLocalTimeZone()))
                                }} -
                                {{
                                    formatter.format(dateFilter.end.toDate(getLocalTimeZone()))
                                }}
                            </template>
                            <template v-else>
                                {{ formatter.format(dateFilter.start.toDate(getLocalTimeZone())) }}
                            </template>
                        </template>
                        <template v-else>
                            Pick a date
                        </template>
                    </UButton>
                    <template #content>
                        <UCalendar v-model="dateFilter" class="p-2" :numberOfMonths="2" range />
                    </template>
                </UPopover>
                <UButtonGroup>
                    <UBadge color="neutral" variant="subtle" size="lg" label="Name" />
                    <UInputMenu v-model="titleFilters" :items="titles" multiple placeholder="Prayer Focused"
                        class="rounded-tl-none rounded-bl-none" />
                </UButtonGroup>
                <UButtonGroup>
                    <UBadge color="neutral" variant="subtle" size="lg" label="Name" />
                    <UInputMenu v-model="nameFilters" :items="names" multiple placeholder="John Doe"
                        class="rounded-tl-none rounded-bl-none" />
                </UButtonGroup>
                <UButtonGroup>
                    <UBadge color="neutral" variant="subtle" size="lg" label="Event" />
                    <USelectMenu v-model="eventFilters" multiple :items="events" placeholder="Sunday Service" />
                    <!-- <UInputMenu v-model="eventFilters" :items="events" multiple
                         class="rounded-tl-none rounded-bl-none"/> -->
                </UButtonGroup>
                <UDropdownMenu :items="sortData">
                    <UButton label="Sort" color="neutral" variant="outline"
                        icon="i-fluent-arrow-sort-down-lines-20-regular" />
                </UDropdownMenu>
            </div>
        </UCard>
    </ClientOnly>
    <br />
    <motion.ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        gap-2 justify-items-stretch">
        <AnimatePresence>
            <motion.li v-for="cardData in paginatedData" :key="cardData.id" layout>
                <UCard class="size-full">
                    <template v-if="(cardData.showCardTitle != false)" #header>
                        <h2 class="text-2xl font-semibold">
                            {{ cardData.title }}
                        </h2>
                    </template>

                    <UModal :title="cardData.title"
                        :description="`${cardData.author} | ${cardData.date} | ${cardData.event}`">
                        <NuxtImg v-if="cardData.image" class="rounded-lg" :class="cardData.image.aspectRatio"
                            :src="cardData.image.url" :placeholder="cardData.image.placeholder"
                            :alt="cardData.image.alt" loading="lazy" />

                        <p v-else class="line-clamp-3 text-wrap" v-html="cardData.body">
                        </p>
                        <br />
                        <div v-if="cardData.bodyButtons" class="w-full flex flex-row flex-wrap gap-2 justify-around">
                            <UButton v-for="buttonData in cardData.bodyButtons" :label="buttonData.label"
                                :variant="buttonData.variant" :color="buttonData.color" :class="buttonData.class"
                                :icon="buttonData.icon" :to="buttonData.link" target="_blank"
                                class="w-full" />

                        </div>
                        <template #body>
                            <p v-html="cardData.body.replace(/\n/g, '<br>')" >
                            </p>
                        </template>
                    </UModal>

                    <template #footer>
                        <p class="italic text-xs text-muted">
                            {{ cardData.author }} | {{ cardData.date }} | {{ cardData.event }}
                        </p>
                    </template>
                </UCard>

            </motion.li>
        </AnimatePresence>
    </motion.ul>
    <br />
    <UCard>
        <div class="flex flex-wrap items-center justify-between gap-2">
            <UButtonGroup class="items-center gap-2">
                <p>
                    Total: {{ totaltransformedCards }}
                </p>
                <USeparator orientation="vertical" class="border-1"/>
                <UInputNumber class="w-20" v-model="cardsPerPage" orientation="vertical"
                    :min="1" :max="100" />
                <p>Per page</p>
            </UButtonGroup>
            <UPagination v-model="currentPageNumber" :itemsPerPage="cardsPerPage"
                :total="totaltransformedCards" :siblingCount="pageSiblingCount" />

        </div>
    </UCard>
</template>


<style scoped></style>