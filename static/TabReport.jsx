import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from "ramda"
import TypeSig from "./TypeSig"

import { setStep } from "./debuggerSlice"
const TabReport = () => {
    let context = useSelector(R.path(['debugger', 'context']))
    let traverseId = useSelector(R.path(['debugger', 'currentTraverseId']))
    return (
        <div className='p-4'>
            <div className='bg-gray-200 p1 rounded-2xl flex cursor-pointer'>
                {
                    context.map((c, i) => <Tab
                        key={i}
                        steps={c.contextSteps}
                        exp={c.contextExp}
                        active={c.contextSteps.find(R.pipe(R.nth(0), R.equals(traverseId)))[2]}></Tab>)
                }
            </div>
            <Message></Message>
            <ReleventTerms></ReleventTerms>
        </div>
    )
}
const Tab = ({ active = false, steps, exp }) => {
    let dispatch = useDispatch()
    let tabReleventSteps = steps
        .map((step, i) => [...step, i])
        .filter(R.nth(2))
    let tabDefaultStep = tabReleventSteps[Math.round(tabReleventSteps.length / 2)  - 1][3]
    return (
        <div
            onClick={_ => dispatch(setStep(tabDefaultStep))}
            className={'p-2 rounded-2xl inline-block w-max m-1 ' + (active ? 'bg-gray-900' : 'bg-white')} >
            <div className={'px-1 text-2xl mb-3 ' + (active ? 'text-white' : 'text-gray-800')} >{exp}</div>
            <div>
                <TabSteps
                    steps={tabReleventSteps}
                    active={active}></TabSteps>
            </div>
        </div>)
}

const TabSteps = ({ active = false, steps }) => {
    return (
        <div className='flex'>
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

const Message = () => {
    let contextItem = useSelector(state => state.debugger.currentContextItem);
    return contextItem === null ? null : (
        <div className='mb-5'>
            <div className='text-md my-2 w-full'>
                <div>It's possible to infer two conflicting types for the expression
                    <span className='code ml-2 px-1 rounded-md bg-gray-700 text-white inline-block not-italic'>
                        {contextItem['contextExp']}
                    </span>:
                </div>
            </div>

            <div className='my-1 '>
                <span className='inline-block mr-1'>Possible type 1: </span>
                <span className='code groupMarkerB rounded-sm px-0.5 cursor-pointer'>
                    <TypeSig
                        simple={contextItem.contextType1SimpleString}
                        full={contextItem.contextType1String}
                    ></TypeSig>
                </span>
            </div>
            <div className='text-xs italic'>Possible type 1 can be infered from the orange highlights on the left side</div>

            <div className='mb-1 mt-3'>
                <span className='inline-block mr-1'>Possible type 2: </span>
                <span className='code groupMarkerA rounded-sm px-0.5 cursor-pointer'>
                    <TypeSig
                        simple={contextItem.contextType2SimpleString}
                        full={contextItem.contextType2String}
                    ></TypeSig>
                </span>
            </div>
            <div className='text-xs italic'>Possible type 2 can be infered from the blue highlights on the left side</div>

        </div>
    );
};

const ReleventTerms = () => {
    let context = useSelector(R.path(['debugger', 'context']))
    let currentExp = useSelector(R.path(['debugger', 'currentContextItem', "contextExp"]))
    let releventContext = context.filter(c => c.contextExp !== currentExp)
    return (
        <div className='p-2 border-2 rounded-2xl border-black '>
            <div className=''>Relevent type information:</div>
            {releventContext.map((c, i) => <ReleventItem item={c} key={i}></ReleventItem>)}

        </div>
    )
}

const ReleventItem = ({ item }) => {
    let currentTraverseId = useSelector(R.path(['debugger', 'currentTraverseId']))
    let affinity =
        R.pipe(
            R.find(R.pipe(R.nth(0), R.equals(currentTraverseId))),
            R.nth(1)
        )(item.contextSteps)
    let type = affinity === 'L' ? item.contextType1String : item.contextType2String
    let origin = affinity === 'L' ? 'orange facts': 'blue facts'
    return (
        <div className='flex'>
            <div>{item.contextExp}</div>
            <div className='code mx-0.5'>::</div>
            <div className='code'>{type}</div>
            <div className='ml-1'> (From {origin}) </div>
        </div>
    )
}

export default TabReport