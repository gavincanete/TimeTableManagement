const M = 'Monday'
const T = 'Tuesday'
const W = 'Wednesday'
const TH = 'Thursday'
const F = 'Friday'
const S = 'Saturday'

interface Checks {
    id: string;
    status: boolean;
    task: string;
}

// Describes the structure of the Timetable structure 
interface TimeTableProperties<TCheck> {
    key: string,
    subject: string,
    startTime: string,
    endTime: string,
    day: string,
    todolist?: TCheck[]
}

export const TimeTableSamples: TimeTableProperties<Checks>[] = [
    {
        key: '1',
        subject: 'Calculus',
        startTime: '7:30am',
        endTime: '8:30am',
        day: M,
        todolist: [
            {
                id: '1',
                status: false,
                task: 'label_1'
            },
            {
                id: '2',
                status: false,
                task: 'label_2'
            },
            {
                id: '3',
                status: false,
                task: 'label_3'
            },
            {
                id: '4',
                status: false,
                task: 'label_4'
            },
            {
                id: '5',
                status: false,
                task: 'label_5'
            },
        ]
    },
    {
        key: '2',
        subject: 'Programming',
        startTime: '8:30am',
        endTime: '9:30am',
        day: M,
        todolist: [
            {
                id: '6',
                status: false,
                task: 'label_6'
            },
            {
                id: '7',
                status: false,
                task: 'label_7'
            },
            {
                id: '8',
                status: false,
                task: 'label_8'
            },
            {
                id: '9',
                status: false,
                task: 'label_9'
            },
        ]
    },
    {
        key: '3',
        subject: 'Discrete Mathematics',
        startTime: '9:30am',
        endTime: '10:30am',
        day: T,
        todolist: [
            {
                id: '10',
                status: true,
                task: 'label_10'
            },
            {
                id: '11',
                status: false,
                task: 'label_11'
            }
        ]
    },
    {
        key: '4',
        subject: 'Software Engineering',
        startTime: '8:00am',
        endTime: '9:00am',
        day: T,
        todolist: [
            {
                id: '12',
                status: false,
                task: 'label_12'
            },
            {
                id: '13',
                status: false,
                task: 'label_13'
            },
            {
                id: '14',
                status: true,
                task: 'label_14'
            }
        ]
    },
    {
        key: '5',
        subject: 'Calculus',
        startTime: '7:30am',
        endTime: '8:30am',
        day: W,
        todolist: [
            {
                id: '15',
                status: true,
                task: 'label_15'
            },
            {
                id: '16',
                status: false,
                task: 'label_16'
            },
            {
                id: '17',
                status: false,
                task: 'label_17'
            }
        ]
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