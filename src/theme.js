const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

const theme = {
    device: {
        mobileS: `(max-width: ${size.mobileS})`,
        mobileM: `(max-width: ${size.mobileM})`,
        mobileL: `(max-width: ${size.mobileL})`,
        tablet: `(max-width: ${size.tablet})`,
        laptop: `(max-width: ${size.laptop})`,
        laptopL: `(max-width: ${size.laptopL})`,
        desktop: `(max-width: ${size.desktop})`,
        desktopL: `(max-width: ${size.desktop})`
    },
    colors: {
        primary: "#372c48",
        primaryHover: "#372c48bd",
        blue: "#006fc3",
        blueHover: "#006fc3e6",
        white: "#fff",
        whiteHover: "#e6e6e6c9",
        black: "#000",
        blackHover: "#000000bf",
        textBlue: "#006fc3",
        textBlueHover: "#006fc3bf",
        lightgray: "#F7F7F7",
        textLightGray: "rgb(20 20 20 / 0.84)",
        textBlack: "#000000",
        orange: "#ffa71b",
        white: "#ffffff",
        green: "#71c097",
        gray: "#00000099",
        darkGray: "#707070",
        red: "#c44a2d",
    },
    fontSizes: {
        xxl: "24px",
        xl: "22px",
        lg: "20px",
        md: "18px",
        sm: "16px",
        xsm: "14px",
    },
    spaces: {
        x5l: "36px",
        x4l: "32px",
        x3l: "28px",
        xxl: "24px",
        xl: "22px",
        lg: "20px",
        md: "18px",
        sm: "16px",
        xsm: "14px",
    },
    blankSpace: {
        x5l: "36px",
        x4l: "32px",
        x3l: "28px",
        xxl: "24px",
        xl: "22px",
        lg: "20px",
        md: "18px",
        sm: "16px",
        xsm: "14px",
    }
}



export default theme