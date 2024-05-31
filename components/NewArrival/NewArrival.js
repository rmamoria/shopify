import style from "./newArrival.module.css";
import Speaker from "@/components/NewArrival/Speaker"
export default function NewArrival() {
  return (
    <section className={style.new_section}>
      <h1 className="heading">New Arrivals</h1>
      <Speaker/>
      <div className={style.newArrival_container}>
        <div className={style.box_1}>
          <img
            src="/images/new-1.svg"
            alt="new images"
            className={style.image_1}
          />
          <div className={style.box_1_detail}>
            <h1>Play Station 5</h1>
            <p>Black and White version of the PS5 coming out on sale.</p>
            <button className={style.button}>Shop now</button>
          </div>
        </div>
        <div className={style.box_2}>
          <div className={style.box_21}>
            {" "}
            <img
              src="/images/new-2.svg"
              alt="new images"
              className={style.image_2}
            />
            <div className={style.box_21_detail}>
              <h1>Women’s Collections</h1>
              <p>Featured woman collections that give you another vibe.</p>
              <button className={style.button}>Shop now</button>
            </div>
          </div>

          <div className={style.box_3}>
            <div className={style.box_31}>
              {" "}
              <img
                src="/images/new-3.svg"
                alt="new images"
                className={style.image_3}
              />
              <div className={style.box_31_detail}>
                <h1>Speakers</h1>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <button className={style.button}>Shop now</button>
              </div>
            </div>
            <div className={style.box_31}>
              {" "}
              <img
                src="/images/new-4.svg"
                alt="new images"
                className={style.image_4}
              />
              <div className={style.box_31_detail}>
                <h1>Perfume</h1>
                <p>Gucci and good perfumes and many more</p>
                <button className={style.button}>Shop now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
