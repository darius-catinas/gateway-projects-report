import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import './Filter.css';
import Datepick from '../datepicker';

interface CalendarFilterProps{
    expandIcon: any,
    dateText: string,
    onSelectDate: (_: string) => void,
    showDate: Date
}

const CalendarFilter = ({ expandIcon, dateText, onSelectDate, showDate }: CalendarFilterProps) => {
  return (
    <Menu as="div" className="filter-item relative inline-block text-left">
      <div>
        <Menu.Button className="menu-item inline-flex justify-center w-full rounded-md border border-gray-300
         shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 items-center"
        >
          {dateText}
          <div className="flex justify-center items-center m-w-64 ml-5">
            { expandIcon }
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="menu-item origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Datepick selectDate={onSelectDate} initialDate={showDate} />
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default CalendarFilter;
