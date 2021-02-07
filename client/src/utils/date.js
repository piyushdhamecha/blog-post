export const getFormattedDate = (date) => new Date(Date.parse(date)).toLocaleDateString('en-US', {
    dateStyle: 'long',
  })
