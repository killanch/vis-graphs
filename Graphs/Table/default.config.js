import { theme } from "../../theme";

export const properties = {
    width: "100%",
    padding: 5,
    limit: 100,

    selectable: true,
    multiSelectable: false,
    showCheckboxes: false,
    enableSelectAll: true,

    rowHeight: 40,
    fontColor: theme.palette.blackLightColor,
    highlightColor: theme.palette.greenLighterColor,
    border: {
        top: "solid 1px " + theme.palette.greyLightColor,
        left: "0",
        right: "0",
        bottom: "0",
    },
    header: {
        fontColor: theme.palette.blackColor,
        border: {
            top: "0",
            left: "0",
            right: "0",
            bottom: "solid 2px " + theme.palette.greyLightColor,
        }
    }
}
