import React from "react";
import { dashboard } from "../../data/dashboard";
import MainMenu from "./MainMenu";

const Menu = () => {
  const data = dashboard;
  return (
    <div className="flex flex-col w-56 items-center h-full overflow-hidden text-gray-400">
      <div className="">
        <div className="flex flex-col items-center">
          {data.menuData.length > 0 &&
            data.menuData.map((item, index) => (
              <MainMenu
                key={index}
                name={item.name}
                link={item.link}
                Icon={item.Icon}
              />
            ))}
        </div>
        <div className="flex flex-col items-center mt-2 pt-2 border-t border-gray-700">
          {data.settingMenuData.length > 0 &&
            data.settingMenuData.map((item, index) => (
              <MainMenu
                key={index}
                name={item.name}
                link={item.link}
                Icon={item.Icon}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
