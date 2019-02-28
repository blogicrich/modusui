<template>
  <v-container grid-list-lg>
    <v-layout row fill-height justify-center wrap>
      <v-flex xs10 v-for="(report, index) in reports" :key="index">
        <BaseReport :tabs="report.tabs" :button="report.button"></BaseReport>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BaseReport from '@/components/base/BaseReportComponent'
import apiLib from '@/services/apiLib'
let tabs = [apiLib.getData('sysadmin/sysadmin')];
console.log(tabs)

export default {
  name: 'reports',
  components: {
    BaseReport
  },
  data: function () {
    return {
      reports: [
        {
          tabs: [
            {
              type: 'header',
              table: {
                rows: [
                  {
                    headers: ['Full Name', 'Also known as'],
                    items: ['Test Datson', 'Notrelnam']
                  },
                  {
                    headers: [
                      'Current Standard Target (L)',
                      'Dietary estimated hydration (L)',
                      'Current Total Adjustments (L)',
                      'Current Hydration Target (L)'
                    ],
                    items: ['2.5', '1.26', '0.84', '4.60']
                  }
                ]
              }
            },
            {
              subheader: 'Conditions',
              type: 'table',
              table: {
                headers: [
                  {
                    text: 'Description',
                    value: 'description',
                    sortable: false
                  },
                  {
                    text: 'Adjustment (L)',
                    value: 'adjustment',
                    sortable: false
                  }
                ],
                items: [
                  ['Lorum Ipsum', '0.25'],
                  ['They drank', '0.37'],
                  ['Quidquid latine dictum sit, altum videtur.', '0.32']
                ]
              }
            },
            {
              subheader: 'Day Reports',
              type: 'table',
              table: {
                align: 'right',
                headers: [
                  { text: 'Date', value: 'date', sortable: false },
                  {
                    text: 'Hydration Target (L)',
                    value: 'hydrationTarget',
                    sortable: false
                  },
                  {
                    text: 'Actual Hydration (L)',
                    value: 'hydrationActual',
                    sortable: false
                  },
                  {
                    text: 'Hydration Percentage (%)',
                    value: 'hydrationPercentage',
                    sortable: false
                  },
                  {
                    text: "Carer's Comments",
                    value: 'carerComments',
                    sortable: false
                  }
                ],
                items: [
                  [
                    '19th Dec 2018',
                    '2.0',
                    '2.3',
                    '115%',
                    'Mr. Datson drank various liquids.'
                  ],
                  [
                    '18th Dec 2018',
                    '2.0',
                    '2.1',
                    '105%',
                    'Mr. Datson succeeded in hydrating an ample amount.'
                  ],
                  [
                    '17th Dec 2018',
                    '2.2',
                    '2.0',
                    '91%',
                    'Mr. Datson did not drink enough today'
                  ]
                ]
              }
            }
          ],
          button: {
            appear: true,
            color: 'primary',
            icon: 'arrow_downward',
            docName: 'report-name.pdf'
          }
        },
        {
          tabs: [
            {
              type: 'header',
              table: {
                rows: [
                  {
                    headers: ['Full Name', 'Also known as'],
                    items: ['Test Datson', 'Notrelnam']
                  },
                  {
                    headers: [
                      'Current Standard Target (L)',
                      'Dietary estimated hydration (L)',
                      'Current Total Adjustments (L)',
                      'Current Hydration Target (L)'
                    ],
                    items: ['2.5', '1.26', '0.84', '4.60']
                  }
                ]
              }
            }
          ],
          button: {
            appear: false,
            color: 'primary',
            icon: 'arrow_downward',
            docName: 'report-name.pdf'
          }
        }
      ]
    }
  }
}
</script>
