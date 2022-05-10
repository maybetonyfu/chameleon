import React from 'react'

const Toggle = ({ active, onClick }) => {
    return <div className="py-2 flex items-center">
        <span
            onClick={onClick}
            className={`
        switch-button
        flex
        w-10
        h-6
        rounded-full
        items-center
        px-1
        cursor-pointer
      ` + (active ? 'flex-row-reverse bg-green-400' : 'bg-gray-500')
            }
        >
            <span
                className={"block h-4 w-4 rounded-full " + (active ? 'bg-gray-600' : 'bg-gray-100')}
            ></span>
        </span>
    </div>
}

export default Toggle