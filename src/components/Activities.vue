<template>
  <div>
    <ul class="list">
      <li v-for="(activities, day) in activitiesByDay">
         <div class="title">{{ day }}</div>
         <ul class="activities">
           <li
            class="activity"
            @click="displayParticipants(activity)"
            v-for="activity in activities">
            <div class="activity-meta" :class="typeOfWorkout(activity)">
              <div class="time">{{ activity.start.timepoint.time }} - {{ activity.end.timepoint.time }}</div>
              <div class="name">{{ activity.product.name }}</div>
              <div class="coach">{{ activity.coach}}</div>
              <div class="freeslots">
                <div class="slots" :class="{
                  'full': activity.freeslots === 0,
                  'few': activity.freeslots / activity.totalslots < 0.4 && activity.freeslots !== 0
                }">
                  {{ activity.freeslots }} / {{ activity.totalslots }}
                  </div>
                <div class="slots-text">slots</div>
                </div>
              </div>
              <div class="participants-wrap" v-if="activeId === activity.id">
                <ul class="participants">
                  <li v-for="participant in activity.participants">
                    {{ participant.firstname }} {{ participant.lastname }}
                  </li>
                </ul>
              </div>
           </li>
         </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import GET_ACTIVITIES from '@/queries/getActivities.graphql'
import { groupBy, dateGroup, getTypeOfWorkout } from '@/utils/helpers'

export default {
  name: 'activities',
  data () {
    return {
      activities: [],
      loading: 0,
      activeId: 0
    }
  },
  apollo: {
    activities: {
      query: GET_ACTIVITIES,
      loadingKey: 'loading'
    }
  },
  computed: {
    activitiesByDay () {
      const now = new Date().getTime()
      const groupByDate = groupBy(dateGroup)

      const findCoach = (activity) =>
        Object.assign({}, activity, {
          coach: activity.resources.filter(resource => resource.type === "Personal")[0].name
        })
     
      const sortByLastname = (a, b) =>
        (a.lastname > b.lastname) ? 1 : (b.lastname > a.lastname) ? -1 : 0

      const sortParticipants = (activity) =>
        Object.assign({}, activity, {
          participants: activity.participants.slice().sort(sortByLastname)
        })
      
      return groupByDate(this.activities
        .filter(activity => activity.start.timepoint.timestamp * 1000 - now > 0)
        .map(findCoach)
        .map(sortParticipants))
    }
  },
  methods: {
    typeOfWorkout (activity) {
      return getTypeOfWorkout(activity.product.id)
    },
    displayParticipants (activity) {
      if (this.activeId === activity.id) {
        this.activeId = 0
      } else {
        this.activeId = activity.id
      }
    }
  }
}
</script>

<style scoped>
:root {
  --mustard: #ffdb4d;
  --green: #00b300;
  --lochmara: #0085ca; /* rgb(0, 133, 202) */
  --vermillion: #ff3900;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.list {
  color: rgba(36, 41, 46, 1);
  margin: 100px auto;
  max-width: 900px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.activities {
  margin-bottom: 20px;
}

.activity {
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.activity-meta {
  align-items: center;
  border-left: 3px solid transparent;
  display: grid;
  grid-template-areas: "time name coach slots";
  grid-template-columns: 120px 1fr 1fr 100px;
  grid-template-rows: auto;
  padding: 10px;

  &:hover {
    background-color: rgba(0, 133, 202, 0.15);
  }

  &.dagens {
    border-left-color: var(--mustard);
  }

  &.fitness {
    border-left-color: var(--green);
  }

  &.performance {
    border-left-color: var(--lochmara);
  }

  &.intro {
    border-left-color: rgb(36, 41, 46);
  }
}

.time {
  color: rgba(36, 41, 46, 0.6);
  font-size: 14px;
  grid-area: time;
}

.name {
  font-weight: 600;
  grid-area: name;
}

.coach {
  grid-area: coach;
}

.freeslots {
  font-weight: 600;
  grid-area: slots;
  text-align: right;
}

.slots {
  &.full {
    color: var(--vermillion);
  }
  
  &.few {
    color: var(--mustard);
  }
}

.slots-text {
  color: rgba(36, 41, 46, 0.5);
  font-size: 12px;
}

.participants-wrap {
  background-color: rgba(36, 41, 46, 0.08);
  border-left: 3px solid rgba(36, 41, 46, 0.15);
  border-top: 1px dashed rgba(36, 41, 46, 0.15);
  padding: 10px;
}

.participants {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-row-gap: 5px;
}
</style>
