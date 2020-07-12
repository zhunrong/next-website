import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import style from './preview.module.scss';

interface Props {
  visible?: boolean;
  src?: string;
  onClosed?: () => void;
}
const Preview: FunctionComponent<Props> = (props) => {
  const { src, onClosed } = props;
  const [className, setClassName] = useState('enter');
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (src) {
      setClassName('enter-active');
    } else {
      setClassName('enter');
    }
    if (ref.current) {
      const el = ref.current;
      const preventDefault = (e: Event) => {
        e.preventDefault();
      };
      el.addEventListener('wheel', preventDefault, {
        passive: false,
      });
      el.addEventListener('touchmove', preventDefault, {
        passive: false,
      });
      return () => {
        el.removeEventListener('wheel', preventDefault);
        el.removeEventListener('touchmove', preventDefault);
      };
    }
  }, [src]);
  const handleClose = () => {
    setClassName('leave-active leave-to');
  };
  const handleTransitionEnd = () => {
    if (className.includes('leave-active')) {
      setClassName('leave-to');
      onClosed && onClosed();
    } else if (className.includes('enter-active')) {
      setClassName('');
    }
  };
  return (
    <div className={style['preview']}>
      {src && (
        <div
          className={`preview-container ${className ? className : ''}`}
          ref={ref}
          onClick={handleClose}
          onTransitionEnd={handleTransitionEnd}
        >
          <img src={src} />
        </div>
      )}
    </div>
  );
};

export default Preview;
