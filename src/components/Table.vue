<template>
    <div>
        {{ tableData[0] }}
        <div v-for="record in tableData">
            <KeyValue keyName="testKey" valueData="testValue" />
            <KeyValue v-bind:keyName="record[0]" v-bind:valueData="record[1]" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import KeyValue from '@/components/KeyValue.vue';

@Component
export default class Table extends Vue {
    @Prop()
    private tableData!: [string,string][];
    
    components = {
        KeyValue
    };
}
</script>
