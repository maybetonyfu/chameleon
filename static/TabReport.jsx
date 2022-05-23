import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from "ramda"
import TypeSig from "./TypeSig"
import {PlusIcon} from "@heroicons/react/outline"

import { nextStep, prevStep, setStep } from "./debuggerSlice"

const TabReport = () => {

    return (
        <div className='p-4 bg-gray-200'>
            <Summary></Summary>

            <Message></Message>
            <ReleventTerms></ReleventTerms>
        </div>
    )
}

const TabList = () => {
    const dispatch = useDispatch()
    let context = useSelector(R.path(['debugger', 'context']))
    let traverseId = useSelector(R.path(['debugger', 'currentTraverseId']))
    const multipleExps = useSelector(R.path(['debugger', 'multipleExps']))
    const [scrollProgress, setScrollProgress] = useState(0)
    return <div className='ml-3 mt-3 bg-blue-100 rounded-2xl'>
        <Expandable>
                    <div className='flex cursor-pointer px-4' onWheel={e => {
                        setScrollProgress(scrollProgress + R.clamp(-3, 3, e.deltaY))
                        console.log(scrollProgress)
                        if (scrollProgress > 100) {
                            dispatch(nextStep())
                            setScrollProgress(0)
                        } else if (scrollProgress < -100) {
                            dispatch(prevStep())
                            setScrollProgress(0)
                        }

                    }}>
                    {
                        multipleExps ? context.map((c, i) => <Tab
                            key={i}
                            steps={c.contextSteps}
                            exp={c.contextExp}
                            active={c.contextSteps.find(R.pipe(R.nth(0), R.equals(traverseId)))[2]}></Tab>) : null
                    }
                </div>
        </Expandable>
    </div> 
}
const Tab = ({ active = false, steps, exp }) => {
    let dispatch = useDispatch()
    const deductionStpe = useSelector(R.path(['debugger', 'debuggingSteps']))
    let tabReleventSteps = steps
        .map((step, i) => [...step, i])
        .filter(R.nth(2))
    let tabDefaultStep = tabReleventSteps[Math.round(tabReleventSteps.length / 2) - 1][3]
    return (
        <div
            onClick={_ => dispatch(setStep(tabDefaultStep))}
            className={'p-2 rounded-2xl inline-block w-max m-1 ' + (active ? 'bg-gray-900' : 'bg-white')} >
            <div className={'text-2xl mr-8 ' + (active ? 'text-white' : 'text-gray-800')} >{exp}</div>
            {deductionStpe ?
                <TabSteps
                    steps={tabReleventSteps}
                    active={active}></TabSteps>
                : null}

        </div>)
}

const TabSteps = ({ active = false, steps }) => {
    return (
        <div className='flex py-1'>
            {steps
                .map(step => <TabStep active={active} key={step[3]} traverseId={step[0]} step={step[3]}></TabStep>)
            }
        </div>)
}

const TabStep = ({ active = false, step, traverseId }) => {
    let dispatch = useDispatch()
    let currentTraverseId = useSelector(R.path(['debugger', 'currentTraverseId']))
    let stepping = R.equals(currentTraverseId, traverseId)
    let face = active && stepping ? 'bg-green-400 text-black'
        : active ? 'bg-gray-400 text-black'
            : 'bg-gray-700 text-white'
    return (
        <button
            onClick={e => { e.stopPropagation(); dispatch(setStep(step)) }}
            className={
                'w-5 h-5 leading-5 flex justify-center cursor-pointer rounded-full text-md mx-0.5 '
                + face}>
            {step + 1}
        </button>
    )
}

const Summary = () => {
    let contextItem = useSelector(state => state.debugger.currentContextItem);
    return contextItem === null ? null : (
        <Expandable>
                <div className='mb-5 bg-white p-3'>
                    <div className='text-md'>
                        <div>
                            It's possible to infer two conflicting types for the expression
                            <span className='code ml-2 px-1 rounded-md bg-gray-700 text-white inline-block not-italic'>
                                {contextItem['contextExp']}
                            </span>
                        </div>
                    </div>
                    <TabList></TabList>
        </div>
        </Expandable>
    )
}

const Expandable = ({children}) => {
    let size=25
    return <div className='relative'>
        {children}
        <div className='cursor-pointer bg-yellow-200 rounded-full z-10 absolute border' 
            style={{width: size, height : size, top: `calc(50% - ${size/2}px)`, left: -size/2}} >
                <PlusIcon></PlusIcon>
        </div>
    </div>
}



