<template>
  <div>
    <ul class="filters">
      <li
        v-for="filterType in filters"
        class="filter"
        :class="{
          'active': filter === filterType.type,
          [filterType.type]: true
        }"
        @click="filterActivities(filterType.type)">
        {{ filterType.name }}
      </li>
    </ul>
    <ul class="list">
      <li v-for="(activities, day) in activitiesByDay">
        <div class="title">{{ day }}</div>
        <transition-group class="activities" name="list" tag="ul">
          <activity
          v-for="activity in activities"
          :activeId="activeId"
          :activity="activity"
          :displayParticipants="displayParticipants"
          :key="activity.id">
          </activity>
        </transition-group>
      </li>
    </ul>
  </div>
</template>

<script src="./Activities.js"></script>
<style scoped src="./Activities.css"></style>
