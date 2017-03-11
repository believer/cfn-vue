import {
  typeOfWorkout,
  groupActivities,
  groupByMonth,
  groupByYear
} from '@/utils/helpers'


describe('helpers', () => {
  describe('#typeOfWorkout', () => {
    it('returns performance for specific IDs', () => {
      expect(typeOfWorkout(179)).to.eql('performance')
      expect(typeOfWorkout(236)).to.eql('performance')
    })

    it('returns fitness for specific IDs', () => {
      expect(typeOfWorkout(313)).to.eql('fitness')
    })

    it('returns tryout for specific IDs', () => {
      expect(typeOfWorkout(27)).to.eql('tryout')
    })

    it('returns intro for specific IDs', () => {
      expect(typeOfWorkout(225)).to.eql('intro')
      expect(typeOfWorkout(227)).to.eql('intro')
      expect(typeOfWorkout(228)).to.eql('intro')
      expect(typeOfWorkout(229)).to.eql('intro')
      expect(typeOfWorkout(241)).to.eql('intro')
    })

    it('returns dagens for anything else', () => {
      expect(typeOfWorkout('')).to.eql('dagens')
      expect(typeOfWorkout('test')).to.eql('dagens')
      expect(typeOfWorkout(1337)).to.eql('dagens')
      expect(typeOfWorkout(undefined)).to.eql('dagens')
    })
  })
  
  describe('#groupByMonth', () => {
    it('returns the month part of an activity date', () => {
      const activity = {
        timepoint: {
          date: '2017-03-11'
        }
      }

      expect(groupByMonth(activity)).to.eql('03')
    })
  })

  describe('#groupByYear', () => {
    it('returns the year part of an activity date', () => {
      const activity = {
        timepoint: {
          date: '2017-03-11'
        }
      }

      expect(groupByYear(activity)).to.eql('2017')
    })
  })

  describe('#groupActivities', () => {
    it('sort and groups correctly', () => {
      const activities = [
        {
          product: {
            name: 'Dagens'
          },
          start: {
            timepoint: {
              date: '2017-03-11',
              timestamp: 1900000000
            }
          },
          participants: [
            { lastname: 'Ceasar' },
            { lastname: 'Xerxes' },
            { lastname: 'Aardvark' }
          ],
          resources: [
            {
              type: 'Personal',
              name: 'Coach'
            }
          ]
        }
      ]

      const result = {
        '2017-03-11': [
          Object.assign({}, activities[0], {
            coach: 'Coach',
            participants: [
              { lastname: 'Aardvark' },
              { lastname: 'Ceasar' },
              { lastname: 'Xerxes' }
            ]
          })
        ]
      }

      expect(groupActivities('')(activities)).to.eql(result)
    })

    it('filters a specific type of workouts', () => {
      const activities = [
        {
          product: {
            name: 'Dagens'
          },
          start: {
            timepoint: {
              date: '2017-03-11',
              timestamp: 1900000000
            }
          },
          participants: [
            { lastname: 'Ceasar' },
            { lastname: 'Xerxes' },
            { lastname: 'Aardvark' }
          ],
          resources: [
            {
              type: 'Personal',
              name: 'Coach'
            }
          ]
        },
        {
          product: {
            name: 'Performance'
          },
          start: {
            timepoint: {
              date: '2017-03-11',
              timestamp: 1900000000
            }
          },
          participants: [
            { lastname: 'Ceasar' },
            { lastname: 'Xerxes' },
            { lastname: 'Aardvark' }
          ],
          resources: [
            {
              type: 'Personal',
              name: 'Coach'
            }
          ]
        }
      ]

      const result = {
        '2017-03-11': [
          Object.assign({}, activities[0], {
            coach: 'Coach',
            participants: [
              { lastname: 'Aardvark' },
              { lastname: 'Ceasar' },
              { lastname: 'Xerxes' }
            ]
          })
        ]
      }

      expect(groupActivities('dagens')(activities)).to.eql(result)
    })
  })
})