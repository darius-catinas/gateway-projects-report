import React from 'react';
import { ReactComponent as Card } from '../../assets/side/card.svg';
import { ReactComponent as Computer } from '../../assets/side/computer.svg';
import { ReactComponent as Menu } from '../../assets/side/menu.svg';
import { ReactComponent as Piechart } from '../../assets/side/piechart.svg';
import { ReactComponent as Shutdown } from '../../assets/side/shutdown.svg';
import './Sidebar.css';

interface SidebarIconProps{
  RenderIcon: any,
  selected: boolean,
  key: number
}

const SidebarIcon = ({ RenderIcon, selected, key }: SidebarIconProps) => {
  return (
    <div className="sidebar-icon" key={key}>
      <RenderIcon />
    </div>
  )
}

const Sidebar: React.FC = () => {
  const mapSidebarIcons = () => {
    const iconList = [Card, Computer, Menu, Piechart, Shutdown]
    return iconList.map((icon, index) => <SidebarIcon RenderIcon={icon} selected={false} key={index} />)
  }

  return (
    <div className="sidebar-container">
      {mapSidebarIcons()}
    </div>
  )
}

export default Sidebar;
