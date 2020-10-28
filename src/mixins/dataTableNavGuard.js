export const dataTableNavGuard = {
  beforeRouteLeave (to, from, next) {
    if (this.$refs.baseDataTable.newDialog ||
        this.$refs.baseDataTable.editDialog ||
        this.$refs.baseDataTable.delDialog) {
      const answer = window.confirm('Do you really want to leave? You will lose all unsaved changes!')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
