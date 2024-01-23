import humanizeDuration from 'humanize-duration';

const humanize = humanizeDuration.humanizer();
humanize.languages['en-mini'] = {
  y: () => 'y',
  mo: () => 'mo',
  w: () => 'w',
  d: () => 'd',
  h: () => 'h',
  m: () => 'm',
  s: () => 's',
  ms: () => 'ms',
};

export const formatDateToDuration = (startDate: string, endDate: string) => {
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);

  return humanize(new Date(endDateObject).getTime() - new Date(startDateObject).getTime(), {
    language: 'en-mini',
    spacer: '',
    fallbacks: ['en'],
    round: true,
    largest: 1,
  });
};
