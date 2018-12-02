<template>
    <div>
        <span>{{ keyName }}:{{ valueData }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class KeyValue extends Vue {
  @Prop() private keyName!: string;
  @Prop() private valueData!: string;
}
</script>
