import React from "react";
import useTheme from "../contexts/theme";
import themebtn from "../assets/theme.png";

export default function ThemeBtn() {
    const { themeMode, lightTheme, darkTheme } = useTheme();
    const onChangeBtn = (e) => {
        if (themeMode == "light") {
            darkTheme();
            themeMode = !themeMode;
        } else {
            lightTheme();
            themeMode = !themeMode;
        }
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <img src={themebtn} onClick={onChangeBtn} className="w-10" />
        </label>
    );
}
