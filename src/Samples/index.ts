const M = 'Monday'
const T = 'Tuesday'
const W = 'Wednesday'
const TH = 'Thursday'
const F = 'Friday'
const S = 'Saturday'

// Describes the structure of the Timetable structure 
interface TimeTableProperties {
    key: string,
    subject: string,
    startTime: string,
    endTime: string,
    day: string
}

export const TimeTableSamples: TimeTableProperties[] = [
    {
        key: '1',
        subject: 'Calculus',
        startTime: '7:30am',
        endTime: '8:30am',
        day: M,
    },
    {
        key: '2',
        subject: 'Programming',
        startTime: '8:30am',
        endTime: '9:30am',
        day: M,
    },
    {
        key: '3',
        subject: 'Discrete Mathematics',
        startTime: '9:30am',
        endTime: '10:30am',
        day: T,
    },
    {
        key: '4',
        subject: 'Software Engineering',
        startTime: '8:00am',
        endTime: '9:00am',
        day: T,
    },
    {
        key: '5',
        subject: 'Calculus',
        startTime: '7:30am',
        endTime: '8:30am',
        day: W,
    },
    {
        key: '6',
        subject: 'Programming',
        startTime: '8:30am',
        endTime: '9:30am',
        day: W,
    },
    {
        key: '7',
        subject: 'Discrete Mathematics',
        startTime: '9:30am',
        endTime: '10:30am',
        day: TH,
    },
    {
        key: '8',
        subject: 'Software Engineering',
        startTime: '8:00am',
        endTime: '9:00am',
        day: TH,
    },
    {
        key: '9',
        subject: 'Calculus',
        startTime: '7:30am',
        endTime: '8:30am',
        day: F,
    },
    {
        key: '10',
        subject: 'Programming',
        startTime: '8:30am',
        endTime: '9:30am',
        day: F,
    },
    {
        key: '11',
        subject: 'NSTP',
        startTime: '1:30pm',
        endTime: '4:30am',
        day: S,
    },
]