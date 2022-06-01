import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import TypeSig from './TypeSig';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/outline';
import {
  nextStep,
  prevStep,
  setStep,
  lockStep,
  toggleDebuggerStpes,
  toggleMultipleExps,
  showOnlyMark1,
  showOnlyMark2,
  showDefination,
  showBoth,
} from './debuggerSlice';

const TabReport = () => {
  return (
    <div className='p-4 bg-gray-200 h-full'>
      <Summary></Summary>
      <Message></Message>
      <ReleventTerms></ReleventTerms>
    </div>
  );
};

const TabList = () => {
  const dispatch = useDispatch();
  let context = useSelector(R.path(['debugger', 'context']));
  let steps = useSelector(R.path(['debugger', 'steps']));

  let pinnedStep = useSelector(R.path(['debugger', 'pinnedStep']));
  let pinnedTraverseId = steps[pinnedStep].stepId;
  const multipleExps = useSelector(R.path(['debugger', 'multipleExps']));

  const [scrollProgress, setScrollProgress] = useState(0);
  return (
    <div
      className={
        'h-20  shadow-sm bg-gray-100 flex items-center   ' +
        (multipleExps ? 'rounded-b-lg' : '')
      }
      style={{ paddingLeft: 40 }}
    >
      <div
        className={
          'flex items-center cursor-pointer flex-row-reverse justify-end '
        }
        onWheel={e => {
          let progress = R.clamp(
            -1.5,
            1.5,
            Math.sign(e.deltaY) * Math.log2(Math.abs(e.deltaY)),
          );
          setScrollProgress(scrollProgress + progress);
          console.log(progress);
          if (scrollProgress > 30) {
            dispatch(nextStep());
            setScrollProgress(0);
          } else if (scrollProgress < -30) {
            dispatch(prevStep());
            setScrollProgress(0);
          }
        }}
      >
        {multipleExps
          ? context.map((c, i) => (
            <Tab
              key={i}
              steps={c.contextSteps}
              exp={c.contextExp}
              active={
                c.contextSteps.find(
                  R.pipe(R.nth(0), R.equals(pinnedTraverseId)),
                )[2]
              }
            ></Tab>
          ))
          : null}
      </div>
    </div>
  );
};
const Tab = ({ active = false, steps, exp }) => {
  let dispatch = useDispatch();
  const deductionSteps = useSelector(R.path(['debugger', 'debuggingSteps']));
  let pinnedStep = useSelector(R.path(['debugger', 'pinnedStep']));
  let traverseId = useSelector(R.path(['debugger', 'currentTraverseId']));

  let tabReleventSteps = steps.map((step, i) => [...step, i]).filter(R.nth(2));
  let tabDefaultStep =
    tabReleventSteps[Math.round(tabReleventSteps.length / 2) - 1][3];
  let hovering = steps.find(R.pipe(R.nth(0), R.equals(traverseId)))[2];
  let face;
  if (active) {
    face = 'bg-gray-900 border-gray-900 border active:bg-gray-600';
  } else if (deductionSteps && !active && hovering) {
    face = 'bg-white active:bg-gray-200 border-dashed border border-black';
  } else if (deductionSteps && !active && !hovering) {
    face = 'bg-white active:bg-gray-200 border ';
  } else if (!deductionSteps && !active && hovering) {
    face = 'bg-white active:bg-gray-200 border-dashed border border-black';
  } else if (!deductionSteps && !active && !hovering) {
    face = 'bg-white active:bg-gray-200 border ';
  }

  let maxSize = deductionSteps ? { height: '4.5rem', } : { height: '3rem', transitionDelay: '75ms' }
  return (
    <div
      className={face + ' flex flex-col w-max m-1 px-2 py-1 rounded-lg duration-75'}
      style={{ minWidth: 80, transitionProperty: 'height', ...maxSize }}
      onClick={_ => dispatch(lockStep(tabDefaultStep))}
      onMouseEnter={_ =>
        active ? null : dispatch(setStep(tabDefaultStep))
      }
      onMouseLeave={_ =>
        dispatch(setStep(pinnedStep))
      }
    >
      <div
        className={
          ' rounded-t-2xl inline-block w-full h-10 leading-10 text-xl code select-none ' +
          (active ? 'text-white' : 'text-gray-800')
        }
      >
        {exp}
      </div>
      <div className={' ' + (deductionSteps ? 'h-6 w-full' : 'h-0 w-0')}>
        <TabSteps steps={tabReleventSteps} active={active}></TabSteps>
      </div>
    </div>
  );
};

const TabSteps = ({ active = false, steps }) => {
  return (
    <div className='flex flex-row-reverse justify-end '>
      {steps.map(step => (
        <TabStep
          active={active}
          key={step[3]}
          traverseId={step[0]}
          step={step[3]}
        ></TabStep>
      ))}
    </div>
  );
};

