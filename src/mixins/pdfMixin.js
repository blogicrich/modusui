import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  methods: {
    renderDocument() {
      return new jsPDF();
    },
    renderHeader: function(doc, headData, bodyData) {
      doc.autoTable({
        theme: "plain",
        head: [headData],
        body: [bodyData],
      })
    },
    renderTable: function(doc, tableHeaderData, tableData) {
      doc.autoTable({
        head: [tableHeaderData],
        body: tableData
      })
    }
  }
}