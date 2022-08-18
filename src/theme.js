import { Platform } from "react-native"

const theme = {
    background: {
        appBar: '#24292e',
        main: '#e1e4e8',
    },
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        error: '#d73a4a',
    },
    fontSize: {
        body: 14,
        subheading: 16,
    },
    font: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        })
    },
    fontWeigths: {
        normal: '400',
        bold: '700',
    }
}

export default theme