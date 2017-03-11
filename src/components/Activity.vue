<template>
  <li class="activity" @click="displayParticipants(activity)">
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
    </div>
  </li>
</template>

<script>
import { typeOfWorkout } from '@/utils/helpers'

export default {
  name: 'activity',
  props: ['activeId', 'activity', 'displayParticipants'],
  methods: {
    typeOfWorkout (activity) {
      return typeOfWorkout(activity.product.id)
    }
  }
}
</script>

<style scoped src="./Activities.css"></style>