const Message = () => {
    let contextItem = useSelector(state => state.debugger.currentContextItem);
    return contextItem === null ? null : (
        <div className='mb-5'>
            {/* <div className='text-md my-2 w-full'>
                <div>It's possible to infer two conflicting types for the expression
                    <span className='code ml-2 px-1 rounded-md bg-gray-700 text-white inline-block not-italic'>
                        {contextItem['contextExp']}
                    </span>:
                </div>
            </div> */}

            <div className='my-1 '>
                <span className='inline-block mr-1'>Possible type 1: </span>
                <span className='code groupMarkerB rounded-sm px-0.5 cursor-pointer'>
                    <TypeSig
                        simple={contextItem.contextType1SimpleString}
                        full={contextItem.contextType1String}
                    ></TypeSig>
                </span>
            </div>
            <div className='text-xs italic'>Infered from the orange highlights on the left side</div>

            <div className='mb-1 mt-3'>
                <span className='inline-block mr-1'>Possible type 2: </span>
                <span className='code groupMarkerA rounded-sm px-0.5 cursor-pointer'>
                    <TypeSig
                        simple={contextItem.contextType2SimpleString}
                        full={contextItem.contextType2String}
                    ></TypeSig>
                </span>
            </div>
            <div className='text-xs italic'>Infered from the blue highlights on the left side</div>

        </div>
    );
};

const ReleventTerms = () => {
    let context = useSelector(R.path(['debugger', 'context']))
    let currentContextItem = useSelector(R.path(['debugger', 'currentContextItem']))
    let releventContext = context.filter(c => c.contextExp !== currentContextItem.contextExp)

    return (
        <div className='p-2 rounded-lg bg-gray-200'>
            <div className=''>Relevent type information:</div>
            {releventContext.map((c, i) => <ReleventItem item={c} key={i}></ReleventItem>)}
            {R.defaultTo([])(R.prop('contextGlobals', currentContextItem)).map(([exp, type], i) => <GlobalTypeHints exp={exp} type={type} key={i}></GlobalTypeHints>)}
        </div>
    )
}

const GlobalTypeHints = ({ exp, type }) => {
    return (
        <div className='flex flex-col my-1.5 p-1 bg-gray-100 rounded-md h-16 justify-center'>
            <div className='flex items-center'>
                <div className='code'>{exp}</div>
                <div className='code mx-0.5'>::</div>
                <div className={'code px-0.5 rounded-sm'}>{type}</div>
            </div>
            <div className='ml-1 text-sm italic'> Imported from Prelude</div>

        </div>
    )
}

const ReleventItem = ({ item }) => {
    let currentTraverseId = useSelector(R.path(['debugger', 'currentTraverseId']))
    const multipleExps = useSelector(R.path(['debugger', 'multipleExps']))

    let dispatch = useDispatch()
    let affinity =
        R.pipe(
            R.find(R.pipe(R.nth(0), R.equals(currentTraverseId))),
            R.nth(1)
        )(item.contextSteps)
    let type = affinity === 'L' ? item.contextType1String : item.contextType2String
    let origin = affinity === 'L' ? 'orange highlights' : 'blue highlights'
    let tabReleventSteps = item.contextSteps
        .map((step, i) => [...step, i])
        .filter(R.nth(2))
    let tabDefaultStep = tabReleventSteps[Math.round(tabReleventSteps.length / 2) - 1][3]
    return (
        <div className='flex flex-col my-1.5 bg-white p-1 rounded-md'>
            <div className='flex justify-between'>
                <div className='flex items-center'>
                    <div className='code'>{item.contextExp}</div>
                    <div className='code mx-0.5'>::</div>
                    <div className={'code px-0.5 rounded-sm  ' + (affinity === 'L' ? 'marker2' : 'marker1')}>{type}</div>
                </div>
                {multipleExps ? (
                    <div className='bg-white p-1 rounded-md flex items-center'>

                        <div>Looks wrong? </div>
                        <button
                            onClick={_ => dispatch(setStep(tabDefaultStep))}
                            className="bg-gray-900 text-white rounded-lg px-2 py-1 mx-1">Inspect</button>
                    </div>
                ) : null}

            </div>
            <div className='ml-1 text-sm italic'> Inferred from {origin} </div>

        </div>
    )
}

export default TabReport