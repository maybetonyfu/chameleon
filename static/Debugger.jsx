import React from "react"
import { useSelector, useDispatch } from 'react-redux';
import { unAlias } from './util';
import * as R from "ramda"
import {
  prevStep,
  nextStep,
  setStep,
  switchTaskThunk,
} from './debuggerSlice';
import { ArrowCircleUpIcon, ArrowCircleDownIcon } from "@heroicons/react/solid"
import TabReport from "./TabReport"
import TypeSig from './TypeSig'

const Debugger = () => {
  let wellTyped = useSelector(state => state.debugger.wellTyped);
  let loadError = useSelector(state => state.debugger.loadError);
  let parseError = useSelector(state => state.debugger.parseError);
  return (
    <div className="h-full bg-gray-200">
      {(() => {
        if (wellTyped) {
          return <div className="p-4 flex items-center">
            <ion-icon size="large" style={{ color: 'rgb(74, 222, 128)' }} name="checkmark-circle"></ion-icon>
            <span className="p-2">Congratulations! Your code is well typed.</span>
          </div>
        } else if (parseError !== null) {
          return <ParseErrorReport />;
        } else if (loadError !== null) {
          return <LoadErrorReport />;
        } else if (!wellTyped) {
          return <TabReport />;
        }
      })()}
    </div>
  );
};

const ParseErrorReport = () => {
  let parseError = useSelector(state => state.debugger.parseError);
  return (
    <div class='p-4'>
      <p className='py-2 px-4'>A syntax error was found in the code</p>
      <div className='bg-gray-100 py-2 px-4 rounded-md'>
        <p> {parseError.message} </p>
        <p>
          Location: {parseError.loc.srcLine}:{parseError.loc.srcColumn}
        </p>
      </div>
    </div>
  );
};

