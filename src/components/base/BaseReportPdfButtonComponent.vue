<template>
  <div>
    <v-btn v-on:click="renderPdf" icon large :color="color">
      <v-icon>{{icon}}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import pdfMixin from "@/mixins/pdfMixin.js";

export default {
  name: "BaseReportPdfButton",
  data: function() {},
  props: {
    tabs: Array,
    color: String,
    icon: String,
    docName: String
  },
  methods: {
    renderPdf: function() {
      let doc = pdfMixin.methods.renderDocument();

      for (let i = 0; i < this.tabs.length; i++) {
        let tab = this.tabs[i];
        let headerTexts = [];
        if (tab.type === "header") {
          pdfMixin.methods.renderHeader(doc, tab.table.headers, tab.table.items);
        } else if (tab.type === "table") {
          for (let iter = 0; iter < tab.table.headers.length; iter++) {
            headerTexts.push(tab.table.headers[iter].text);
          }
          pdfMixin.methods.renderTable(doc, headerTexts, tab.table.items);
        }
      }

      doc.save(this.docName ? this.docName : "report.pdf");
    }
  }
};
</script>