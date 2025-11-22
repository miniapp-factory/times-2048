"use client";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="sky"></div>
      <div
        className="cloud"
        style={{
          top: "20%",
          left: "-20%",
          width: "200px",
          height: "80px",
          animationDelay: "0s",
        }}
      ></div>
      <div
        className="cloud"
        style={{
          top: "40%",
          left: "-50%",
          width: "250px",
          height: "100px",
          animationDelay: "-20s",
        }}
      ></div>
      <div
        className="cloud"
        style={{
          top: "60%",
          left: "-30%",
          width: "180px",
          height: "70px",
          animationDelay: "-10s",
        }}
      ></div>
      <div className="moon"></div>
    </div>
  );
}