const TabStep = ({ active = false, step, traverseId }) => {
  let dispatch = useDispatch();
  let numOfSteps = useSelector(R.path(['debugger', 'numOfSteps']));
  let currentTraverseId = useSelector(
    R.path(['debugger', 'currentTraverseId']),
  );
  let deductionSteps = useSelector(R.path(['debugger', 'debuggingSteps']));

  let pinnedStep = useSelector(R.path(['debugger', 'pinnedStep']));
  let stepping = R.equals(currentTraverseId, traverseId);
  let pinned = pinnedStep === step;
  let face;

  if (active && pinned) {
    face = 'bg-green-400 text-black';
  } else if (stepping && active) {
    face = 'bg-gray-600 border-dashed border border-white text-white';
  } else if (stepping && !active) {
    face = 'border-dashed bg-gray-200 text-black border-black border';
  } else if (active) {
    face = 'bg-gray-400 text-black';
  } else if (!active) {
    face = 'bg-gray-700 text-white';
  }

  return (
    <button
      onClick={e => {
        e.stopPropagation();
        dispatch(lockStep(step));
      }}
      onMouseEnter={_ => {
        dispatch(setStep(step));
      }}
    // onMouseLeave={_ => dispatch(setStep(pinnedStep))}
    >
      <div
        className={
          'w-5 h-5 leading-5 flex justify-center  cursor-pointer rounded-full text-md mx-0.5 transition-transform ' +
          face + (deductionSteps ? ' scale-100 delay-75' : ' scale-0')
        }
      >
        {numOfSteps - step}
      </div>
    </button>
  );
};

const Summary = () => {
  let contextItem = useSelector(state => state.debugger.currentContextItem);
  const multipleExps = useSelector(R.path(['debugger', 'multipleExps']));
  const debuggingSteps = useSelector(R.path(['debugger', 'debuggingSteps']));
  const steps = useSelector(R.path(['debugger', 'steps']));
  const pinnedStep = useSelector(R.path(['debugger', 'pinnedStep']));

  const pinned =
    steps.length === 0
      ? true
      : contextItem.contextSteps.find(
        R.pipe(R.nth(0), R.equals(steps[pinnedStep].stepId)),
      )[2];

  const dispatch = useDispatch();
  return contextItem === null ? null : (
    <>
      <Expandable
        hint={
          debuggingSteps
            ? 'Hide other uncertain expressions (Tab key)'
            : 'Expand to see a list of uncertain expressions (Tab key)'
        }
        opened={multipleExps}
        onOpen={_ => {
          if (!multipleExps) {
            dispatch(toggleMultipleExps());
          }
        }}
        onClose={_ => {
          if (multipleExps) {
            dispatch(toggleMultipleExps());
          }
          if (debuggingSteps) dispatch(toggleDebuggerStpes());
        }}
      >
        <div
          className={
            'bg-white p-3 pl-8 shadow-sm rounded-t-lg ' +
            (multipleExps ? '' : 'rounded-b-lg')
          }
        >
          <div className='text-md'>
            The following expression can have two conflicting types
            <span
              onMouseEnter={_ => dispatch(showDefination())}
              onMouseLeave={_ => dispatch(showBoth())}
              className={
                'code ml-2 px-1 rounded-md  inline-block not-italic cursor-pointer ' +
                (pinned
                  ? 'border border-gray-700 bg-gray-700 text-white hover:bg-gray-600'
                  : 'border border-black border-dashed hover:bg-gray-100')
              }
            >
              {contextItem['contextExp']}
            </span>
          </div>
        </div>
      </Expandable>
      {multipleExps ? (
        <Expandable
          opened={debuggingSteps}
          left={5}
          hint={
            debuggingSteps
              ? 'Hide debugging steps (Tab key)'
              : 'Expand to see debugging steps (Tab key)'
          }
          onOpen={_ => {
            if (!debuggingSteps) dispatch(toggleDebuggerStpes());
          }}
          onClose={_ => {
            if (debuggingSteps) dispatch(toggleDebuggerStpes());
          }}
        >
          <TabList></TabList>
        </Expandable>
      ) : null}
    </>
  );
};

const Expandable = ({ opened, children, onOpen, onClose, hint, left = 5 }) => {
  let size = 25;
  return (
    <div className='relative'>
      {children}
      <div
        onClick={_ => (opened ? onClose() : onOpen())}
        className='cursor-pointer rounded-full z-10 absolute border border-gray-300 hint--bottom'
        aria-label={hint}
        style={{
          width: size,
          height: size,
          top: `calc(50% - ${size / 2}px)`,
          left,
        }}
      >
        <ChevronRightIcon className={(opened ? 'rotate-90' : '') + ' transition-transform'} style={{}} />
      </div>
    </div>
  );
};

