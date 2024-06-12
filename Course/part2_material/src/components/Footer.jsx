const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSIze: 16,
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of COmputer Science, University of Helsinki 2024
      </em>
    </div>
  );
};

export default Footer;
