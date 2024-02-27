export const getRadioButtonStyleProps = () => {
  return {
    containerStyle: {
      borderWidth: 0, // Add this line to remove the border
      backgroundColor: "white",
      padding: 0, // Minimize padding to fit within the container
      margin: 0, // Remove margins to utilize all available space
      justifyContent: "center",
      marginBottom: 5,
    },
    checkedColor: "black",
    textStyle: {
      fontSize: 14,
      fontWeight: "normal",
    },
  };
};
