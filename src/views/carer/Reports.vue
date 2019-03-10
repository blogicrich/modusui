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
import store from '@/store'
import BaseReport from '@/components/base/BaseReportComponent'

export default {
  name: 'reports',
  components: {
    BaseReport
  },
  data: function () {
    return {
      dashboardUsers: store.state.dashboardUsers.dashboardUsersGet,
      reportsConditions: store.state.report.reportsConditions,
      reportsSnapshots: store.state.report.reportsSnapshots,
      conditionsHeaders: [
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
      dayReportHeaders: [
        {
          text: 'Date',
          value: 'date',
          sortable: false
        },
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
      ]
    }
  },
  mounted () {
    store.dispatch('fetchDashboardUsersGet')
    store.dispatch('fetchReportsConditionsGet')
    store.dispatch('fetchReportsSnapshotGet')
    // store.dispatch("fetchReportCommentsGet");
  },
  computed: {
    reports: function () {
      let reports = []
      let users = this.dashboardUsers
      let conditions = this.reportsConditions
      let snapshots = this.reportsSnapshots
      console.log('user: ' + users)
      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        let report = {
          tabs: [
            {
              type: 'header',
              table: {
                rows: [
                  {
                    headers: ['Full Name', 'Also Known As'],
                    items: [
                      user.givenName + ' ' + user.familyName,
                      user.salutation
                    ]
                  },
                  {
                    headers: [
                      'Current Standard Target (L)',
                      'Dietary estimated hydration (L)',
                      'Current Total Adjustments (L)',
                      'Current Hydration Target (L)'
                    ],
                    items: [
                      user.calculatedTargetConsumption,
                      user.hydrationValue
                    ]
                  }
                ]
              }
            },
            {
              subheader: 'Conditions',
              type: 'table',
              table: {
                align: 'right',
                headers: this.conditionsHeaders,
                items: []
              }
            },
            {
              subheader: 'Day Reports',
              type: 'table',
              table: {
                align: 'right',
                headers: this.dayReportHeaders,
                items: []
              }
            }
          ],
          button: {
            appear: true,
            color: 'primary',
            icon: 'arrow_downward',
            docName: 'report-' + user.givenName + '.pdf'
          }
        }

        // Add the conditions from the API to the table items
        let currentTotalAdjustments = 0
        for (let it = 0; it < conditions.length; it++) {
          const condition = conditions[it]
          let conditionRow = {
            description: condition.description,
            adjustment: condition.adjustment
          }
          currentTotalAdjustments += condition.adjustment
          report.tabs[1].items.push(conditionRow)
        }
        tabs[0].table.rows[1].items.push(currentTotalAdjustments)
        tabs[0].table.rows[1].items.push(
          tabs[0].table.rows[1].items[0] +
            tabs[0].table.rows[1].items[1] +
            tabs[0].table.rows[1].items[2]
        )

        // Put the snapshot and comment data from the API together and add them to the table items
        for (let it = 0; it < snapshots.length; it++) {
          const snapshot = snapshots[it]
          let dayReportRow = {
            date: this.convertDateTimeToString(snapshot.dateTime),
            hydrationTarget: snapshot.hydrationTarget,
            hydrationActual:
              (snapshot.hydrationTarget * snapshot.aggregatedHydration) / 100,
            hydrationPercentage: snapshot.aggregatedHydration
          }
          report.tabs[2].items.push(dayReportRow)
        }
        reports.push(report)
      }
      return reports
    }
  },
  methods: {
    convertDateTimeToString: function (dateTime) {
      const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
      return dateTime.toLocaleDateString('en-UK', options)
    }
  }
}
</script>
