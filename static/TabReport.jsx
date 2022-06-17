import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import TypeSig from './TypeSig';
import {
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/outline';
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
import { getMode } from './util';
import { Event, Source, track } from './report';

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
  let context = useSelector(R.path(['debugger', 'context']));
  let steps = useSelector(R.path(['debugger', 'steps']));

  let pinnedStep = useSelector(R.path(['debugger', 'pinnedStep']));
  let pinnedTraverseId = steps[pinnedStep].stepId;
  const multipleExps = useSelector(R.path(['debugger', 'multipleExps']));
  const deductionSteps = useSelector(R.path(['debugger', 'debuggingSteps']));

  return (
    <div
      className={
        'h-24 bg-gray-100 flex items-center   ' +
        (multipleExps && !deductionSteps ? 'rounded-b-lg' : '')
      }
      style={{ paddingLeft: 40 }}
    >
      <div
        className={
          'flex items-center cursor-pointer flex-row-reverse justify-end '
        }
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
  const multipleExps = useSelector(R.path(['debugger', 'multipleExps']));
  const currentTaskNum = useSelector(R.path(['debugger', 'currentTaskNum']));
  const mode = getMode(multipleExps, deductionSteps);
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

  return (
    <div
      className={face + ' flex flex-col w-max m-1 px-2 py-1 rounded-lg'}
      style={{ minWidth: 80 }}
      onClick={_ => {
        dispatch(lockStep(tabDefaultStep));
        track({
          event: Event.gotoExp,
          task: currentTaskNum,
          mode,
          source: Source.mouse,
        });
      }}
      onMouseEnter={_ => {
        if (!active) {
          dispatch(setStep(tabDefaultStep));
          track({
            event: Event.peekExp,
            task: currentTaskNum,
            mode,
            source: Source.mouse,
          });
        }
      }}
      onMouseLeave={_ => {
        dispatch(setStep(pinnedStep));
      }}
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
  let task = useSelector(R.path(['debugger', 'currentTaskNum']));
  let currentTraverseId = useSelector(
    R.path(['debugger', 'currentTraverseId']),
  );
  let multipleExps = useSelector(R.path(['debugger', 'multipleExps']));
  let deductionSteps = useSelector(R.path(['debugger', 'debuggingSteps']));
  let mode = getMode(multipleExps, deductionSteps);
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
        track({ event: Event.gotoStep, task, mode, source: Source.mouse });
      }}
      onMouseEnter={_ => {
        dispatch(setStep(step));
        track({ event: Event.peekStep, task, mode, source: Source.mouse });
      }}
    >
      <div
        className={
          'w-5 h-5 leading-5 flex justify-center  cursor-pointer rounded-full text-md mx-0.5  ' +
          face +
          (deductionSteps ? ' ' : ' hidden')
        }
      >
        {numOfSteps - step}
      </div>
    </button>
  );
};

