const GREEN = {
    xxl: '#284400',
    xl: '#467500',
    l: '#64a600',
    m: '#82d900',
    s: '#a8ff24',
    xs: '#c2ff68',
    xxs: '#e8ffc4',
    foul: '#ce0000',
    r: '#64a600'
};
const BLUE = {
    xxl: '#000079',
    xl: '#004b97',
    l: '#0066cc',
    m: '#0080ff',
    s: '#46a3ff',
    xs: '#84c1ff',
    xxs: '#c4e1ff',
    foul: '#ce0000',
    r: '#2894ff'
};
const RED = {
    xxl: '#4d0000',
    xl: '#750000',
    l: '#ae0000',
    m: '#ea0000',
    s: '#ff5151',
    xs: '#ff9797',
    xxs: '#ffd2d2',
    foul: '#921aff',
    r: '#ce0000'
}
const YELLOW = {
    xxl: '#5b4b00',
    xl: '#977c00',
    l: '#c6a300',
    m: '#eac100',
    s: '#ffdc35',
    xs: '#ffe66f',
    xxs: '#fff0ac',
    foul: '#ce0000',
    r: '#ffd306'
}
const PEACH = {
    xxl: '#600030',
    xl: '#9f0050',
    l: '#d9006c',
    m: '#ff0080',
    s: '#ff60af',
    xs: '#ff95ca',
    xxs: '#ffd9ec',
    foul: '#921aff',
    r: '#ff0080'
}
const GREY = {
    xxl: '#0e0e0e',
    xl: '#121212',
    l: '#3c3c3c',
    m: '#6c6c6c',
    s: '#9d9d9d',
    xs: '#bebebe',
    xxs: '#f0f0f0',
    foul: '#ce0000',
    r: '#000'
}
const ORANGE = {
    xxl: '#844200',
    xl: '#bb5e00',
    l: '#ea7500',
    m: '#ff9224',
    s: '#ffaf60',
    xs: '#ffc78e',
    xxs: '#ffe4ca',
    foul: '#ce0000',
    r: '#ea7500'
}
const PURPLE = {
    xxl: '#28004d',
    xl: '#4b0091',
    l: '#6f00d2',
    m: '#921aff',
    s: '#b15bff',
    xs: '#ca8eff',
    xxs: '#dcb5ff',
    foul: '#ce0000',
    r: '#921aff'
}
const CYAN = {
    xxl: '#003e3e',
    xl: '#007979',
    l: '#00aeae',
    m: '#00e3e3',
    s: '#00ffff',
    xs: '#a6ffff',
    xxs: '#caffff',
    foul: '#ce0000',
    r: '#00e3e3'
}
const PINK = {
    xxl: '#460046',
    xl: '#750075',
    l: '#ae00ae',
    m: '#e800e8',
    s: '#ff77ff',
    xs: '#ffa6ff',
    xxs: '#ffbfff',
    foul: '#921aff',
    r: '#e800e8'
}

const parColMap = {
    '中國國民黨': [BLUE],
    '民主進步黨': [GREEN],
    '時代力量': [YELLOW],
    '親民黨': [ORANGE],
    '社會民主黨': [RED, PEACH],
    '民國黨': [YELLOW, ORANGE, CYAN],
    '綠黨社會民主黨聯盟': [RED, PEACH, GREEN, CYAN],
    '綠黨': [GREEN, CYAN],
    '新黨': [YELLOW, ORANGE, RED],
    '無黨團結聯盟': [RED, PEACH, PINK, PURPLE],
    '台灣團結聯盟': [ORANGE, YELLOW, GREEN, CYAN],
    '中華統一促進黨': [RED, PURPLE, PINK, PEACH],
    '信心希望聯盟': [CYAN, PEACH, PINK, PURPLE]
}

export function createColorJudger(parties, icands, grey = true) {

    let colors = [GREEN, BLUE, RED, YELLOW, PURPLE, ORANGE, PINK, PEACH, CYAN],
        last = CYAN,
        map = {};

    // Determine colors of parties
    for (let party of parties) {

        // Get default order of colors of this party
        let pcolors = parColMap[party];
        // If this party is not famous, use default color list
        if (!pcolors) pcolors = colors;
        // Find the first color that exists in the remaining colors
        for (let col of pcolors) {
            let index = colors.indexOf(col);
            if (index != -1) {
                map[party] = col;
                colors.splice(index, 1);
                break;
            }
        }
        // If not found, use the first color in the remainings
        if (!map[party]) {
            map[party] = colors[0] || last;
            colors.shift();
        }
    }

    // Determine colors of independent candidates
    if (grey) last = GREY;
    for (let name of icands) {
        map[name] = colors[0] || last;
        colors.shift();
    }

    return flag => map[flag];
}