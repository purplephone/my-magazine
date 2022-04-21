import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfinityScroll = ({ children, callNext, isNext, loading }) => {
  const _handleScroll = _.throttle(() => {
    if (loading) {
      return;
    }

    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      callNext();
    }
  }, 300);

  const handleScroll = useCallback(_handleScroll, [_handleScroll, loading]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isNext) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, isNext, handleScroll]);

  return (
    <React.Fragment>
      {children}
      {isNext && <Spinner />}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  isNext: false,
  loading: false,
};

export default InfinityScroll;
