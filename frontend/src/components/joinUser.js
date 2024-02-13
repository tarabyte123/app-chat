export const Joinuser = ({ user, setnewUser, handleClick, newuser }) => {
  return (
    !user.userId && (
      <div className="join-container">
        <div className="title">Enter username:</div>
        <div className="join-input-box">
          <input
            type="text"
            value={newuser}
            placeholder="deepesh.."
            onChange={(e) => setnewUser(e.target.value)}
          />
        </div>
        <button onClick={handleClick} className="join-button">JOIN</button>
      </div>
    )
  );
};
