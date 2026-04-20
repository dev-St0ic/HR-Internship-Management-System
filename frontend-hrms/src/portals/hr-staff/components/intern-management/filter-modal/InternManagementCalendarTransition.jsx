import { forwardRef } from 'react';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';

const InternManagementCalendarTransition = forwardRef(function InternManagementCalendarTransition(props, ref) {
  const { children, in: inProp, onEnter, onExited, ...other } = props;
  return <Fade in={inProp} timeout={220} onEnter={onEnter} onExited={onExited}><div ref={ref} {...other}><Slide in={inProp} direction="up" timeout={220} mountOnEnter unmountOnExit><div>{children}</div></Slide></div></Fade>;
});

export default InternManagementCalendarTransition;