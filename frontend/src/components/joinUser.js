export const Joinuser = ({ user, setnewUser, newuser, handleChange }) => {
  return (
    <div className="join-container">
      <div className="title">Enter username:</div>
      <div className="join-input-box">
        <input
          type="text"
          value={newuser}
          placeholder="deepesh.."
          onChange={(e) => setnewUser(e.target.value)}
          onKeyUpCapture={(e) => (e.code === "Enter" ? handleChange() : null)}
        />
      </div>
      <button onClick={handleChange} className="join-button">
        JOIN
      </button>
    </div>
  );
};
