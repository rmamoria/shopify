import style from "./newArrival.module.css";
export default function Speaker() {
  return (
    <div className={style.speaker_box}>
    <p className={style.love_music}>We Know,You Love Music </p>
      <h1>Enhance your music experience</h1>
       <div className={style.details}>
       <div className={style.specification}>
        <span>23</span>
        <p>Hour</p>
       </div>
       <div className={style.specification}>
        <span>05</span>
        <p>Days</p>
       </div>
       <div className={style.specification}>
        <span>59</span>
        <p>Mins</p>
       </div>
       <div className={style.specification}>
        <span>35 </span>
        <p>Secs</p>
       </div>

       </div>
       <button className={style.button}>Shop Now</button>
    </div>
  );
}
