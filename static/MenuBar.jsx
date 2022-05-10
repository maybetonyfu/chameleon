import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toEditMode, toNormalMode, switchTaskThunk, typeCheckThunk, setTask, toggleDebuggerStpes, toggleMultileExpThunk, setStep } from "./debuggerSlice"
import { PencilAltIcon, EyeIcon } from "@heroicons/react/solid"
import Toggle from "./Toggle"
import * as R from "ramda"

const MenuBar = () => {
    const dispatch = useDispatch()
    const deductionStpe = useSelector(R.path(['debugger', 'debuggingSteps']))
    const multipleExps = useSelector(R.path(['debugger', 'multipleExps']))

    const steps = useSelector(R.path(['debugger', 'steps']))
    const middleStep = Math.floor(steps.length / 2)

    useEffect(() => {
        dispatch(setTask(1));
        dispatch(typeCheckThunk())
    }, [])
    return <div className="w-full bg-gray-100 h-10 flex justify-between">
        <div className="flex items-center">
            <a href="/" className="cursor-pointer mr-4 px-4" style={{}}>
                <svg className="w-10" viewBox="0 0 100 100">
                    <path d="M9.061,50.971c-0,3.037 3.464,5.499 7.737,5.499l-0,-5.499l-7.737,0Z" style={{ fill: '#3eac3a' }} />
                    <rect x="16.793" y="50.98" width="43.762" height="5.49" style={{ fill: '#3eac3a' }} />
                    <path d="M50,10.032c-22.61,0 -40.939,18.329 -40.939,40.939l40.939,0l0,-40.939Z" style={{ fill: '#3c9339' }} />
                    <path d="M46.807,69.476c0,7.182 6.164,13.005 13.769,13.005l-0,-13.005l-13.769,-0Z"
                        style={{ fill: '#3c9339' }} />
                    <path d="M56.139,60.144c-5.154,-0 -9.332,4.178 -9.332,9.332l9.332,-0l0,-9.332Z" style={{ fill: '#087604' }} />
                    <path
                        d="M60.555,82.481c12.507,0 22.645,-11.512 22.645,-25.712c0,-14.2 -10.138,-25.712 -22.645,-25.712l0,51.424Z"
                        style={{ fill: '#21781e' }} />
                    <path d="M56.139,60.144c2.439,-0 4.416,2.089 4.416,4.666c0,2.577 -1.977,4.666 -4.416,4.666l0,-9.332Z"
                        style={{ fill: '#0d9509' }} />
                    <path d="M56.139,56.472l0,-0.002l4.416,0l0,4.572l0,-0l0,-0.026c0,-2.466 -1.967,-4.475 -4.416,-4.544Z"
                        style={{ fill: '#3eac3a' }} />
                    <path d="M50,50.985l-0,-0.005l10.555,0l0,10.926l-0,0l0,-0.062c0,-5.892 -4.702,-10.696 -10.555,-10.859Z"
                        style={{ fill: '#1c7e18' }} />
                    <path d="M53.205,31.056l-0,0.001l-3.205,0l0,-3.317l0,-0l0,0.019c0,1.789 1.428,3.247 3.205,3.297Z"
                        style={{ fill: '#21781e' }} />
                    <rect x="50" y="31.057" width="10.555" height="19.923" style={{ fill: '#21781e' }} />
                    <path d="M34.015,56.47c0,4.563 3.908,8.262 8.729,8.262c4.821,-0 8.729,-3.699 8.729,-8.262l-17.458,0Z"
                        style={{ fill: '#486c47' }} />
                </svg>
            </a>
            <p className="mr-1">Load examples:</p>
            <select defaultValue={1} onChange={e => dispatch(switchTaskThunk(e.target.value))} className="bg-gray-300 h-8 px-4 py-1 rounded-md">
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
                <EyeIcon className='h-4 w-4 mr-1'></EyeIcon>Type check
            </button>

        </div>

        <div className="flex items-center px-2">
            <div className="mr-1">Debugging Step:</div>
            <div className="ml-1 mr-2">
                <Toggle active={deductionStpe} onClick={_ => { 
                    if (!multipleExps && !deductionStpe) dispatch(toggleMultileExpThunk())
                    dispatch(toggleDebuggerStpes()) 
                }}></Toggle>
            </div>

            <div className="mr-1">Multiple Expressions:</div>
            <div className="ml-1 mr-2">
                <Toggle active={multipleExps} onClick={_ => {
                    if (multipleExps && deductionStpe) dispatch(toggleDebuggerStpes())
                    dispatch(toggleMultileExpThunk())
                }}></Toggle>
            </div>
        </div>

    </div>
}

export default MenuBar