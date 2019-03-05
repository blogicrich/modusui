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
import reportStore from '@/store/StoreGetRaport'
import BaseReport from '@/components/base/BaseReportComponent'
console.log(
  reportStore.fetchGetReportsCondition() +
    reportStore.fetchGetReportsSnapshot() +
    reportStore.fetchGetReportComments()
)

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
                    items: { fullName: 'Test Datson', aka: 'Notrelnam' }
                  },
                  {
                    headers: [
                      'Current Standard Target (L)',
                      'Dietary estimated hydration (L)',
                      'Current Total Adjustments (L)',
                      'Current Hydration Target (L)'
                    ],
                    items: {
                      currentStandardTarget: '2.5',
                      dietaryEstimatedTarget: '1.26',
                      currentTotalAdjustments: '0.84',
                      currentHydrationTarget: '4.60'
                    }
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
                  { description: 'Lorum Ipsum', adjustment: '0.25' },
                  { description: 'They drank', adjustment: '0.37' },
                  {
                    description: 'Quidquid latine dictum sit, altum videtur.',
                    adjustment: '0.32'
                  }
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
                  {
                    date: '19th Dec 2018',
                    hydrationTarget: '2.0',
                    hydrationActual: '2.3',
                    hydrationPercentage: '115%',
                    carerComments: 'Mr. Datson drank various liquids.'
                  },
                  {
                    date: '18th Dec 2018',
                    hydrationTarget: '2.0',
                    hydrationActual: '2.1',
                    hydrationPercentage: '105%',
                    carerComments:
                      'Mr. Datson succeeded in hydrating an ample amount.'
                  },
                  {
                    date: '17th Dec 2018',
                    hydrationTarget: '2.2',
                    hydrationActual: '2.0',
                    hydrationPercentage: '91%',
                    carerComments: 'Mr. Datson did not drink enough today'
                  }
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
  },
  methods: {
    getReports: function () {
      let reports = []
      let reportConditions = reportStore.fetchGetReportsCondition()
      for (let ri = 0; ri < reportConditions.length; ri++) {
        let report = {
          tabs: [
            {
              type: 'header',
              table: {
                rows: [
                  {
                    headers: ['Full Name', 'Also Known As'],
                    items: ['¬Full Name', '¬Also Known As']
                  },
                  {
                    headers: [
                      'Current Standard Target (L)',
                      'Dietary estimated hydration (L)',
                      'Current Total Adjustments (L)',
                      'Current Hydration Target (L)'
                    ],
                    items: [
                      '¬Current Standard Target (L)',
                      '¬Dietary estimated hydration (L)',
                      '¬Current Total Adjustments (L)',
                      '¬Current Hydration Target (L)'
                    ]
                  }
                ]
              }
            }
          ],
          button: {
            appear: true,
            color: 'primary',
            icon: 'arrow_downward',
            docName: 'report-' + 'name' + '.pdf'
          }
        }
        reports.push(report)
      }
    }
  }
}
</script>
