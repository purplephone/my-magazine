import React, { useState, useEffect } from "react";
import { Badge } from "@material-ui/core";
import NotificationIcon from "@material-ui/icons/Notifications";
import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

const NotiBadge = ({ _onClick }) => {
  const [isRead, setIsRead] = useState(true);
  const userID = useSelector((state) => state.user.user.uid);
  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${userID}`);
    notiDB.update({ read: true });
    _onClick();
  };

  useEffect(() => {
    const notiDB = realtime.ref(`noti/${userID}`);

    notiDB.on("value", (snapshot) => {
      setIsRead(snapshot.val().read);
    });

    return () => notiDB.off();
  }, [userID]);

  return (
    <React.Fragment>
      <Badge
        overlap="rectangular"
        color="secondary"
        variant="dot"
        invisible={isRead}
        onClick={notiCheck}
      >
        <NotificationIcon />
      </Badge>
    </React.Fragment>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
