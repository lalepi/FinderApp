export const apiBaseUrl = 'http://localhost:3001'

// Function to generate transparency variations for a given color
const generateTransparency = (color: string) => ({
    50: `${color}80`, // 50% transparency
    60: `${color}99`, // 60% transparency
    70: `${color}B3`, // 70% transparency
    80: `${color}CC`, // 80% transparency
    90: `${color}E6`, // 90% transparency
    100: `${color}FF`, // 100% transparency
})

export const Colors = {
    // Base colors

    black: {
        main: 'rgb(0, 0, 0)',
        transparency: {
            main: generateTransparency('rgb(0, 0, 0)'),
        },
    },

    light: {
        main: '#F1F2F3',
        secondary: '#FFFFFF',
        transparency: {
            main: generateTransparency('#F1F2F3'),
            secondary: generateTransparency('#FFFFFF'),
        },
    },

    gray: {
        main: '#72757E',
        secondary: '#8D8F9A',
        transparency: {
            main: generateTransparency('#72757E'),
            secondary: generateTransparency('#8D8F9A'),
        },
    },

    dark: {
        main: '#1D1F22',
        secondary: '#43464E',
        transparency: {
            main: generateTransparency('#1D1F22'),
            secondary: generateTransparency('#43464E'),
        },
    },

    //Brand colors
    green: {
        main: '#DCFCE7',
        secondary: '#ECFDF5',
        transparency: {
            main: generateTransparency('#DCFCE7'),
            light: generateTransparency('#ECFDF5'),
        },
    },

    darkGreen: {
        main: '#064E3B',
        secondary: '#059669',
        transparency: {
            main: generateTransparency('#064E3B'),
            light: generateTransparency('#059669'),
        },
    },
}
