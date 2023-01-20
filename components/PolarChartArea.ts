import { defineComponent, h, PropType } from 'vue'

import { PolarArea } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale)

export default defineComponent({
    name: 'PolarAreaChart',
    components: {
        PolarArea
    },
    props: {
        chartId: {
            type: String,
            default: 'polar-chart'
        },
        width: {
            type: Number,
            default: 320
        },
        height: {
            type: Number,
            default: 320
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object as PropType<Partial<CSSStyleDeclaration>>,
            default: () => { }
        },
        plugins: {
            type: Array as PropType<Plugin<'polarArea'>[]>,
            default: () => []
        },
        stats: {
            type: Array,
            default: () => []
        },
        labels: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const chartData = {
            labels: [
                ...props.labels
            ],
            datasets: [
                {
                    label: 'Player Stats',
                    backgroundColor: [
                        'darkseagreen', '#e7bc91', '#ffcb69', '#98c1d9', '#fe938c', '#ff9770', 'dodgerblue', '#ced4da', '#b8b8ff'
                    ],
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [
                        ...props.stats
                    ]
                },

            ]
        }

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false
        }

        return () =>
            h(PolarArea, {
                data: chartData,
                chartOptions,
                chartId: props.chartId,
                width: props.width,
                height: props.height,
                cssClasses: props.cssClasses,
                styles: props.styles,
                plugins: props.plugins
            })
    }
})