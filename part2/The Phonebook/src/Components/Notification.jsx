const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const redStyle = {
    color: "Red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (notification.type === "add") {
    return <div style={notificationStyle}>Added {notification.name}</div>;
  } else if (notification.type === "update") {
    return <div style={notificationStyle}>Updated {notification.name}</div>;
  } else {
    return (
      <div style={redStyle}>
        Information of {notification.name} has already been removed from server
      </div>
    );
  }
};

export default Notification;
