import mixpanel from 'mixpanel-browser';

export let Source = {
  mouse: 'Mouse',
  keyboard: 'Keyboard',
  remote: 'Remote',
};

export let Event = {
  basicMode: 'Set Basic Mode',
  balancedMode: 'Set Balanced Mode',
  advancedMode: 'Set Advanced Mode',
  next: 'Next Step',
  prev: 'Previous Step',
  typeCheck: 'Type Check',
  succeed: 'Succeed',
  loaderr: 'Load Error',
  syntaxerr: 'Syntax Error',
  typeerr: 'Type Error',
  peekStep: 'Peek Step',
  peekExp: 'Peek Expression',
  peekDef: 'Peek Definition',
  gotoStep: 'Go To Step',
  gotoExp: 'Go To Expression',
  narrowType1: 'Narrow To Possible Type 1',
  narrowType2: 'Narrow To Possible Type 2',
  narrowRelevent: 'Narrow Relevant Type',
  inspect: 'Inspect Relevant Type',
  reset: 'Reset Task',
  abandon: 'Abandon Task',
};

export let track;
if (OUTPUT_TARGET === 'playground') {
    track = () => {}
} else {
    if (process.env.NODE_ENV === 'production') {
      track = ({ event, task, mode, source }) => {
        mixpanel.track(event, {
          Stage: 'live',
          Task: task,
          Mode: mode,
          'Input Source': source,
        });
      };
    } else {
      track = ({ event, task, mode, source }) => {
        console.log(`[Task ${task} - ${mode}] ${event} (From ${source})`);
      };
    }
}