const Message = () => {
  let contextItem = useSelector(state => state.debugger.currentContextItem);
  let dispatch = useDispatch();
  return contextItem === null ? null : (
    <>
      <div className='font-medium mt-5'>Conflicting types</div>
      <div className='mb-5 mt-2 shadow-sm'>
        <div
          className='cursor-pointer hover:bg-gray-100 rounded-t-md bg-white p-2 w-full hint--bottom '
          aria-label="Keyboard shortcut: Hold 1"

          onMouseEnter={_ => dispatch(showOnlyMark1())}
          onMouseLeave={_ => dispatch(showBoth())}
        >
          <div className='mb-2 text-sm font-medium'>Possible type 1</div>
          <div className='inline-block mr-1 code'>
            {contextItem.contextExp}::
          </div>
          <span className='code groupMarkerB rounded-sm px-0.5 cursor-pointer'>
            <TypeSig
              simple={contextItem.contextType1SimpleString}
              full={contextItem.contextType1String}
            ></TypeSig>
          </span>
          <div className='text-xs italic'>
            Inferred from the orange highlights on the left side
          </div>
        </div>
        <hr className=''></hr>
        <div
          className='cursor-pointer hover:bg-gray-100 rounded-b-md bg-white p-2 w-full hint--bottom '
          aria-label="Keyboard shortcut: Hold 2"

          onMouseEnter={_ => dispatch(showOnlyMark2())}
          onMouseLeave={_ => dispatch(showBoth())}
        >
          <div className='mb-2 text-sm font-medium'>Possible type 2</div>
          <span className='inline-block mr-1 code'>
            {contextItem.contextExp}::
          </span>
          <span className='code groupMarkerA rounded-sm px-0.5 cursor-pointer'>
            <TypeSig
              simple={contextItem.contextType2SimpleString}
              full={contextItem.contextType2String}
            ></TypeSig>
          </span>
          <div className='text-xs italic'>
            Inferred from the blue highlights on the left side
          </div>
        </div>
      </div>
    </>
  );
};

const ReleventTerms = () => {
  let context = useSelector(R.path(['debugger', 'context']));
  let currentContextItem = useSelector(
    R.path(['debugger', 'currentContextItem']),
  );
  let releventContext = context.filter(
    c => c.contextExp !== currentContextItem.contextExp,
  );

  return (
    <div className=''>
      <div className='font-medium'>Relevant type information</div>
      {releventContext.reverse().map((c, i) => (
        <ReleventItem item={c} key={i}></ReleventItem>
      ))}
      {R.defaultTo([])(R.prop('contextGlobals', currentContextItem)).map(
        ([exp, type], i) => (
          <GlobalTypeHints exp={exp} type={type} key={i}></GlobalTypeHints>
        ),
      )}
    </div>
  );
};

const GlobalTypeHints = ({ exp, type }) => {
  return (
    <div className='flex flex-col my-1.5 p-1 bg-gray-100 rounded-md h-16 justify-center shadow-sm'>
      <div className='flex items-center'>
        <div className='code'>{exp}</div>
        <div className='code mx-0.5'>::</div>
        <div className={'code px-0.5 rounded-sm'}>{type}</div>
      </div>
      <div className='ml-1 text-sm italic'> Imported from Prelude</div>
    </div>
  );
};

const ReleventItem = ({ item }) => {
  let currentTraverseId = useSelector(
    R.path(['debugger', 'currentTraverseId']),
  );
  const multipleExps = useSelector(R.path(['debugger', 'multipleExps']));

  let dispatch = useDispatch();
  let affinity = R.pipe(
    R.find(R.pipe(R.nth(0), R.equals(currentTraverseId))),
    R.nth(1),
  )(item.contextSteps);
  let type =
    affinity === 'L' ? item.contextType1String : item.contextType2String;
  let origin = affinity === 'L' ? 'orange highlights' : 'blue highlights';
  let tabReleventSteps = item.contextSteps
    .map((step, i) => [...step, i])
    .filter(R.nth(2));
  let tabDefaultStep =
    tabReleventSteps[Math.round(tabReleventSteps.length / 2) - 1][3];
  return (
    <div
      className='flex flex-col my-1.5 bg-white p-2 rounded-md cursor-pointer shadow-sm hover:bg-gray-100'
      onMouseEnter={_ =>
        affinity === 'L' ? dispatch(showOnlyMark1()) : dispatch(showOnlyMark2())
      }
      onMouseLeave={_ => dispatch(showBoth())}
    >
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <div className='code'>{item.contextExp}</div>
          <div className='code mx-0.5'>::</div>
          <div
            className={
              'code px-0.5 rounded-sm ' +
              (affinity === 'L' ? 'marker2' : 'marker1')
            }
          >
            {type}
          </div>
        </div>
        {multipleExps ? (
          <div className='flex items-center'>
            <div className='text-sm text-gray-500'>Looks wrong? </div>
            <button
              onClick={_ => dispatch(lockStep(tabDefaultStep))}
              className='border border-gray-300 rounded-sm px-2 py-1 mr-1 ml-2 bg-white active:bg-gray-200 hover:bg-gray-100 shadow-sm'
            >
              Inspect
            </button>
          </div>
        ) : null}
      </div>
      <div className='text-xs italic'> Inferred from {origin} </div>
    </div>
  );
};

export default TabReport;
