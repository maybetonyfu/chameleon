import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toEditMode, toNormalMode, switchTaskThunk, typeCheckThunk, setTask } from "./debuggerSlice"
import { PencilAltIcon, EyeIcon } from "@heroicons/react/solid"

const MenuBar = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setTask(0));
        dispatch(typeCheckThunk())
    }, [])
    return <div className="w-full bg-gray-100 h-10 flex items-center px-3">
        <p className="mr-1">Load examples</p>
        <select defaultValue={0} onChange={e => dispatch(switchTaskThunk(e.target.value))} className="bg-gray-300 h-8 px-4 py-1 rounded-md">
            <option value={0}>Example 1</option>
            <option value={1}>Example 2</option>
            <option value={2}>Example 3</option>
            <option value={3}>Example 4</option>
            <option value={4}>Example 5</option>
            <option value={5}>Example 6</option>
            <option value={6}>Example 7</option>
            <option value={7}>Example 8</option>
        </select>
        <button
            className='bg-gray-300 px-4 py-1 rounded-md mx-2 flex h-8 justify-center items-center'
            onClick={_ => dispatch(toEditMode())}
        >
            <PencilAltIcon className='h-4 w-4 mr-1'></PencilAltIcon>Edit code
        </button>
        <button
            className='bg-gray-300 px-4 py-1 rounded-md mx-2 flex h-8 justify-center items-center'
            onClick={_ => {
                dispatch(toNormalMode())
                dispatch(typeCheckThunk())
            }}
        >
            <EyeIcon className='h-4 w-4 mr-1'></EyeIcon>Normal Mode
        </button>

    </div>
}

export default MenuBar