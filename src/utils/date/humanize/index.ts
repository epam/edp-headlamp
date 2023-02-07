import humanizeDuration from 'humanize-duration';

export const humanize = humanizeDuration.humanizer();

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

export const humanizeDefault = (timeA: number, timeB: number) =>
    humanize(timeA - timeB, {
        language: 'en-mini',
        spacer: '',
        delimiter: ' ',
        fallbacks: ['en'],
        largest: 2,
        round: false,
        units: ['m', 's'],
    });

export const formatFullYear = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'UTC',
    }).format(date);