const LoadErrorReport = () => {
  let loadError = useSelector(state => state.debugger.loadError);
  return (
    <div class='p-4'>
      <p className='py-2 px-4'>A variable is used without being declared.</p>
      {loadError.map(([v, loc]) => {
        return (
          <div className='bg-gray-100 py-2 px-4 rounded-md'>
            <p>Variable: {v} </p>
            <p>
              Location: {' ' + loc.srcSpanStartLine}:
              {loc.srcSpanStartColumn} -{' ' + loc.srcSpanEndLine}:
              {loc.srcSpanEndColumn}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const TypeErrorReport = () => {
  return (
    <div
      className='p-2 flex flex-col items-start'
      style={{ fontFamily: 'IBM Plex Sans' }}
    >
      <Message></Message>
      <div className='pt-4 text-xs italic'>
        Below are all the expressions (in the middle column)
        that can cause the type error.
      </div>
      <div className='pb-2 italic text-xs'>(Use the up and down buttons to verify each fact)</div>

      <TypingTable></TypingTable>
      <ImportedTypes></ImportedTypes>
    </div>
  );
};

const ImportedTypes = () => {
  let contextItem = useSelector(state => state.debugger.currentContextItem);
  let hasProperty = R.has('contextGlobals')
  let hasMoreThanOneGlobal = R.pipe(R.prop('contextGlobals'), R.length, R.equals(0), R.not)
  return <div>
    <div>Imported functions types:</div>
    {
      (() => {
        if (R.allPass([hasProperty, hasMoreThanOneGlobal])(contextItem)) {
          return contextItem.contextGlobals.map((mapping, k) => <Imported mapping={mapping} key={k}></Imported>)
        } else {
          return <div>No globals</div>
        }
      })()
    }
  </div>
}

const Imported = ({ mapping }) => {
  let [name, sig] = mapping
  return <div>{name} :: {sig}</div>
}

const Message = () => {
  let contextItem = useSelector(state => state.debugger.currentContextItem);
  return contextItem === null ? null : (
    <div className='mb-5'>
      <div className='text-md my-2 w-full'>
        <div>It is possible to infer two conflicting types for the expression
          <span className='code ml-2 px-1 rounded-md bg-gray-700 text-white inline-block not-italic'>
            {contextItem['contextExp']}
          </span>:
        </div>
      </div>

      <div className='my-1 text-sm'>
        <span className='inline-block mr-1'>Possible type 1: </span>
        <span className='code groupMarkerB rounded-sm px-0.5 cursor-pointer'>
          <TypeSig
            simple={contextItem.contextType1SimpleString}
            full={contextItem.contextType1String}
          ></TypeSig>
        </span>
      </div>
      <div className='text-xs italic'>Possible type 1 can be infered from the orange highlights on the left side</div>

      <div className='mb-1 mt-2 text-sm'>
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

const TypingTable = () => {
  let dispatch = useDispatch();
  let context = useSelector(state => state.debugger.context);
  return (
    <div
      className={'grid gap-1 context-grid text-xs w-full'}
      style={{ fontFamily: 'JetBrains Mono' }}
    >
      <div className='text-center'>
        <ArrowCircleUpIcon
          onClick={() => {

            dispatch(prevStep());
          }}
          className="w-5 cursor-pointer"
        ></ArrowCircleUpIcon>
      </div>
      <div className='text-center'>TYPE 1</div>
      <div className='text-center'>EXPRESSION</div>
      <div className='text-center'>TYPE 2</div>

      {(() => {
        if (context.length === 0) {
          return <EmptyContextTable></EmptyContextTable>;
        } else {
          return context.map((row, i) => (
            <ContextRow row={row} key={i}></ContextRow>
          ));
        }
      })()}
      <div className='text-center'>
        <ArrowCircleDownIcon
          onClick={() => {
            dispatch(nextStep());
          }}
          className="w-5 cursor-pointer"
        ></ArrowCircleDownIcon>
      </div>
      <div className='text-center'></div>
      <div className='text-center'></div>
      <div className='text-center'></div>
    </div>
  );
};

const EmptyContextTable = () => {
  let steps = useSelector(state => state.debugger.steps);
  let currentTraverseId = useSelector(state => state.debugger.currentTraverseId);
  let dispatch = useDispatch();
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        {steps.map(({ stepId }, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                dispatch(setStep(i));
              }}
              className={
                'rounded-lg w-4 h-4 my-0.5 p-0.5 cursor-pointer text-xs leading-3 text-center ' +
                (R.equals(stepId, currentTraverseId)
                  ? 'bg-green-400'
                  : 'bg-gray-400')
              }
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <div></div>
      <div></div>
      <div></div>
    </>
  );
};

const ContextRow = ({ row }) => {
  let currentTraverseId = useSelector(state => state.debugger.currentTraverseId);
  let steps = useSelector(state => state.debugger.steps);
  let dispatch = useDispatch();
  let {
    contextExp,
    contextType1String,
    contextType1SimpleString,
    contextType2String,
    contextType2SimpleString,
    contextSteps,
  } = row;
  let affinity =
    R.pipe(
      R.find(R.pipe(R.nth(0), R.equals(currentTraverseId))),
      R.nth(1)
    )(contextSteps)

  let affinityClass =
    affinity === 'R' ? 'sideA' : affinity === 'L' ? 'sideB' : 'sideAB';
  let firstReleventStepTId = R.nth(0)(contextSteps.find(R.nth(2)));
  let lastReleventStepTId =
    R.pipe(
      R.reverse,
      R.find(R.nth(2)),
      R.nth(0)
    )(contextSteps)

  let firstReleventStep = steps.findIndex(step =>
    R.equals(step['stepId'], firstReleventStepTId),
  );
  let lastReleventStep = steps.findIndex(step =>
    R.equals(step['stepId'], lastReleventStepTId),
  );
  return (
    <>
      <Stepper rowInfo={contextSteps}></Stepper>
      <div
        onClick={() => {
          dispatch(setStep(firstReleventStep));
        }}
        className='rounded-sm p-1 groupMarkerB flex justify-center items-center cursor-pointer'
      >
        <StringTypeSig
          simple={contextType1SimpleString}
          full={contextType1String}
        ></StringTypeSig>{' '}
      </div>
      <div
        className={
          'rounded-sm p-1 flex justify-center items-center ' + affinityClass
        }
      >
        {contextExp}
      </div>
      <div
        onClick={() => {
          dispatch(setStep(lastReleventStep));
        }}
        className='rounded-sm p-1 groupMarkerA flex justify-center items-center cursor-pointer'
      >
        <StringTypeSig
          simple={contextType2SimpleString}
          full={contextType2String}
        ></StringTypeSig>{' '}
      </div>
    </>
  );
};

const Stepper = ({ rowInfo }) => {
  let steps = useSelector(state => state.debugger.steps);
  let currentTraverseId = useSelector(state => state.debugger.currentTraverseId);
  let stepsInRow = rowInfo.filter(ri => ri[2]);
  let dispatch = useDispatch();
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        {stepsInRow.map(([traverseId, _z1, _z2]) => {
          let stepId = steps.findIndex(
            R.pipe(
              R.prop('stepId'),
              R.equals(traverseId)
            )
          );
          return (
            <div
              key={stepId}
              onClick={() => {
                dispatch(setStep(stepId));
              }}
              className={
                'rounded-lg w-4 h-4 my-0.5 p-0.5 cursor-pointer text-xs leading-3 text-center ' +
                (R.equals(traverseId, currentTraverseId)
                  ? 'bg-green-400'
                  : 'bg-gray-400')
              }
            >
              {stepId + 1}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Debugger