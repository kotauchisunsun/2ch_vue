<template>
    <span>{{ $route.params.id }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RouterTest extends Vue {
}
</script>
