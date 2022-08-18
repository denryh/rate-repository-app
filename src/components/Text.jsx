import { Text as NativeText, StyleSheet } from "react-native"

import theme from "../theme"

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSize.body,
        fontFamily: theme.font.main,
        fontWeight: theme.fontWeigths.normal,
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary
    },
    colorPrimary: {
        color: theme.colors.textPrimary,
    },
    fontSizeSubheading: {
        fontSize: theme.fontSize.subheading,
    },
    fontWeightBold: {
        fontWeight: theme.fontWeigths.bold,
    }
})

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontWeight === 'bold' && styles.fontWeightBold,
        style
    ]

    return <NativeText style={textStyle} {...props} />
}

export default Text;