import GET_ACTIVITIES from '@/queries/getActivities.graphql'
import { groupActivities } from '@/utils/helpers'
import Activity from './Activity'

export default {
  name: 'activities',
  data () {
    return {
      activities: [],
      loading: 0,
      activeId: 0,
      filters: [
        { name: 'Alla', type: '' },
        { name: 'Intropass', type: 'intro' },
        { name: 'Dagens pass', type: 'dagens' },
        { name: 'Fitness', type: 'fitness' },
        { name: 'Performance', type: 'performance' }
      ],
      filter: ''
    }
  },
  apollo: {
    activities: {
      query: GET_ACTIVITIES,
      loadingKey: 'loading'
    }
  },
  components: {
    Activity
  },
  computed: {
    activitiesByDay () {
      return groupActivities(this.filter)(this.activities)
    }
  },
  methods: {
    displayParticipants ({ id }) {
      this.activeId = this.activeId === id ? 0 : id
    },
    filterActivities (name) {
      this.filter = name
    }
  }
}
