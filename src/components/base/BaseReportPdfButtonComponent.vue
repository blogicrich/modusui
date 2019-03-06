<template>
  <div>
    <v-btn v-on:click="renderPdf" icon large :color="color">
      <v-icon>{{icon}}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import pdfMixin from '@/mixins/pdfMixin.js'

export default {
  name: 'BaseReportPdfButton',
  props: {
    tabs: Array,
    color: String,
    icon: String,
    docName: String
  },
  mixins: [pdfMixin],
  methods: {
    renderPdf: function () {
      let doc = this.renderDocument()

      for (let i = 0; i < this.tabs.length; i++) {
        let tab = this.tabs[i]

        if (tab.type === 'header') {
          for (let i = 0; i < tab.table.rows.length; i++) {
            let row = tab.table.rows[i]
            this.renderHeader(
              doc,
              row.headers,
              Object.values(row.items)
            )
          }
        } else if (tab.type === 'table') {
          let headerTexts = []
          for (let iter = 0; iter < tab.table.headers.length; iter++) { headerTexts.push(tab.table.headers[iter].text) }

          let itemsTexts = []
          for (let iter = 0; iter < tab.table.items.length; iter++) { itemsTexts.push(Object.values(tab.table.items[iter])) }

          this.renderTable(
            doc,
            headerTexts,
            itemsTexts
          )
        }
      }

      doc.save(this.docName ? this.docName : 'report.pdf')
    }
  }
}
</script>
