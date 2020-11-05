<template>
  <v-card>
    <div v-for="(tab, index) in tabs" :key="index">
      <v-divider v-if="index > 0" class="mt-2" />
      <v-subheader v-if="tab.subheader">{{ tab.subheader }}</v-subheader>
      <BaseReportTable :type="tab.type" :table="tab.table" />
    </div>
    <div v-if="button.appear">
      <v-divider class="mt-2" />
      <v-container>
        <v-layout row justify-end>
          <BaseReportPdfButton
            :tabs="tabs"
            :color="button.color"
            :icon="button.icon"
            :docName="button.docName"
          />
        </v-layout>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import BaseReportTable from '@/components/base/BaseReportTableComponent.vue'
import BaseReportPdfButton from '@/components/base/BaseReportPdfButtonComponent.vue'

export default {
  name: 'BaseReportComponent',
  components: {
    BaseReportTable,
    BaseReportPdfButton
  },
  props: {
    tabs: Array,
    button: {
      appear: Boolean,
      color: String,
      icon: String,
      docName: String
    }
  }
}
</script>
