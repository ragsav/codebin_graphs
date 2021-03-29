import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const useElementResize = ({ callback, element }) => {
  const current = element && element.current;

  const observer = useRef(null);

  const observe = () => {
    if (element && element.current && observer.current) {
      observer.current.observe(element.current);
    }
  };

  useEffect(() => {
    // if we are already observing old element
    if (observer && observer.current && current) {
      observer.current.unobserve(current);
    }

    observer.current = new ResizeObserver((entries) => {
      callback();
    });
    observe();

    return () => {
      if (observer && observer.current && element && element.current) {
        observer.current.unobserve(element.current);
      }
    };
  }, [current]);
};

export default useElementResize;
