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
            <img
                src={themebtn}
                onClick={onChangeBtn}
                className="sm:w-10 sm:h-10 w-5 h-5 rounded-full border-[2px] bg-white"
            />
        </label>
    );
}