const Summary = () => {
  let contextItem = useSelector(state => state.debugger.currentContextItem);
  const steps = useSelector(R.path(['debugger', 'steps']));
  const pinnedStep = useSelector(R.path(['debugger', 'pinnedStep']));
  const multipleExps = useSelector(R.path(['debugger', 'multipleExps']));
  const debuggingSteps = useSelector(R.path(['debugger', 'debuggingSteps']));
  const currentTaskNum = useSelector(R.path(['debugger', 'currentTaskNum']));
  const mode = getMode(multipleExps, debuggingSteps);
  const pinned =
    steps.length === 0
      ? true
      : contextItem.contextSteps.find(
          R.pipe(R.nth(0), R.equals(steps[pinnedStep].stepId)),
        )[2];

  const dispatch = useDispatch();
  return contextItem === null ? null : (
    <div className='shadow-sm rounded-md'>
      <Expandable
        hint={
          debuggingSteps
            ? 'Hide other uncertain expressions (Tab key)'
            : 'Expand to see a list of uncertain expressions (Tab key)'
        }
        opened={multipleExps}
        onOpen={_ => {
          if (!multipleExps) {
            track({
              event: Event.balancedMode,
              task: currentTaskNum,
              mode,
              source: Source.mouse,
            });
            dispatch(toggleMultipleExps());
          }
        }}
        onClose={_ => {
          if (multipleExps && !debuggingSteps) {
            dispatch(toggleMultipleExps());
            track({
              event: Event.basicMode,
              task: currentTaskNum,
              mode,
              source: Source.mouse,
            });
          } else if (multipleExps && debuggingSteps) {
            dispatch(toggleMultipleExps());
            dispatch(toggleDebuggerStpes());
            track({
              event: Event.basicMode,
              task: currentTaskNum,
              mode,
              source: Source.mouse,
            });
          }
        }}
      >
        <div
          style={{ paddingLeft: 40 }}
          className={
            'bg-white p-3 rounded-t-md ' + (multipleExps ? '' : 'rounded-b-md')
          }
        >
          <div className='text-md'>
            The following expression can have two conflicting types
            <span
              onMouseEnter={_ => {
                dispatch(showDefination());
                track({
                  event: Event.peekDef,
                  task: currentTaskNum,
                  mode,
                  source: Source.mouse,
                });
              }}
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
            if (!debuggingSteps) {
              track({
                event: Event.advancedMode,
                task: currentTaskNum,
                mode,
                source: Source.mouse,
              });
              dispatch(toggleDebuggerStpes());
            }
          }}
          onClose={_ => {
            if (debuggingSteps) {
              track({
                event: Event.balancedMode,
                task: currentTaskNum,
                mode,
                source: Source.mouse,
              });
              dispatch(toggleDebuggerStpes());
            }
          }}
        >
          <TabList></TabList>
        </Expandable>
      ) : null}
      {debuggingSteps ? (
        <div
          className='flex justify-start p-1 border-0 rounded-b-md bg-gray-800'
          style={{ paddingLeft: 40 }}
        >
          <button
            aria-label='Previous step (Left / Up / h / k )'
            // style={{ backgroundColor: '#B0B0B0' }}
            className='border bg-gray-800 border-gray-500 text-gray-300 shadow-sm hover:bg-gray-500 hover:text-gray-800 active:bg-gray-700 active:text-white px-2 py-1 mx-0.5 h-8 rounded-md flex justify-center items-center hint--bottom'
            onClick={_ => {
              dispatch(nextStep());
              track({
                event: Event.prev,
                task: currentTaskNum,
                mode,
                source: Source.mouse,
              });
            }}
          >
            <ChevronDoubleLeftIcon className='h-4 w-4'></ChevronDoubleLeftIcon>
          </button>
          <button
            aria-label='Next step (Right / Down / l / j)'
            // style={{ backgroundColor: '#B0B0B0' }}
            className='border bg-gray-800 border-gray-500 text-gray-300 shadow-sm hover:bg-gray-500 hover:text-gray-800 active:bg-gray-700 active:text-white px-2 py-1 mx-0.5 h-8 rounded-md flex justify-center items-center hint--bottom'
            onClick={_ => {
              dispatch(prevStep());
              track({
                event: Event.next,
                task: currentTaskNum,
                mode,
                source: Source.mouse,
              });
            }}
          >
            <ChevronDoubleRightIcon className='h-4 w-4'></ChevronDoubleRightIcon>
          </button>
        </div>
      ) : null}
    </div>
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
        <ChevronRightIcon
          className={(opened ? 'rotate-90' : '') + ' transition-transform'}
          style={{}}
        />
      </div>
    </div>
  );
};

const Message = () => {
  let contextItem = useSelector(state => state.debugger.currentContextItem);
  const multipleExps = useSelector(R.path(['debugger', 'multipleExps']));
  const debuggingSteps = useSelector(R.path(['debugger', 'debuggingSteps']));
  const currentTaskNum = useSelector(R.path(['debugger', 'currentTaskNum']));
  const mode = getMode(multipleExps, debuggingSteps);
  let dispatch = useDispatch();
  return contextItem === null ? null : (
    <>
      <div className='font-medium mt-5'>Conflicting types</div>
      <div className='mb-5 mt-2  shadow-sm'>
        <div
          className='cursor-pointer hover:bg-gray-100 rounded-t-md bg-white p-2 w-full hint--bottom '
          aria-label='Keyboard shortcut: Hold 1'
          onMouseEnter={_ => {
            dispatch(showOnlyMark1());
            track({
              event: Event.narrowType1,
              task: currentTaskNum,
              mode,
              source: Source.mouse,
            });
          }}
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
          aria-label='Keyboard shortcut: Hold 2'
          onMouseEnter={_ => {
            dispatch(showOnlyMark2());
            track({
              event: Event.narrowType2,
              task: currentTaskNum,
              mode,
              source: Source.mouse,
            });
          }}
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
  const debuggingSteps = useSelector(R.path(['debugger', 'debuggingSteps']));
  const currentTaskNum = useSelector(R.path(['debugger', 'currentTaskNum']));
  const mode = getMode(multipleExps, debuggingSteps);
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
      onMouseEnter={_ => {
        affinity === 'L'
          ? dispatch(showOnlyMark1())
          : dispatch(showOnlyMark2());
        track({
          event: Event.narrowRelevent,
          task: currentTaskNum,
          mode,
          source: Source.mouse,
        });
      }}
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
              onClick={_ => {
                dispatch(lockStep(tabDefaultStep));
                track({
                  event: Event.inspect,
                  task: currentTaskNum,
                  mode,
                  source: Source.mouse,
                });
              }}
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
